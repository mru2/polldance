
(function(Reflux, Actions, global) {
	'use strict';

	// Global array with all our tracks
	var _tracks = [];

  // Update the playlist
  var updatePlaylist = function(newPlaylist) {
    _tracks = _.map(newPlaylist.tracks, function(track, index){
      track.position = index;
      return track;
    });    
  };

	global.TracksStore = Reflux.createStore({

    // Getters
    getTracks: function(){
      return _tracks;
    },

    // Listeners
		listenables: [Actions], // Convenience syntax. cf https://github.com/spoike/refluxjs

		onUpdatePlaylist: function(playlist) {
      console.log('[TRACKS STORE] Received new playlist', playlist);
      updatePlaylist(playlist);
      this.trigger();
		},

		onAddTrackSuccess: function(playlist) {
      console.log('[TRACKS STORE] Track added', playlist);
      updatePlaylist(playlist);
      this.trigger();
		},

		onUpvoteTrack: function(trackId) {
      console.log('[TRACKS STORE] Upvoting track', trackId);
      // optimistic : ( (mean * count) + val ) / score + 1
		},

    onUpvoteTrackSuccess: function(playlist) {
      console.log('[TRACKS STORE] Track upvoted', playlist);
      updatePlaylist(playlist);
      this.trigger();      
    }

	});

})(window.Reflux, window.PD.Actions, window.PD);