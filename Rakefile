require './env.rb'
require 'rake/sprocketstask'
require 'assets'

Rake::SprocketsTask.new do |t|
  t.environment = Assets.new
  t.output      = "./public/assets"
  t.assets      = %w( app/js/main.js app/css/main.css home/css/main.css player/css/main.css player/js/main.js shared/fonts/*.ttf )
  t.logger      = Logger.new(STDOUT)
  t.log_level   = :debug
  t.keep        = 1
end
