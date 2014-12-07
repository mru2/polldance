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
      transform: 'translateX(' + (this.props.displayed ? '0' : '-100%') + ')',
      '-webkit-transform': 'translateX(' + (this.props.displayed ? '0' : '-100%') + ')'
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
          position={track.position + 1} />
      );

      return trackNode;

    });

    return (

      <section style={sectionStyle}>
        <div className="item subheader track">
          <div className="item-left">
              <div className="item-content">
                  <div className="item-line">Happy</div>
                  <div className="item-line">C2C</div>
              </div>
          </div>
          <div className="item-right">
            <div className="item-content">
              <a className="item-icon">
                <i className="fa fa-volume-up"></i>
              </a>
            </div>
          </div>
        </div>
        { trackNodes }
      </section>

    );
  }
});