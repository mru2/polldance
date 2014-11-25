require 'rubygems'
require 'bundler'

Encoding.default_external = 'utf-8'

APP_ENV = (ENV['RACK_ENV'] ||= 'development').to_sym
APP_ROOT = ENV['APP_ROOT'] ||= File.expand_path('..', __FILE__)

Bundler.setup
Bundler.require(:default, APP_ENV)

$LOAD_PATH.unshift File.join(APP_ROOT, 'lib')

Dir[APP_ROOT + '/initializers/**/*.rb'].each do |file|
  require file
end