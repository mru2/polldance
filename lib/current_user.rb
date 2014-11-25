# Sinatra helper for fetching / setting the current user via cookies
require 'sinatra/cookies'

module CurrentUser

  def self.included(base)

    # Configuration
    base.helpers Sinatra::Cookies
    base.set :cookie_options, :domain => nil # Cookies on localhost are not persisted. https://github.com/sinatra/sinatra-contrib/issues/113

    # Handle the current user
    base.before do
      @user_id = cookies[:uid] ||= SecureRandom.hex(8)
    end

  end

end