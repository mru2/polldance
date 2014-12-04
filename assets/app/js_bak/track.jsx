/** @jsx React.DOM */
// The react track component

var LIKED_BG_NEW = '#8e44ad'; // $darkmain
var UNLIKED_BG = '#ecf0f1'; // white 
var SLIDER_PEEK = 72; // $height

var Track = React.createClass({
  getInitialState: function() {

    return {
      index: this.props.track.index,
      liked: this.props.track.liked,
      score: this.props.track.score,
      age: this.props.track.age,
      like_age: this.props.track.like_age,

      anim_current_state: 'start',
      anim_next_state: null,
      anim_step: 'done', // done, start, progress

      sliderDelta: 0
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
    this.swipeController = new SwipeController(this, {
      start: this.onSwipeStart.bind(this),
      move: this.onSwipeMove.bind(this),
      success: this.onSwipeSuccess.bind(this),
      failure: this.onSwipeFailure.bind(this)
    });
  },

  bgColor: function(){
    if (this.state.liked) {
      return tinycolor(LIKED_BG_NEW).desaturate(this.state.like_age * 100).toString();
    }
    else {
      return UNLIKED_BG;
    }
  },

  animateToState: function(state, delay){
    if (this.state.anim_step !== 'done' && this.state.anim_next_state === state){
      return;
    }

    var self = this;

    self.setState({
      anim_step: 'start',
      anim_next_state: state
    }, function(){
      self.setState({
        anim_step: 'progress',
      }, function(){
        setTimeout(function(){
          self.setState({
            anim_current_state: state,
            anim_next_state: null,
            anim_step: 'done'
          });
        }, delay);

      });

    });

  },


  onSwipeStart: function(){
    this.animateToState('swiping', 200);
  },

  onSwipeMove: function(delta){
    this.setState({
      sliderDelta: delta
    });
  },

  onSwipeFailure: function(){
    this.animateToState('start', 200);
    this.setState({
      sliderDelta: 0
    });
  },

  onSwipeSuccess: function(){
    this.animateToState('swiped', 200);
    this.setState({
      sliderDelta: 0
    });
  },


  getStyles: function(){
    styles = {
      track: {},
      left: {},
      score: {},
      slider: {}
    }

    // Background
    styles.track.background = this.bgColor();

    // Vertical positioning
    styles.track.transform = 'translateY(' + this.state.index * 72 + 'px)';

    // Score sizing (0.8 to 1.2)
    styles.score.transform = 'scale(' + 1.2 - this.state.age * 0.4 + ')';

    // Slider position
    if (this.state.sliderDelta) {
      styles.slider.transform = 'translateX(' + (SLIDER_PEEK + this.state.sliderDelta) + 'px)';
      styles.left.transform = 'translateX(' + (SLIDER_PEEK + this.state.sliderDelta) + 'px)';
    }

    return styles;
  },


  getClasses: function(){
    // Base classes
    var classes = 'item track';

    // Liked
    if (this.state.liked) {
      classes += ' track-active';
    }

    // Anim state
    if (this.state.anim_step === 'done') {
      classes += ' step-' + this.state.anim_current_state + '-done';      
    }
    else if (this.state.anim_step === 'start') {
      classes += ' step-' + this.state.anim_current_state + '-done';
      classes += ' step-' + this.state.anim_next_state + '-anim'; 
    }
    else if (this.state.anim_step === 'progress') {
      classes += ' step-' + this.state.anim_next_state + '-done'; 
      classes += ' step-' + this.state.anim_next_state + '-anim'; 
    }

    return classes;
  },


  render: function() {
    var styles = this.getStyles();
    var classes = this.getClasses();

    return (

      <div className={classes} style={styles.track}>
          <div className="item-right">
            <div className="item-content">
              <a className="item-icon">
                <span className="track-score" style={styles.score}>{this.state.score}</span>
              </a>
            </div>
          </div>

          <div className='item-slider' style={styles.slider}>
            <div className="item-right">
              <div className="item-content">
                <i className="item-icon fa fa-heart"></i>
              </div>
            </div>
          </div>

          <div className="item-left" style={styles.left}>
              <div className="item-content">
                  <span className="track-title">{this.props.title}</span>
                  <span className="track-artist">{this.props.artist}</span>
              </div>
          </div>
      </div>

    );
  }
});