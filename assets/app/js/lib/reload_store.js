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
      // Clear timeout
    },

    onRefresh: function(){
      // Cancel timeout
      // Set reloading      
    },

    // Notifier
    onUpdate: function(){
      console.log('[RELOAD] Notifying of loading change');
      this.trigger();
    }

  });


})(window.Reflux, window.PD.Actions, window.PD);