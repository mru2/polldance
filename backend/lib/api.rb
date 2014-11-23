require 'sinatra/base'
require 'sinatra/json'

class Api < Sinatra::Base
  configure do
    set :root, APP_ROOT
  end

  # Handle the current user
  before do
    if cookie[:uid]
      @user_id = cookie[:uid]
    else
      @user_id = SecureRandom.hex(8)
      cookie[:uid] = @user_id
    end
  end


  # Create a playlist
  post '/api/playlists' do
    if !params[:code]
      status 422
      json error: "No code given"
    end

    playlist = Playlist.create(params[:code])
    json playlist.snapshot
  end


  # Get a playlist's snapshot
  get '/api/playlists/:code' do
    playlist = Playlist.get(params[:code])

    if !playlist
      head 404
    else
      json playlist.snapshot(@user_id)
    end
  end


  # Add a track, and vote for it
  post '/api/playlists/:code/tracks' do
    playlist = Playlist.get(params[:code])
    head 404 unless playlist

    track = playlist.add_track(params[:track])
    track.vote(@user_id)

    json playlist.snapshot(@user_id)
  end


  # Vote for a track
  post '/api/playlists/:code/tracks/:track_id' do
    playlist = Playlist.get(params[:code])
    head 404 unless playlist

    track = playlist.track(track_id)
    head 404 unless track

    track.vote(@user_id)
    json playlist.snapshot(@user_id)
  end


  # Pop the top track from the playlist
  delete '/api/playlists/:code/tracks' do
    playlist = Playlist.get(params[:code])
    head 404 unless playlist

    track = playlist.pop_top_track!

    # TODO : recommendations if no track

    json track ? track.snapshot : nil
  end

end