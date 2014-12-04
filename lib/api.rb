require 'sinatra/base'
require 'sinatra/json'
require 'rack/contrib'

require 'playlist'
require 'notifications'
require 'current_user'

require 'deezer'

class Api < Sinatra::Base

  include CurrentUser

  use ::Rack::PostBodyContentTypeParser

  configure do
    set :root, APP_ROOT
  end


  # Error handling
  def error(code, msg = nil)
    status code
    json error: msg if msg
    halt
  end


  # Get a playlist's snapshot
  get '/playlists/:code' do
    playlist = Playlist.get(params[:code])
    error(404) unless playlist

    json playlist.snapshot(@user_id)
  end


  # Vote for a track
  get '/playlists/:code/search' do
    playlist = Playlist.get(params[:code])
    error(404) unless playlist

    query = params[:query]
    error(404) unless query

    results = Deezer.new.search query

    json results
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