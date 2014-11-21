Front

 * code entering => 301 on /p/:id (parameterized on submit)
 * periodic refresh + eventsource notifications
 * search
 * currently playing
 * material design : fat header + list
 * upvote via slide

 
Back

 * Ruby Sinatra API
 * Full-sync on every request
 * GET /p/:login
 * POST /p # Create room
 * GET /p/:id * Playlist app
 * GET /p/:id/player
 * POST /p/:id/t
 * PUT /p/:id/t/:id
 * DELETE /p/:id/t (top)

 + evensource notifications on change (for room)


Features (new)

 * code tolowercase singleword also url
 * polling when no more track, for autoplay
 * track autoplay (auto via DELETE if none)


KISS

 * full-sync : same body on every fetch
 * refresh by default, sync afterward
 * code IS id IS url