"use strict"

// The current playlist, handle the sorting and indices, also the dirty checking
// !!! Handle deletion

var SortedTracks = function(){

  // Internally an indexed collection
  this.tracks = [];
  this.tracksIndex = {};

};


// Returns all the changed tracks
SortedTracks.prototype.load = function(tracks){

  var self = this;

  // Handle when only a track is given
  if (!_.isArray(tracks)) {
    tracks = [tracks];
  }

  _.each(tracks, _.bind(this.loadTrack, this));

  // Recompute indices
  this.sortAll();

  // Output changes
  return this.flushChanges();
};


// Private shit here
SortedTracks.prototype.loadTrack = function(track){

  var trackId = track.id;

  // New track?
  if (!this.tracksIndex[trackId]) {
    this.addTrack(track);
  }

  // Update?
  else {
    this.updateTrack(trackId, track);
  }

};


SortedTracks.prototype.addTrack = function(track){

  var trackId = track.id;

  // Add the track to the collection
  this.tracks.push(track);

  // Store the index
  this.tracksIndex[trackId] = track;    

  // New => has to be in the changes
  track.changed = true;

};


SortedTracks.prototype.updateTrack = function(id, attrs){

  var track = this.tracksIndex[id];

  // Only relevant fields
  track.score    = attrs.score;
  track.liked    = attrs.liked;
  track.age      = attrs.age;
  track.like_age = attrs.like_age;

  // Set as changed
  track.changed = true;

};


SortedTracks.prototype.sortAll = function(){

  // Baaastoooon 
  this.tracks.sort(function(t1, t2){
    if (t1.score === t2.score) {
      return t1.age - t2.age; // Lowest first
    }
    else {
      return t2.score - t1.score; // Highest first
    }
  });

  // Re-baaaastoooon
  var i;
  for (i = 0; i < this.tracks.length; i++) {
    if (this.tracks[i].index !== i) {
      this.tracks[i].index = i;
      this.tracks[i].changed = true;
    }
  }

};


SortedTracks.prototype.flushChanges = function(){

  return _.select(
    this.tracks, 
    function(track){ 
      var changed = track.changed;
      track.changed = false;
      return changed;
    }
  );

};


// Export
window.SortedTracks = SortedTracks;