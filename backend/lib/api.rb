require 'sinatra/base'
require 'sinatra/json'
require 'sinatra/cookies'
require 'rack/contrib'

require 'playlist'
require 'notifications'

class Api < Sinatra::Base

  # Configuration
  helpers Sinatra::Cookies
  set :cookie_options, :domain => nil # Cookies on localhost are not persisted. https://github.com/sinatra/sinatra-contrib/issues/113

  use ::Rack::PostBodyContentTypeParser

  configure do
    set :root, APP_ROOT
  end


  # Handle the current user
  before do
    @user_id = cookies[:uid] ||= SecureRandom.hex(8)
  end


  # Error handling
  def error(code, msg = nil)
    status code
    json error: msg if msg
    halt
  end


  # Create a playlist
  post '/playlists' do
    error(422, 'No code given') unless params[:code]

    playlist = Playlist.create(params[:code])
    json playlist.snapshot
  end


  # Get a playlist's snapshot
  get '/playlists/:code' do
    playlist = Playlist.get(params[:code])
    error(404) unless playlist

    json playlist.snapshot(@user_id)
  end


  # Add a track, and vote for it
  post '/playlists/:code/tracks' do
    playlist = Playlist.get(params[:code])
    error(404) unless playlist

    track = playlist.add_track(params[:track])
    track.vote(@user_id)

    Notifications.publish(playlist.code)

    json playlist.snapshot(@user_id)
  end


  # Vote for a track
  # Track not found
  post '/playlists/:code/tracks/:track_id' do
    playlist = Playlist.get(params[:code])
    error(404) unless playlist

    track = playlist.track(params[:track_id])
    error(404) unless track

    track.vote(@user_id)

    Notifications.publish(playlist.code)

    json playlist.snapshot(@user_id)
  end


  # Pop the top track from the playlist
  delete '/playlists/:code/tracks' do
    playlist = Playlist.get(params[:code])
    error(404) unless playlist

    track = playlist.pop_top_track!

    # TODO : recommendations if no track

    Notifications.publish(playlist.code)

    json track ? track.snapshot : nil
  end

end