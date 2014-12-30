require 'sinatra/base'

require 'current_user'
require 'playlist'
require 'assets'

class Server < Sinatra::Base

  include CurrentUser
  set :views, "#{APP_ROOT}/views"
  set :assets, Assets.new

  helpers do
    def asset_path(source)
      if APP_ENV == :production
        "/assets/#{settings.assets.find_asset(source).digest_path}"
      else
        "/assets/#{source}"
      end
    end
  end


  # Homepage
  get '/' do
    erb :home
  end


  # Join a playlist
  post '/join' do
    if !params[:code]
      redirect to('/?no_code_given')
    end

    if playlist = Playlist.get(params[:code])
      redirect to("/#{playlist.code}")
    else
      redirect to('/?wrong_code')
    end
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