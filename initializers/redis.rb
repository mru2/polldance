REDIS_HOST = ENV['REDISTOGO_URL'] || 'redis://127.0.0.1:6379'

db = case APP_ENV
when :production
  1
when :test
  2
else
  0
end

REDIS = Redis.new(url: "#{REDIS_HOST}/#{db}")
