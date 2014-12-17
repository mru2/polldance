require 'echonest'
require 'dotenv'

api_key = Dotenv.load['ECHONEST_API_KEY']

ECHONEST = Echonest.new(api_key)