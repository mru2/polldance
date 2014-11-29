/** @jsx React.DOM */
// The react track component

// var LIKED_BG_NEW = '#8e44ad'; // $darkmain
// var UNLIKED_BG = '#ecf0f1'; // white 
// var SLIDER_PEEK = 72; // $height
// var TRACK_HEIGHT = 72; // $height


// Constants for rendering
var TRACK_HEIGHT = 72;
var UNLIKED_BG = '#ecf0f1'; // $white
var LIKED_BG_NEW = '#8e44ad'; // $darkmain



// Styles
var getTrackStyles = function(props){

  styles = {
    track: {},
    score: {}
  }

  // Top position
  styles.track.transform = 'translateY(' + props.position * 72 + 'px)';

  // Score scale
  styles.score.transform = 'scale(' + (1.2 - props.age * 0.4) + ')';

  // Background
  if ( props.like_age ) {
    styles.track.backgroundColor = tinycolor(LIKED_BG_NEW).desaturate(props.like_age * 100).toString();
    styles.track.color = UNLIKED_BG;
  }
  else {
    styles.track.backgroundColor = UNLIKED_BG;
  }

  return styles;

};


var Track = React.createClass({

  componentDidMount: function() {
    console.log('[TRACK] Creating DOM node');
  },

  getInitialState: function() {
    return {}
  },

  upvote: function(){
    PD.Actions.upvoteTrack(this.props.id);
  },

  render: function() {
  
    var styles = getTrackStyles(this.props);

    return (

      <div className="item track" style={styles.track}>
          <div className="item-right">
            <div className="item-content">
              <a className="item-icon">
                <span className="track-score" style={styles.score} onClick={this.upvote}>{this.props.score}</span>
              </a>
            </div>
          </div>

          <div className='item-slider'>
            <div className="item-right">
              <div className="item-content">
                <i className="item-icon fa fa-heart"></i>
              </div>
            </div>
          </div>

          <div className="item-left">
              <div className="item-content">
                  <span className="track-title">{this.props.title}</span>
                  <span className="track-artist">{this.props.artist}</span>
              </div>
          </div>
      </div>

    );
  }
});