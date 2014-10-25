/** @jsx React.DOM */
// The react track component

var LIKED_BG_NEW = '#8e44ad'; // $darkmain
var UNLIKED_BG = '#ecf0f1'; // white 
var SLIDER_PEEK = '72'; // $height

var Track = React.createClass({
  getInitialState: function() {

    return {
      index: this.props.track.index,
      liked: this.props.track.liked,
      score: this.props.track.score,
      age: this.props.track.age,
      like_age: this.props.track.like_age,
      hasSlider: false,
      touchDelta: 0,
      swipeStatus: null
    };

  },

  update: function(track) {
    console.log('updating with', track);
    this.setState({
      index: track.index,
      liked: track.liked,
      score: track.score,
      age: track.age,
      like_age: track.like_age
    });
  },

  componentDidMount: function(){
    // Called after initialized, handle listeners here
    // Also, allowed to call setState ...
    this.swipeController = new SwipeController(this);
  },

  bgColor: function(){
    if (this.state.liked) {
      return tinycolor(LIKED_BG_NEW).desaturate(this.state.like_age * 100).toString();
    }
    else {
      return UNLIKED_BG;
    }
  },

  sliderPos: function(){
    if (this.state.swipeStatus) {
      return '100%';
    }

    if (!this.state.hasSlider) {
      return '0px';
    }

    return (72 + (this.state.touchDelta || 0)).toString() + 'px';
  },

  trackStyle: function(){
    return {
      transform: 'translateY(' + this.state.index * 72 + 'px)',
      background: this.bgColor()
    }
  },

  scoreStyle: function(){
    // Sizing : 1.2 to 0.8
    var sizing = 1.2 - this.state.age * 0.4;    
    return {
      transform: 'scale(' + sizing + ')'
    }
  },

  sliderStyle: function(){
    var style = {
      transform: 'translateX(' + this.sliderPos() + ')'
    }

    if (this.state.swipeStatus === 'hidden') {
      style.opacity = 0;
    }

    return style;
  },

  contentStyle: function(){
    return {
      transform: 'translateX(' + this.sliderPos() + ')'
    }
  },

  setSwiped: function(){
    var self = this;

    // Set swiped
    this.setState({
      swipeStatus: 'cover',
      hasSlider: false,
      touchDelta: 0
    });

    // 1000ms later : fade out the slider
    setTimeout(function(){
      self.setState({
        swipeStatus: 'hidden'
      });

      // 1000ms later : re-hide the slider
      setTimeout(function(){
        self.setState({
          swipeStatus: null
        });
      }, 1000);
    }, 1000);

  },

  // onTouchStart: function(e){
  //   this.setState({
  //     hasSlider: true
  //   });

  //   this.startX = e.targetTouches[0].clientX;
  //   this.setState({
  //     touchDelta: 0
  //   });
  // },

  // onTouchMove: function(e){
  //   console.log('touch move');
  //   this.setState({
  //     touchDelta: e.targetTouches[0].clientX - this.startX
  //   });
  // },

  // onTouchEnd: function(e){
  //   if (this.state.touchDelta < 100) {
  //     this.setState({
  //       touchDelta: 0,
  //       hasSlider: false
  //     });      
  //   }
  //   else {
  //     alert('Swiping!')
  //     this.setState({
  //       touchDelta: 0,
  //       hasSlider: false
  //     });            
  //   }
  // },

  render: function() {
    var trackStyle = this.trackStyle();

    var trackClasses = 'pd-item pd-track';
    if (this.state.liked) {
      trackClasses += ' voted';
    }

    var scoreStyle = this.scoreStyle();

    var sliderClass = 'pd-slider';
    var sliderStyle = this.sliderStyle();
    var contentStyle = this.contentStyle();

    var rightStyle = {
      background: this.bgColor()      
    };

    return (

      <div className={trackClasses} style={trackStyle}>
          <div className='pd-slider' style={sliderStyle}>
            <div className="pd-right">
              <div className="pd-item-content">
                <i className="pd-icon fa fa-heart"></i>
              </div>
            </div>
          </div>

          <div className="pd-left" style={contentStyle}>
              <div className="pd-item-content">
                  <span className="pd-track-title">{this.props.title}</span>
                  <span className="pd-track-artist">{this.props.artist}</span>
              </div>
          </div>
          <div className="pd-right" style={rightStyle}>
            <div className="pd-item-content">
              <a className="pd-icon">
                <span className="score" style={scoreStyle}>{this.state.score}</span>
              </a>
            </div>
          </div>
      </div>

    );
  }
});