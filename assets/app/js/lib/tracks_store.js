
(function(Reflux, Actions, global) {
	'use strict';

	// Global array with all our tracks
	var _tracks = [];

  // The current track
  var _currentTrack = null;
 

	global.TracksStore = Reflux.createStore({

    // Getters


    // Listeners
		listenables: [Actions], // Convenience syntax. cf https://github.com/spoike/refluxjs

		onUpdatePlaylist: function(playlist) {
      console.log('[TRACKS] Received new playlist', playlist);
      _tracks = playlist.tracks;
      this.trigger();
		},

		onAddTrack: function(trackId, title, artist) {
      console.log('[TRACKS] Adding track', trackId, title, artist);
      // Optimistic add
		},

		onUpvoteTrack: function(trackId) {
      console.log('[TRACKS] Upvoting track', trackId);
      // Optimistic upvote
		}

	});

})(window.Reflux, window.PD.Actions, window.PD);