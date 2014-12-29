Front

 * code entering => 301 on /p/:id (parameterized on submit)
 * periodic refresh + eventsource notifications
 * search
 * currently playing
 * material design : fat header + list
 * upvote via slide
 * internally : tracks voted at / added at

 * flux-lite
   - global store for playlist + get()
   - actions (create / delete / ... ) on store
   - expose callback onchange// without arguments (let the virtual DOM be recomputed, supposed to be optimized anyway) https://news.ycombinator.com/item?id=8098154
   - components mounted with id, callback is setState(Store.get())

   https://github.com/spoike/refluxjs?

 * drop jquery for https://github.com/then/request

 * roboto font

 * css filter for animation

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


FLUX
  Actions = action chains (manually defined under PD.Actions)
  => call API
  => call Notifications
  => trigger sub-actions (listened to by stores)

Stores == solely app state