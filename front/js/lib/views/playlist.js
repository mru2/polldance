/** @jsx React.DOM */
// The react playlist component

var Playlist = React.createClass({

  getInitialState: function() {
    return {
      tracks: []
    }
  },

  setTracks: function(tracks) {
    console.log('setting new tracks', tracks);
    this.setState({tracks: tracks});
  },

  onAddTrack: function(track) {
    console.log('track added : ', track);
    this.state.tracks.append(track);
  },

  onUpdateTrack: function(trackAttrs) {
    console.log('updating track : ', track);
    var track = this.refs[trackAttrs.id];

    if (!track) {
      console.log('track not found', track);
      return;
    }

    track.update(trackAttrs);
  },

  onRemoveTrack: function(track) {
    console.log('track removed : ', track);
  },

  render: function() {

    var trackNodes = this.state.tracks.map(function(track){

      var trackNode = (
        <Track 
          ref={track.id}
          artist={track.artist}
          title={track.title}
          track={track} />
      );

      return trackNode;

    });

    return (

      <div className="pd-main pd-has-header playlist">

          <header className="pd-item pd-header">
              <div className="pd-item-content">
                  <span className="pd-title">poll.dance / 2</span>
              </div>
          </header>

          <section>
            {trackNodes}
          </section>

      </div>

    );
  }
});