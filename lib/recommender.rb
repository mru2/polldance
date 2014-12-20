# Echonest 
class Recommender

  def self.create(code)
    res = ECHONEST.post '/catalog/create', name: code, type: 'song'
    id = res['id']
    REDIS.set "r:#{code}", id
    new(id)
  end

  def self.get(code)
    id = REDIS.get "r:#{code}"
    return nil unless id
    new(id)
  end


  attr_reader :id

  def initialize(id)
    @id = id
  end

  # Add then play track
  def add(deezer_id)
    payload = [{
      action: 'update',
      item: {
        item_id: deezer_id.to_s,
        song_id: get_song_id(deezer_id),
        play_count: 1
        # favorite: true
      }
    }]

    ECHONEST.post '/catalog/update', id: id, data: payload.to_json
  end

  # On skip!
  def remove(deezer_id)

  end

  def suggestions
    res = ECHONEST.get '/playlist/static', 
      type: 'catalog-radio',
      seed_catalog: id,
      adventurousness: 0.8,
      distribution: 'wandering',
      bucket: ['id:deezer', 'tracks'],
      limit: true

    res['songs'].map do |song|
      {
        artist: song['artist_name'],
        title: song['title'],
        id: song['tracks'].first['foreign_id'].split(':').last.to_i
      }
    end
  end

  private

  # F**ing deezer
  def get_song_id(deezer_id)
    begin
      ECHONEST.get '/song/profile', id: "deezer:tracks:#{deezer_id}"
      return "deezer:tracks:#{deezer_id}"
    rescue => e
      # May be in redis already...
      details = Deezer.get "/track/#{deezer_id}"

      artist = details['artist']['name']
      title = details['title']

      puts "Track ##{deezer_id} not mapped. Searching for #{artist} - #{title}"

      res = ECHONEST.get '/song/search', artist: artist, title: title
      return res['songs'][0]['id']
    end
  end

end