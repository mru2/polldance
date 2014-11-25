require 'sinatra/base'

require 'current_user'
require 'playlist'

class Server < Sinatra::Base

  include CurrentUser

  # Homepage
  get '/' do
    render :home
  end


  # Playlist creation
  post '/launch' do
    if !params[:code]
      redirect to('/?no_code_given')
    end

    playlist = Playlist.create(params[:code])
    redirect to("/#{playlist.code}/player")
  end


  # App for a given playlist
  get '/:code' do
    @playlist = Playlist.get(params[:code])

    if !@playlist
      redirect to('/?wrong_code')
    end

    render :app
  end


  # Player page
  get '/:code/player' do
    @playlist = Playlist.get(params[:code])

    if !@playlist
      redirect to('/?wrong_code')
    end

    render :player
  end 


end