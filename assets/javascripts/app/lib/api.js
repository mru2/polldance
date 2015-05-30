// Api global client
// Promises around HTTP API
// Trigger playlistUpdate actions
// Maybe call notifications on answer ?

(function(Actions, global) {

  global.API = {
    setup: function(base_url){
      this.base_url = base_url;
    },

    search: function(query){
      return reqwest({
        url: this.base_url + '/search',
        type: 'json',
        method: 'get',
        data: {query: query}
      });
    },

    addTrack: function(attributes){
      return reqwest({
        url: this.base_url + '/tracks',
        type: 'json',
        method: 'post',
        data: {track: attributes}
      });
    },

    upvoteTrack: function(trackId){
      return reqwest({
        url: this.base_url + '/tracks/' + trackId,
        type: 'json',
        method: 'post'
      });
    },

    refresh: function(){
      return reqwest({
        url: this.base_url,
        type: 'json',
        method: 'get'
      });
    }
  };

})(window.PD.Actions, window.PD);