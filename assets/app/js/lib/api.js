// Api global client
// Promises around HTTP API
// Trigger playlistUpdate actions
// Maybe call notifications on answer ?

(function(Actions, global) {

  global.API = {
    setup: function(playlist_code){
      this.playlist_code = playlist_code;
    },

    upvoteTrack: function(trackId){

      reqwest({
        url: '/api/playlists/' + this.playlist_code + '/tracks/' + trackId,
        type: 'json',
        method: 'post',
        error: function (err) { alert('An error happened'); },
        success: function (playlist) {
          PD.Actions.updatePlaylist(playlist);
        }
      });

    }
  };

})(window.PD.Actions, window.PD);