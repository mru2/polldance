// Vendor
//=require vendor/jquery/dist/jquery.js
//=require vendor/react/react.js
//=require vendor/tinycolor/tinycolor.js
//=require vendor/lodash/dist/lodash.compat.js
//=require vendor/hammerjs/hammer.js


// Libs
//=require app/js/lib/dummy_controller.js
//=require app/js/lib/sorted_tracks.js
//=require app/js/lib/swipe_controller.js
//=require app/js/components/track.js
//=require app/js/components/playlist.js


// Configuration
React.initializeTouchEvents(true);

// Initialize the view
var playlistView = React.renderComponent(
  React.createElement(Playlist, null),
  document.getElementById('content')
);

// Initialize the playlist
var playlist = new SortedTracks();

// Bind to track updates
PlaylistController.onUpdate(function(tracks){
  var changes = playlist.load(tracks);
  playlistView.update(changes);
});


// Initialize the app
PlaylistController.start();
// PlaylistController.simulateActivity();