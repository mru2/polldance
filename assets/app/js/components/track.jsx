/** @jsx React.DOM */
// The react track component

// var LIKED_BG_NEW = '#8e44ad'; // $darkmain
// var UNLIKED_BG = '#ecf0f1'; // white 
// var SLIDER_PEEK = 72; // $height
// var TRACK_HEIGHT = 72; // $height


// Constants for rendering
var TRACK_HEIGHT = 72;

var Track = React.createClass({

  mixins: [PositionMixin, SwipeMixin], 

  componentDidMount: function() {
    console.log('[TRACK] Creating DOM node');
  },

  getInitialState: function() {
    return {
      sliderX: 0
    };
  },

  upvote: function(){
    console.log('[TRACK] on upvote');

    PD.Actions.upvoteTrack(this.props.id);
    PD.API.upvoteTrack(this.props.id)
          .then(PD.Actions.upvoteTrackSuccess)
          .then(PD.Actions.apiFailure);
  },

  handleSwipeStart: function(){
    console.log('[TRACK] swipe start');
    this.setState({sliderX: 72});
  },

  handleSwipeProgress: function(length){
    console.log('[TRACK] swipe progress : ', length);
    this.setState({sliderX: 72 + length});
  },

  handleSwipeSuccess: function(length){
    console.log('[TRACK] swipe success');
    this.setState({sliderX: 0});
    this.upvote();
  }, 

  handleSwipeFailure: function(length){
    console.log('[TRACK] swipe failure');
    this.setState({sliderX: 0});
  },

  render: function() {
  
    // Styles for swiping
    var sliderStyle = {
      transform: 'translateX(' + (this.state.sliderX) + 'px)',
      '-webkit-transform': 'translateX(' + (this.state.sliderX) + 'px)'
    };

    var leftStyle = {
      transform: 'translateX(' + (this.state.sliderX) + 'px)',
      '-webkit-transform': 'translateX(' + (this.state.sliderX) + 'px)'
    };

    // Handle score opacity
    if (this.state.sliderX > 0) {
      var scoreStyle = {opacity: 0};
    }

    return (

      <div className="item track" style={this.getItemPositionStyle()}>
          <div className="item-right">
            <div className="item-content">
              <a className="item-icon">
                <span className="track-score" style={scoreStyle} onClick={this.upvote}>{this.props.score}</span>
              </a>
            </div>
          </div>

          <div className='item-slider' style={sliderStyle}>
            <div className="item-right">
              <div className="item-content">
                <i className="item-icon fa fa-heart"></i>
              </div>
            </div>
          </div>

          <div className="item-left" style={leftStyle}>
              <div className="item-content">
                  <div className="item-line track-title">{this.props.title}</div>
                  <div className="item-line track-artist">{this.props.artist}</div>
              </div>
          </div>
      </div>

    );
  }
});