(function(Reflux, Actions, global) {
  'use strict';

  // Search results
  var _results = [];

  // Search query
  var _query = '';

  // Is the search displayed?
  var _displayed = false;


  global.SearchStore = Reflux.createStore({

    // Getters


    // Listeners
    listenables: [Actions],

    onDoSearch: function(query) {
      console.log('[SEARCH] Searching for', query);
      // Fetch results
    },

    onUpdateSearchResults: function(res){
      // Display results
      this.trigger();
    },

    onToggleSearch: function(shown) {
      console.log('[SEARCH] Toggling search.');
      // Hide/show search
      this.trigger();
    },

    onAddTrack: function() {
      console.log('[SEARCH] Adding a track');
      // Hide the search
      this.trigger();
    },

    onUpdatePlaylist: function(playlist) {
      console.log('[SEARCH] Playlist changed : ', playlist);
      // TODO : display accordingly whether the results should be added or upvoted
      this.trigger();
    }

  });

})(window.Reflux, window.PD.Actions, window.PD);