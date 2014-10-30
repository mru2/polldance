"use strict";

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


var TRACKS = [
  {
    id: 0,
    artist: "Kyle la Grange",
    title: "Cut Your Teeth (Kygo Remix)",
    score: 1,
    age: 0.5,
    liked: true,
    like_age: 0.3
  },

  {
    id: 1,
    artist: "Daft Punk",
    title: "Da Funk",
    score: 1,
    age: 0.9,
    liked: false,
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
  
  setInterval(function(){
    var index = Math.floor(Math.random() * 3);
    TRACKS[index].score += 1;
    TRACKS[index].like_age = Math.random();
    TRACKS[index].age = Math.random();
    TRACKS[index].liked = (Math.random() > 0.5);
    _launchCb(_onUpdateCb, TRACKS[index]);
  }, 2000);

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
  _launchCb(_onUpdateCb, TRACKS);
};

PlaylistController.simulateActivity = function(){
  simulateActivity();
};

// ==========================================

// Exposing the controller
window.PlaylistController = PlaylistController;