/** @jsx React.DOM */
var Playlist = React.createClass({

  mixins: [Reflux.ListenerMixin],

  getInitialState: function() {
    return {
      tracks: []
    };
  },

  componentDidMount: function() {
    this.listenTo(PD.TracksStore, this.onTracksChange);
  },

  onTracksChange: function(){
    console.log('[PLAYLIST] Tracks changed');
    this.setState({tracks: PD.TracksStore.getTracks()});
  },


  render: function() {

    var sectionStyle = {
      transform: 'translateX(' + (this.props.displayed ? '0' : '-100%') + ')'
    };

    var sorted_tracks = _.sortBy(this.state.tracks, function(track){ return track.id; });

    var trackNodes = sorted_tracks.map(function(track){

      var trackNode = (
        <Track 
          key={track.id}
          ref={track.id}
          id={track.id}
          artist={track.artist}
          title={track.title}
          score={track.score}
          age={track.age}
          like_age={track.like_age} 
          position={track.position} />
      );

      return trackNode;

    });

    return (

      <section style={sectionStyle}>
        { trackNodes }
      </section>

    );
  }
});