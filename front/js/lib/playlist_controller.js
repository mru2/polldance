// The playlist controller
// Listens to the websockets
// Handle reconnections, downloads, etc..
// Push data (track like / dislike)
// Expose an event, pushing a track array : 

// {
//   id: 
//   artist:
//   title: 
//   index: // In the playlist, 0-indexed
//   score: 
//   age: // Mean seconds since upvote 
//   liked: 
// }


TRACKS = [
  {
    id: 0,
    artist: "Kyle la Grange",
    title: "Cut Your Teeth (Kygo Remix)",
    index: 0,
    score: 3,
    age: 0.5,
    liked: true,
    like_age: 0.3
  },

  {
    id: 1,
    artist: "Daft Punk",
    title: "Da Funk",
    index: 1,
    score: 2,
    age: 0.9,
    liked: true,
    like_age: 0.7
  },

  {
    id: 2,
    artist: "Naxxos",
    title: "New Orlean",
    index: 2,
    score: 1,
    age: 0.1,
    liked: false,
    like_age: null
  }
];


// ==========================================


// Util
var _launchCb = function(cb, data){
  (typeof(cb) === 'function') && cb(data);
};

// Simulate activity
var simulateActivity = function(){
  
  setTimeout(function(){

    _launchCb(_onLoadCb, TRACKS);

    setInterval(function(){
      var index = Math.floor(Math.random() * 3);
      TRACKS[index].score += 1;
      _launchCb(_onTrackChangedCb, TRACKS[index]);
    }, 2000);

  }, 1000);

};


// ==========================================


// Public interface
var PlaylistController = {};
var _onLoadCb, _onTrackChangedCb;

PlaylistController.onLoad = function(cb){
  _onLoadCb = cb;
};

PlaylistController.onTrackChanged = function(cb){
  _onTrackChangedCb = cb;
};

PlaylistController.start = function(host, port, code){
  console.log('connecting to tracks on host', host, 'with port', port, 'and playlist code', code);
  simulateActivity(); // Debug
};


// ==========================================

// Exposing the controller
window.PlaylistController = PlaylistController;