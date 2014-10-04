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
    score: 3,
    age: 0.5,
    liked: true,
    like_age: 0.3
  },

  {
    id: 1,
    artist: "Daft Punk",
    title: "Da Funk",
    score: 2,
    age: 0.9,
    liked: true,
    like_age: 0.7
  },

  {
    id: 2,
    artist: "Naxxos",
    title: "New Orleans",
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

    _launchCb(_onUpdateCb, TRACKS);

    setInterval(function(){
      var index = Math.floor(Math.random() * 3);
      TRACKS[index].score += 1;
      _launchCb(_onUpdateCb, TRACKS[index]);
    }, 2000);

  }, 1000);

};


// ==========================================


// Public interface
var PlaylistController = {};
var _onUpdateCb;

PlaylistController.onUpdate = function(cb){
  _onUpdateCb = cb;
};

PlaylistController.start = function(host, port, code){
  console.log('connecting to tracks on host', host, 'with port', port, 'and playlist code', code);
  simulateActivity(); // Debug
};


// ==========================================

// Exposing the controller
window.PlaylistController = PlaylistController;