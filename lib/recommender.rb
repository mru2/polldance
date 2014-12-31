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
  def add(title, artist)
    payload = [{
      action: 'update',
      item: {
        item_id: "#{title} - #{artist}",
        song_id: get_song_id(title, artist),
        play_count: 1
        # favorite: true
      }
    }]

    ECHONEST.post '/catalog/update', id: id, data: payload.to_json
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
  def get_song_id(title, artist)
    res = ECHONEST.get '/song/search', artist: artist, title: title
    return res['songs'][0]['id']
  end

end