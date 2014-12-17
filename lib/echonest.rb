# Echonest API client
class Echonest
  class Error < StandardError ; end

  include HTTParty
  base_uri 'http://developer.echonest.com/api/v4'

  attr_reader :api_key

  def initialize(api_key)
    @api_key = api_key
  end

  def get(path, query)
    query = query.merge(api_key: api_key)
    path += "?#{URI.encode_www_form(query)}"

    handle_response self.class.get(path)
  end

  def post(path, params)
    params = params.merge(api_key: api_key)

    handle_response self.class.post(path, body: params)
  end

  private

  def handle_response(response)
    raise Error.new("Error #{response.code} : #{response.body}") if response.code != 200
     
    status = response.parsed_response['response']['status']
    if status['code'] != 0
      raise Error.new("Error #{status['code']} : #{status['message']}")
    end

    response.parsed_response['response']
  end
end