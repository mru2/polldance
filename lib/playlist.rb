require 'track'
require 'recommender'

class Playlist

  TTL = 172800 # 2 days

  # Fetch nearest playlists playlists
  def self.nearest(geo, opts={})
    limit = opts.fetch(:limit, 3)

    # Fetch all codes
    all_codes = REDIS.keys('pd:p:*').map{|code| code.gsub /^pd:p:/, ''}

    # Order by distance
    playlists_with_distance = all_codes.map do |code|
      playlist = new(code)
      distance = Math.sqrt( (geo[0] - playlist.geo[0])**2 + (geo[1] - playlist.geo[1])**2 )
      {
        playlist: playlist,
        distance: distance
      }
    end

    # Sort and limit the results
    playlists_with_distance.sort_by{|res|res[:distance]}.first(limit)
  end


  # Get the playlist for a given code
  # Returns nil if no playlist
  def self.get(code)
    return nil unless REDIS.exists playlist_key(code)
    new(code)
  end


  # Create the playlist / delay its expiration
  def self.create(name, geo)
    code = process_code(name)
    return nil if code == ''

    REDIS.hmset playlist_key(code), 'name', name, 'lat', geo[0], 'lng', geo[1]
    REDIS.expire playlist_key(code), TTL

    new(code)
  end


  # Initialization (do not call directly)
  attr_reader :code, :name, :geo
  def initialize(code)
    @code = code
    attrs = REDIS.hgetall Playlist.playlist_key(code)

    @name = attrs['name']
    @geo = [attrs['lat'], attrs['lng']].map(&:to_i)
  end


  # Add a track. Needs the id, artist and title
  def add_track(opts)
    # Create the track
    track_id = Track.create(opts)

    # Add it to the playlist
    REDIS.sadd tracks_key, track_id

    # Return the track
    return Track.get(self, track_id)
  end


  # Get all the tracks for the playlist
  def tracks
    track_ids = REDIS.smembers tracks_key
    track_ids.map!{|track_id| Track.get(self, track_id)}.sort!
  end


  # Get a track of the playlist
  def track(track_id)
    return nil unless REDIS.sismember tracks_key, track_id
    Track.get(self, track_id)
  end


  # Remove the playlist top track
  def pop_top_track!
    top_track = tracks.first

    if !top_track || (top_track.score == 0)
      set_currently_playing nil, nil
      return nil
    end

    # Store the current track
    set_currently_playing top_track.title, top_track.artist

    # Update suggestions
    update_suggestions!(top_track)

    # Remove it
    REDIS.srem tracks_key, top_track.id
    top_track.clear_scores!

    top_track
  end


  # Get the currently playing track
  def currently_playing
    attrs = REDIS.hgetall(currently_playing_key)
    attrs.empty? ? {} : attrs
  end

  def set_currently_playing(title, artist)
    REDIS.hset currently_playing_key, 'title', title
    REDIS.hset currently_playing_key, 'artist', artist
  end


  # Get a snapshot of the playlist, for a given user
  # JSON serializable, this is the usual response from the API
  def snapshot(user_id = nil)
    puts "Fetching snapshot for user #{user_id}"
    {
      code: code,
      name: name,
      tracks: tracks.map{|t| t.snapshot(user_id)}.compact,
      currently_playing: currently_playing
    }
  end


  def suggestions
    json = REDIS.get suggestions_key
    (json.nil? || json == '') ? [] : JSON.parse(json)
  end


  def update_suggestions!(track)
    id, artist, title = track.id, track.artist, track.title
    Thread.new do
      begin
        r = Recommender.create "id-#{Time.now.to_i}"
        r.add(title, artist)
        suggestions = r.suggestions

        if !suggestions.empty?
          REDIS.set suggestions_key, suggestions.to_json
        end
      rescue => e
        # Meh, what could happen...
      ensure
        Thread.exit
      end
    end
  end


  private

  # ===================
  # Code transformation
  # ===================
  def self.process_code(code)
    res = code.downcase.gsub(/[^a-z0-9]+/, '-')
    res == '-' ? nil : res
  end

  # ==========
  # Redis keys
  # ==========

  # Enabled playlist codes : separate keys with expiration
  def self.playlist_key(code)
    "pd:p:#{code}"
  end

  # Track ids in the playlist : SET
  def tracks_key
    "pd:t:#{code}"
  end

  # Currently playing track (artist, title)
  def currently_playing_key
    "pd:c:#{code}"
  end

  # Suggestions (as json)
  def suggestions_key
    "pd:s:#{code}"
  end

end
