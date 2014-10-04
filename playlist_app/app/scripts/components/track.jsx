/** @jsx React.DOM */
// The react track component

var Track = React.createClass({
  getInitialState: function() {

    return {
      index: this.props.track.index,
      liked: this.props.track.liked,
      score: this.props.track.score,
      age: this.props.track.age,
      frozen: false,
      swipeProgress: null
    };

  },

  update: function(track) {
    console.log('updating with', track);
    this.setState({
      index: track.index,
      liked: track.liked,
      score: track.score,
      age: track.age
    });
  },

  componentDidMount: function(){
    // Called after initialized, handle listeners here
    // Also, allowed to call setState ...
  },

  trackStyle: function(){
    return {
      transform: 'translateY(' + this.state.index * 72 + 'px)'
    }
  },


  render: function() {
    var trackStyle = this.trackStyle();

    return (

      <div className="pd-item pd-track voted semi-recent middle" style={trackStyle}>
          <div className="pd-left">
              <div className="pd-item-content">
                  <span className="pd-track-title">{this.props.title}</span>
                  <span className="pd-track-artist">{this.props.artist}</span>
              </div>
          </div>
          <div className="pd-right">
            <div className="pd-item-content">
              <a className="pd-icon">
                <span className="score">{this.state.score}</span>
              </a>
            </div>
          </div>
      </div>

    );
  }
});