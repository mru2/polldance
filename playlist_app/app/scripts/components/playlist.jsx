/** @jsx React.DOM */
// The react playlist component

var Playlist = React.createClass({

  getInitialState: function() {
    return {
      tracks: []
    }
  },

  update: function(tracks) {
    var i;
    for (i = 0; i < tracks.length; i++) {
      this.updateTrack(tracks[i]);
    }
    this.render();
  },

  updateTrack: function(trackAttrs) {
    var trackComponent = this.refs[trackAttrs.id];

    if (!trackComponent) {
      var newTracks = this.state.tracks.concat(trackAttrs)
      this.setState({tracks: newTracks});
    }
    else {
      trackComponent.update(trackAttrs);
    }   

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
                  <span className="pd-title">poll<em>.dance</em> / 2</span>
              </div>
          </header>

          <section>
            {trackNodes}
          </section>

      </div>

    );
  }
});