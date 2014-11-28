require 'sinatra/base'

require 'current_user'
require 'playlist'

class Server < Sinatra::Base

  include CurrentUser
  set :views, "#{APP_ROOT}/views"


  # Homepage
  get '/' do
    erb :home
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
    playlist = Playlist.get(params[:code])

    if !playlist
      redirect to('/?wrong_code')
    end

    @bootstrap = playlist.snapshot(@user_id)

    erb :app
  end


  # Player page
  get '/:code/player' do
    @playlist = Playlist.get(params[:code])

    if !@playlist
      redirect to('/?wrong_code')
    end

    erb :player
  end 


end