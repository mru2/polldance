// Style constants
SLIDER_PEEK_X = 72;
SLIDER_PEEK_DURATION = 150;
SCORE_UPDATE_DURATION = 500;
RED = '#e74c3c';

var EASINGS = tweenState.easingTypes;

var AnimationMixin = {

  mixins: [tweenState.Mixin],

  // Tween states
  // ------------
  // - slider x
  // - score opacity
  // - slider opacity
  // - slider icon opacity

  // Direct states
  // -------------
  // - right background
  // - score scale
  // - score color

  // Possible steps
  // --------------
  // start -> hover
  // hover -> start
  // hover -> sending
  // sending -> done
  // sending -> start

  getInitialState: function(){
    // Should depend on 'liked' prop
    return {
      animation_step: 'start',
      scoreColor: 'black',
      sliderX: 0,
      leftX: 0,
      scoreOpacity: 1,
      sliderOpacity: 1,
      sliderIconOpacity: 1,
      scoreScale: 1,
      scoreBackground: 'transparent'
    };
  },

  componentDidMount: function(){
    this.fullWidth = this.getDOMNode().offsetWidth;
  },

  animateTo: function(target, data){

    var source = this.state.animation_step;

    this[source + '_to_' + target](data);

    this.setState({
      animation_step: target
    });

  },

  // Handle custom styles depending on current state
  getStyles: function(sliderDelta){
    var sliderX           = this.getTweeningValue('sliderX');
    var scoreOpacity      = this.getTweeningValue('scoreOpacity');
    var sliderOpacity     = this.getTweeningValue('sliderOpacity');
    var sliderIconOpacity = this.getTweeningValue('sliderIconOpacity');
    var scoreScale        = this.getTweeningValue('scoreScale');

    var leftX = (this.state.animation_step == 'hover' || this.state.animation_step == 'sending' || this.state.animation_step == 'start') ? sliderX : 0;

    var scoreColor = (this.liked()) ? 'white' : 'black';
    var scoreBackground = (this.liked()) ? RED : 'white';

    return {
      slider: {
        opacity: sliderOpacity,
        'transform': 'translateX(' + sliderX + 'px)',
        '-webkit-transform': 'translateX(' + sliderX + 'px)'
      },

      left: {
        'transform': 'translateX(' + leftX + 'px)',
        '-webkit-transform': 'translateX(' + leftX + 'px)'
      },

      sliderIcon: {
        opacity: sliderIconOpacity
      },

      right: {
        'background-color': scoreBackground,
        'transform': 'translateX(' + leftX + 'px)',
        '-webkit-transform': 'translateX(' + leftX + 'px)',
        opacity: scoreOpacity
      },

      score: {
        'transform': 'scale(' + scoreScale + ')',
        '-webkit-transform': 'scale(' + scoreScale + ')',
        color: scoreColor
      }
    }
  },


  //====================
  // From start to peek
  //====================
  start_to_hover: function(){

    // Show slider
    this.tweenState('sliderX', {
      easing: EASINGS.easeInQuad,
      duration: SLIDER_PEEK_DURATION,
      endValue: SLIDER_PEEK_X
    });

    // Hide score
    this.tweenState('scoreOpacity', {
      easing: EASINGS.linear,
      duration: SLIDER_PEEK_DURATION,
      endValue: 0
    });    

  },


  //=========
  // Sliding
  //=========
  hover_to_hover: function(data){
    delta = data.delta;

    // Let the peek finish ?
    this.tweenState('sliderX', {
      easing: EASINGS.easeInOutQuad,
      duration: 0,
      endValue: SLIDER_PEEK_X + delta
    });
  },


  //===============
  // Release peek
  //===============
  hover_to_start: function(){

    // Hide slider
    this.tweenState('sliderX', {
      easing: EASINGS.easeInQuad,
      duration: SLIDER_PEEK_DURATION,
      endValue: 0
    });

    // Show score
    this.tweenState('scoreOpacity', {
      easing: EASINGS.easeInQuad,
      duration: SLIDER_PEEK_DURATION,
      endValue: 1
    });    

  },


  //===============
  // Slide Ok
  //===============
  hover_to_sending: function(){

    // Fill slider
    this.tweenState('sliderX', {
      easing: EASINGS.easeOutQuad,
      duration: SLIDER_PEEK_DURATION,
      endValue: this.fullWidth
    });

  },

  // ==================
  // Sending successful
  // ==================
  sending_to_done: function(data){

    console.log('animating to done');

    // var upvoted = !!data.upvoted;
    var upvoted = true;

    var self = this;
    var duration = SCORE_UPDATE_DURATION;


    // Upvoted : 2 steps
    // - 1. the score replaces the spinner with a scale effect
    // - 2. the slider disappears, revealing the new liked track

    // Not upvoted (refreshed) : 1 step
    // - the slider disappear AND the score reappear

    if (upvoted) {

      // Hide upvote icon
      self.tweenState('sliderIconOpacity', {
        easing: EASINGS.easeOutQuad,
        duration: duration,
        endValue: 0
      });

      // Enter score
      self.setState({scoreScale: 3, scoreColor: 'white'});

      self.tweenState('scoreOpacity', {
        easing: EASINGS.easeInQuad,
        duration: duration,
        endValue: 1
      });

      self.tweenState('scoreScale', {
        easing: EASINGS.easeInQuad,
        duration: duration,
        endValue: 1
      });

      setTimeout(function(){

        // Hide slider
        self.setState({scoreBackground: RED});
        self.tweenState('sliderX', {
          easing: EASINGS.easeOutQuad,
          duration: duration,
          endValue: self.fullWidth * 2
        });


        setTimeout(function(){
          // Reset slider
          self.setState({
            sliderX: 0,
            sliderOpacity: 1,
            sliderIconOpacity: 1
          });

          // Back to basics
          self.setState({animation_step: 'start'})
        }, duration);

      }, duration);

    }

    else {

      alert('should not be here');

    }

  }

};