// Vendor
//=require vendor/react/react.js
//=require vendor/reflux/dist/reflux.js
//=require vendor/tinycolor/tinycolor.js
//=require vendor/lodash/dist/lodash.compat.js
//=require vendor/hammerjs/hammer.js
//=require vendor/reqwest/reqwest.js

// Actions
//=require app/js/lib/actions.js

// Libs
//=require app/js/lib/swipe_mixin.js
//=require app/js/lib/api.js
//=require app/js/lib/notifications.js

// Stores
//=require app/js/lib/tracks_store.js
//=require app/js/lib/search_store.js
//=require app/js/lib/reload_store.js

// Components
//=require app/js/components/track.js
//=require app/js/components/playlist.js
//=require app/js/components/search.js
//=require app/js/components/app.js

// Configuration
// React.initializeTouchEvents(true);

PD.API.setup(window.BOOTSTRAP.code);

// Bootstrap app
PD.Actions.updatePlaylist(window.BOOTSTRAP)

// Render DOM
React.renderComponent(
  React.createElement(App, null),
  document.getElementById('app')
);