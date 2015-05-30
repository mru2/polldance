require './env.rb'
require 'api'
require 'stream'
require 'server'
require 'assets'

use Rack::Static, :urls => ["/public"]

run Rack::URLMap.new("/api/v1" => Api.new,
                     "/stream" => Stream.new,
                     "/"       => Server.new,
                     "/assets" => Assets.new)
