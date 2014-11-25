require './env.rb'
require 'api'
require 'stream'
require 'server'

run Rack::URLMap.new("/api"    => Api.new, 
                     "/stream" => Stream.new,
                     "/"       => Server.new)
