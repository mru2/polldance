/** @jsx React.DOM */

// Initialize the view
var playlist = React.renderComponent(
  <Playlist/>,
  document.getElementById('content')
);


// Bind to track updates
PlaylistController.onLoad(function(tracks){
  playlist.setTracks(tracks);
});

PlaylistController.onTrackChanged(function(track){
  playlist.onUpdateTrack(track);
});


// Initialize the app
PlaylistController.start();