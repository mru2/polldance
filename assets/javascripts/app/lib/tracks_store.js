
(function(Reflux, Actions, Notifications, global) {
	'use strict';

	// Global array with all our tracks
	var _tracks = [];

  // Currently playing
  var _currentlyPlaying = {};

  // Update the playlist
  var updatePlaylist = function(newPlaylist) {
    _tracks = _.map(newPlaylist.tracks, function(track, index){
      track.position = index;
      return track;
    });

    _currentlyPlaying = newPlaylist.currently_playing;
  };

  // Fetch a track
  var getTrack = function(trackId) {
    return _.find(_tracks, function(track){ return track.id === trackId });
  };

	global.TracksStore = Reflux.createStore({

    // Getters
    getTracks: function(){
      return _tracks;
    },

    getCurrentlyPlaying: function(){
      if (!_currentlyPlaying.title && !_currentlyPlaying.artist) {
        return {
          title: 'No track playing',
          artist: 'Please add one'
        }
      }
      else {
        return _currentlyPlaying;
      }
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
      // this.trigger();
		},

    onUpvoteTrackSuccess: function(playlist) {
      console.log('[TRACKS STORE] Track upvoted', playlist);
      updatePlaylist(playlist);
      this.trigger();      
    }

	});

})(window.Reflux, window.PD.Actions, window.PD.Notifications, window.PD);