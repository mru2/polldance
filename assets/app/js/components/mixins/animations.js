// Style constants
SLIDER_PEEK_X = 72;
SLIDER_PEEK_DURATION = 100;

var AnimationMixin = {

  mixins: [tweenState.Mixin],

  // Tween states
  // ------------
  // - slider x
  // - score opacity
  // - slider opacity

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
  // done -> hover
  // hover -> done
  // hover -> canceling
  // canceling -> done
  // canceling -> start

  getInitialState: function(){
    // Should depend on 'liked' prop
    return {
      animation_step: 'start',
      sliderX: 0,
      scoreOpacity: 1
    };
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
    var sliderX = this.getTweeningValue('sliderX');
    var scoreOpacity = this.getTweeningValue('scoreOpacity');

    // console.log('styles : ', sliderX, scoreOpacity)

    return {
      slider: {
        'transform': 'translateX(' + sliderX + 'px)',
        '-webkit-transform': 'translateX(' + sliderX + 'px)'
      },

      left: {
        'transform': 'translateX(' + sliderX + 'px)',
        '-webkit-transform': 'translateX(' + sliderX + 'px)'
      },

      score: {
        opacity: scoreOpacity
      }
    }
  },


  //====================
  // From start to peek
  //====================
  start_to_hover: function(){

    // Show slider
    this.tweenState('sliderX', {
      easing: tweenState.easingTypes.easeOutQuad,
      duration: SLIDER_PEEK_DURATION,
      endValue: SLIDER_PEEK_X
    });

    // Hide score
    this.tweenState('scoreOpacity', {
      easing: tweenState.easingTypes.linear,
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
      easing: tweenState.easingTypes.easeInOutQuad,
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
      easing: tweenState.easingTypes.easeInQuad,
      duration: SLIDER_PEEK_DURATION,
      endValue: 0
    });

    // Show score
    this.tweenState('scoreOpacity', {
      easing: tweenState.easingTypes.linear,
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
      easing: tweenState.easingTypes.easeOutQuad,
      duration: SLIDER_PEEK_DURATION,
      endValue: this.getDOMNode().offsetWidth
    });

  }

};