redis_db = case APP_ENV
when :production
  1
when :test
  2
else
  0
end

REDIS = Redis.new(db: redis_db)