require './env.rb'
require 'api'
require 'stream'
require 'server'
require 'assets'

run Rack::URLMap.new("/api"    => Api.new, 
                     "/stream" => Stream.new,
                     "/"       => Server.new,
                     "/assets" => Assets.new)
