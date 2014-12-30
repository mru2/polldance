require 'track'

class Playlist

  TTL = 172800 # 2 days

  # Get the playlist for a given code
  # Returns nil if no playlist
  def self.get(code)
    return nil unless code
    code = process_code(code)
    return nil unless REDIS.exists playlist_key(code)
    new(code)
  end
  

  # Create the playlist / delay its expiration
  def self.create(code)
    code = process_code(code)
    REDIS.set playlist_key(code), Time.now
    REDIS.expire playlist_key(code), TTL

    new(code)
  end


  # Initialization (do not call directly)
  attr_reader :code
  def initialize(code)
    @code = code
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

    return nil if !top_track
   
    # Remove it
    REDIS.srem tracks_key, top_track.id
    top_track.clear_scores!

    top_track
  end


  # Get a snapshot of the playlist, for a given user
  # JSON serializable, this is the usual response from the API
  def snapshot(user_id = nil)
    puts "Fetching snapshot for user #{user_id}"
    {
      code: code,
      tracks: tracks.map{|t| t.snapshot(user_id)}.compact
    }
  end


  private

  # ===================
  # Code transformation
  # ===================
  def self.process_code(code)
    code.downcase.gsub(/[^a-z0-9]+/, '')
  end

  # ==========
  # Redis keys
  # ==========

  # Enabled playlist codes : separate keys with expiration
  def self.playlist_key(code)
    "p:#{code}"
  end

  # Track ids in the playlist : SET
  def tracks_key
    "p:#{code}:t"
  end

end