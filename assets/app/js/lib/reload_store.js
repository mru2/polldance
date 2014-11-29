// Handle manual and timed refreshes
// Internal state = timeout
// Bound to loading UI indicator

(function(Reflux, Actions, global) {
  'use strict';

  // Is it updating?
  var _loading = false;

  // Timeout for the next reload
  var _reloadTimeout = null;

  global.ReloadStore = Reflux.createStore({

    // Listeners
    listenables: [Actions],

    onUpdatePlaylist: function(){
      console.log('[RELOAD] Playlist updated');
      // Clear timeout
      this.trigger();
    },

    onRefresh: function(){
      console.log('[RELOAD] Launching refresh');
      // Cancel timeout
      // Set reloading      
      this.trigger();
    }

  });


})(window.Reflux, window.PD.Actions, window.PD);