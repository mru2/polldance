# Notifications server for playlist updates, via Eventsource
require 'sinatra/base'
require 'notifications'
require 'current_user'

class Stream < Sinatra::Base

  include CurrentUser

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