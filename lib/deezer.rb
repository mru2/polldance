# Deeezer API client
class Deezer
  include HTTParty
  base_uri 'http://api.deezer.com'

  def search(query)
    results = self.class.get('/search', query: { q: query })
    results.parsed_response['data'].select{ |track| track['readable'] }.first(10).map do |track|
      {
        id: track['id'].to_s,
        artist: track['artist']['name'],
        title: track['title']
      }
    end
  end
end