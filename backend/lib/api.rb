require 'sinatra/base'
require 'sinatra/json'

class Api < Sinatra::Base
  configure do
    set :root, APP_ROOT
  end

  # Test
  get '/' do
    json hello: 'world'
  end

  # Create a playlist
  post '/p' do
    playlist = Playlist.launch(params[:code])
    json playlist
  end

end