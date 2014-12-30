// Global : DZ
NEXT_TRACK_URL = '/api/v1/playlists/' + window.PD.CODE + '/tracks'
STREAM_URL = '/stream/' + window.PD.CODE

// The actual deezer player wrapper
var Player = {
  loadTrack: function(trackId){
    if (!trackId){
      DZ.player.pause();
    }
    DZ.player.playTracks([trackId]);
  },

  pause: function(){
    DZ.player.pause();
  },

  play: function(){
    DZ.player.play();
  }
}

// The page controller
var Controller = {
  
  // Status
  isInitialized: false,
  roomId: null,
  isLoggedIn: false,
  currentTrack: null,
  playlistEmpty: true,

  initialized: function(){ return this.isInitialized; },
  roomSet: function(){ return this.roomId !== null; },
  loggedIn: function(){ return this.isLoggedIn; },
  playing: function(){ return Player.playing(); },


  fetchingNext: false,

  init: function(){
    var self = this;

    console.log('initializing controller');

    DZ.init({
      appId  : '133181',
      channelUrl : ('http://' + window.location.host + '/channel.html'),
      player : {
        playlist: false,
        onload : function(){
          // Watch the track end
          DZ.Event.subscribe('track_end', function(){
            console.log('track end triggered');
            self.loadNextTrack();
          });

          // Update the view
          self.isInitialized = true;
        }
      }
    });

    var source = new EventSource(STREAM_URL);
    var self = this;
    source.addEventListener('message', function(message){
      var payload = JSON.parse(message.data);
      console.log('[SOURCE] Received update with payload', payload);
      if (self.playlistEmpty) {

        // Autoplay the top track
        if (payload.tracks.length > 0) {
          self.loadNextTrack();
        }

      };

    });
  },

  login: function(){
    console.log('logging in...');
    var self = this;

    DZ.login(function(response) {
      if (response.authResponse) {
        console.log('Welcome!  Fetching your information.... ');
        DZ.api('/user/me', function(response) {
          console.log('Good to see you, ' + response.name + '.');

          // Update the view
          self.isLoggedIn = true;
          View.showPlayer();

        });
      } else {
        console.log('User cancelled login or did not fully authorize.');
      }
    }, {perms: 'manage_library,delete_library'});
  },

  play: function(){
    if (!this.currentTrack) {
      this.loadNextTrack();
    }
    else{
      Player.play();
      View.setPlaying();
    }
  },

  pause: function(){
    Player.pause();
    View.setPaused();
  },

  loadNextTrack: function(){

    // // Do not destroy the top playlist
    // if (this.fetchingNext) { return false; }
    // this.fetchingNext = true;
    // console.log('now fetching next');

    var self = this;
    $.ajax({
      url: NEXT_TRACK_URL,
      type: 'DELETE',
      success: function(track){
        Player.loadTrack(track.id);
        self.currentTrack = track;
        self.playlistEmpty = false;
        View.updateTrack(track);
        View.setPlaying();
      },
      error: function(res){
        if (res.status === 404) { 
          // Toggle autoplay
          self.playlistEmpty = true;
          Player.loadTrack(null);
          self.currentTrack = null;

          View.setNoTrack();
          View.setPaused();
        }
      }
    });
  },

};

// The view wrapper
var View = {

  init: function(cb){

    console.log('initializing view');

    // Store dom elements
    this.loginCont = $('.login');
    this.playingCont = $('.playing');
    this.currentTrackCont = $('.current');

    var self = this;

    // Bind events
    this.loginCont.find('a').on('click', function(){
      Controller.login();
    });

    this.playingCont.find('#play').on('click', function(){
      Controller.play();      
    });

    this.playingCont.find('#pause').on('click', function(){
      Controller.pause();      
    });

    this.playingCont.find('#next').on('click', function(){
      Controller.loadNextTrack();
    });

    this.playingCont.find('#app_link').on('click', function(e){
      e.preventDefault();
      window.open($(this).attr('href'), 'poll.dance', 'scrollbars=yes,width=640,height=960');
    });

    // Show the container
    $('#container').show()
  },

  showPlayer: function(){
    this.loginCont.hide();
    this.playingCont.show();
  },

  updateTrack: function(track){
    this.currentTrackCont.find('.artist').html(track.artist);
    this.currentTrackCont.find('.title').html(track.title);
  },

  setNoTrack: function(){
    this.currentTrackCont.find('.title').html('The playlist is empty');    
    this.currentTrackCont.find('.artist').html('Please add some tracks');
  },

  setPlaying: function(){
    this.playingCont.find('#play').hide();
    this.playingCont.find('#pause').show();
  },

  setPaused: function(){
    this.playingCont.find('#pause').hide();
    this.playingCont.find('#play').show();
  }

};



View.init();
Controller.init();
