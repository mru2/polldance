// Initialize the view
var playlistView = React.renderComponent(
  <Playlist/>,
  document.getElementById('content')
);

// Initialize the playlist
var playlist = new SortedTracks();

// Bind to track updates
PlaylistController.onUpdate(function(tracks){
  var changes = playlist.load(tracks);
  playlistView.update(changes);
});


// Initialize the app
PlaylistController.start();