require './env.rb'
require 'api'
require 'stream'

run Rack::URLMap.new("/api"    => Api.new, 
                     "/stream" => Stream.new)
