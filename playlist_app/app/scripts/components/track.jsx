/** @jsx React.DOM */
// The react track component

var Track = React.createClass({
  getInitialState: function() {

    // props.track shared?

    return {
      index: this.props.track.index,
      score: this.props.track.score,
      age: this.props.track.age,
      liked: this.props.track.liked,
      frozen: false,
      swipeProgress: null
    };

  },

  update: function(track) {
    console.log('updating with', track);
    this.setState({
      score: track.score,
      age: track.age,
      liked: track.liked
    });
  },

  componentDidMount: function(){
    // Called after initialized, handle listeners here
    // Also, allowed to call setState ...
  },


  render: function() {
    return (

      <div className="pd-item pd-track voted semi-recent middle">
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