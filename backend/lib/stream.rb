# Notifications server for playlist updates, via Eventsource
require 'sinatra/base'
require 'sinatra/cookies'
require 'notifications'

class Stream < Sinatra::Base

  # Configuration
  helpers Sinatra::Cookies
  set :cookie_options, :domain => nil # Cookies on localhost are not persisted. https://github.com/sinatra/sinatra-contrib/issues/113

  get '/' do
    erb :test
  end

  get '/:code', provides: 'text/event-stream' do
    user_id = cookies[:uid]

    stream :keep_open do |out|
      Notifications.subscribe(out, params[:code], user_id)

      out.callback do
        Notifications.unsubscribe(out)
      end
    end
  end

  Notifications.run!
 
end