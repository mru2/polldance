class Track

  # The time to expire for a vote
  VOTE_TTL = 1800 # 30 minute


  # Get a track in the context of a given playlist
  def self.get(playlist, id)
    new(playlist.code, id)
  end


  # Create a track (no playlist context, just its attributes)
  def self.create(attrs)
    # Check attributes
    %i(id title artist).each do |name|
      raise "Missing mandatory attribute #{name}" unless attrs[name]
    end

    # Set its attributes
    REDIS.hmset track_key(attrs[:id]), :title, attrs[:title], :artist, attrs[:artist]

    return attrs[:id]
  end


  # Actual initialization. Do not call directly please
  attr_reader :id, :playlist_code, :title, :artist, :votes
  def initialize(playlist_code, id)
    @playlist_code = playlist_code
    @id = id

    # Fetch track attributes
    attrs = REDIS.hgetall Track.track_key(id)
    @artist = attrs['artist']
    @title = attrs['title']
  end


  # Track comparison : score then reverse age
  def <=>(other)
    if score == other.score
      (age <=> other.age)
    else
      - (score <=> other.score)
    end
  end


  # Add a vote for a user
  def vote(user_id)
    # Store the vote with the current time
    REDIS.zadd votes_key, Time.now.to_f, user_id

    # Refresh votes
    @votes = nil
  end


  # Calculate the score (recent votes)
  def score
    votes.count
  end


  # Calculate the age (recent votes mean age)
  def age
    score == 0 ? 1 : (votes.values.sum.to_f / score) / VOTE_TTL
  end


  # Get the valid votes
  # Hash of user_id => vote age
  def votes
    now = Time.now.to_f
    @votes ||= Hash[
      REDIS.zrangebyscore(
        votes_key, 
        (Time.now.to_f - VOTE_TTL), 
        '+inf', 
        with_scores: true
      ).map!{|user_id, time| [user_id, now - time]}
    ]
  end


  # Get the vote age for a given user, or nil if none
  def user_vote(user_id)
    vote_time = REDIS.zscore votes_key, user_id
    vote_time ? (Time.now.to_f - vote_time) : nil
  end


  # Destroy the track's score
  def clear_scores!
    REDIS.del votes_key
  end


  # Snapshot for a given user. Also includes whether it is liked
  # Nil if zero-score and not liked
  # JSON serializable
  def snapshot(user_id = nil, force = false)
    attrs = {
      id: id,
      artist: artist,
      title: title,
      score: score,
      age: age
    }

    if user_id
      like_age = user_vote(user_id)
      attrs[:like_age] = like_age && (like_age / VOTE_TTL)
    end

    return nil if (score == 0) && !attrs[:like_age] && !force

    attrs
  end

  private

  # Track attributes (artist, title, ...) : HASH
  def self.track_key(track_id)
    "t:#{track_id}"
  end

  # Track votes : ZSET of user_id => vote_date
  def votes_key
    "p:#{playlist_code}:v:#{id}"
  end


end