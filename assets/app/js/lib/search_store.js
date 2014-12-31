(function(Reflux, Actions, global) {
  'use strict';

  // Search results
  var _results = global.CONFIG.SUGGESTIONS;

  // // Search query
  // var _query = '';

  // Is the search displayed?
  var _displayed = false;


  global.SearchStore = Reflux.createStore({

    // Getters
    searchDisplayed: function(){
      return _displayed;
    },

    getResults: function(){
      return _results;
    },

    // Listeners
    listenables: [Actions],

    onSearch: function(query) {
      console.log('[SEARCH STORE] Searching for', query);
      // Fetch results
    },

    onSearchSuccess: function(results){
      console.log('[SEARCH STORE] Search success, results are', results);
      // Display results
      _results = results;
      this.trigger();
    },

    onToggleSearch: function(shown) {
      console.log('[SEARCH STORE] Toggling search.');
      // Hide/show search
      _displayed = !_displayed;
      this.trigger();
    },

    onAddTrack: function() {
      console.log('[SEARCH STORE] Adding a track');
      // Hide the search
      this.trigger();
    },

    onAddTrackSuccess: function() {
      console.log('[SEARCH STORE] Track added');
      // Hide the search
      _displayed = false;
      this.trigger();
    },

    onUpdatePlaylist: function(playlist) {
      console.log('[SEARCH STORE] Playlist changed : ', playlist);
      // TODO : display accordingly whether the results should be added or upvoted
      this.trigger();
    }

  });

})(window.Reflux, window.PD.Actions, window.PD);