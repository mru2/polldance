// Api global client
// Promises around HTTP API
// Trigger playlistUpdate actions
// Maybe call notifications on answer ?

(function(Actions, global) {

  global.API = {
    setup: function(playlist_code){
      this.playlist_code = playlist_code;
    },

    search: function(query){
      return reqwest({
        url: '/api/v1/playlists/' + this.playlist_code + '/search',
        type: 'json',
        method: 'get',
        data: {query: query}
      });
    },

    addTrack: function(attributes){
      return reqwest({
        url: '/api/v1/playlists/' + this.playlist_code + '/tracks',
        type: 'json',
        method: 'post',
        data: {track: attributes}
      });
    },

    upvoteTrack: function(trackId){
      return reqwest({
        url: '/api/v1/playlists/' + this.playlist_code + '/tracks/' + trackId,
        type: 'json',
        method: 'post'
      });
    }
  };

})(window.PD.Actions, window.PD);