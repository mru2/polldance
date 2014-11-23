# Playlist notifications
require 'playlist'

class Notifications

  # Double-indexed:
  # - on stream (for subscribe / unsubscribe and user_id persistence)
  # - on room (for publishing)
  class Connections
    def initialize
      @streams = {}
      @rooms = {}
    end

    def add(stream, code, user)
      puts "Adding #{user} on connections for #{code}"
      @streams[stream] = {
        user: user,
        code: code
      }

      @rooms[code] ||= []
      @rooms[code] << stream
    end

    def remove(stream)
      former = @streams.delete(stream)

      if former
        puts "Removing #{former[:user]} off connections for #{former[:code]}"
        @rooms[former[:code]].delete stream
      end
    end

    def for_code(code)
      @rooms[code].map do |stream|
        {
          user_id: @streams[stream][:user_id],
          stream: stream
        }
      end
    end
  end


  class << self

    @@connections = Connections.new
    @@subber = Redis.new(REDIS.client.options)

    def subscribe(stream, code, user_id)
      @@connections.add(stream, code, user_id)
    end

    def unsubscribe(stream)
      @@connections.remove(stream)
    end

    def publish(code)
      puts "Publishing for #{code}"
      REDIS.publish("notif:#{code}", true)
    end

    def run!
      Thread.new do
        @@subber.psubscribe('notif', 'notif:*') do |on|
          on.pmessage do |match, channel, message|
            code = channel.sub('notif:', '')
            playlist = Playlist.get(code)

            @@connections.for_code(code).each do |conn|
              data = playlist.snapshot(conn[:user_id])
              conn[:stream] << "data: #{data.to_json}\n\n"
            end

          end
        end
      end
    end

  end

end