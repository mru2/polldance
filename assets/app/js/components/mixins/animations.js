// // Style constants
// SLIDER_PEEK_X = 72;
// SLIDER_PEEK_DURATION = 150;
// SCORE_UPDATE_DURATION = 500;
// RED = '#e74c3c';

// // var EASINGS = tweenState.easingTypes;

var AnimationMixin = {

  animationTimeout: null,

  getInitialState: function(){

    return {
      resting_step: 'ready',
      animation_step: 'ready'
    };

  },

  // Private -- animate via CSS classes
  // foo
  // -> foo_to_bar_prepare
  // -> foo_to_bar
  // -> bar
  launchAnimation: function(target, duration, cb) {

    delete this.animationTimeout;

    var source = this.state.resting_step;

    this.setState({
      resting_step: target
    });

    var self = this;
    var animation_name = source + '_to_' + target;
    self.setState({
      animation_step: animation_name
    }, function(){
      self.animationTimeout = setTimeout(function(){
        self.setState({
          animation_step: target
        }, cb);
      }, duration);
    });
  },

  // Handle different chains here
  animateTo: function(target){
    var self = this;
    if (target === 'hover') {
      this.launchAnimation('hover', 200);
    }
    else if (target === 'ready') {
      this.launchAnimation('ready', 200);
    }
    else if (target === 'sending') {
      this.launchAnimation('sending', 200);
    }
    else if (target === 'done') {
      this.launchAnimation('done', 1000, function(){
        // Back to ready
        self.setState({
          resting_step: 'ready',
          animation_step: 'ready'
        });
      });
    }
    else if (target === 'upvoted') {
      this.launchAnimation('upvoted', 500, function(){
        self.launchAnimation('done', 1000, function(){
          self.setState({
            resting_step: 'ready',
            animation_step: 'ready'
          });
        });
      });
    }
  }


};

// var AnimationMixin = {

//   // mixins: [tweenState.Mixin],

//   // Tween states
//   // ------------
//   // - slider x
//   // - score opacity
//   // - slider opacity
//   // - slider icon opacity

//   // Direct states
//   // -------------
//   // - right background
//   // - score scale
//   // - score color

//   // Possible steps
//   // --------------
//   // start -> hover
//   // hover -> start
//   // hover -> sending
//   // sending -> done
//   // sending -> start

//   getInitialState: function(){
//     // // Should depend on 'liked' prop
//     // return {
//     //   animation_step: 'start',
//     //   sliderX: 0,
//     //   leftX: 0,
//     //   scoreOpacity: 1,
//     //   sliderOpacity: 1,
//     //   sliderIconOpacity: 1,
//     //   scoreScale: 1
//     // };
//   },

//   componentDidMount: function(){
//     // this.fullWidth = this.getDOMNode().offsetWidth;
//   },

//   animateTo: function(target, data){

//     // var source = this.state.animation_step;
//     // var transition = source + '_to_' + target;

//     // if (this[transition]) {
//     //   this[transition](data || {});
//     // }

//     // this.setState({
//     //   animation_step: target
//     // });

//   },

//   // Handle custom styles depending on current state
//   getRightColor: function(like_age){
//     return tinycolor(RED).desaturate(like_age * 100).toString();
//   },

//   getStyles: function(sliderDelta){
//     var sliderX           = this.getTweeningValue('sliderX');
//     var scoreOpacity      = this.getTweeningValue('scoreOpacity');
//     var sliderOpacity     = this.getTweeningValue('sliderOpacity');
//     var sliderIconOpacity = this.getTweeningValue('sliderIconOpacity');
//     var scoreScale        = this.getTweeningValue('scoreScale');

//     var leftX = (this.state.animation_step == 'hover' || this.state.animation_step == 'sending' || this.state.animation_step == 'start') ? sliderX : 0;

//     var scoreColor = (this.liked()) ? 'white' : 'black';
//     var scoreBackground = (this.liked()) ? this.getRightColor(this.props.like_age) : 'white';

//     return {
//       slider: {
//         opacity: sliderOpacity,
//         'transform': 'translateX(' + sliderX + 'px)',
//         '-webkit-transform': 'translateX(' + sliderX + 'px)'
//       },

//       left: {
//         'transform': 'translateX(' + leftX + 'px)',
//         '-webkit-transform': 'translateX(' + leftX + 'px)'
//       },

//       sliderIcon: {
//         opacity: sliderIconOpacity
//       },

//       right: {
//         'background-color': scoreBackground,
//         'transform': 'translateX(' + leftX + 'px)',
//         '-webkit-transform': 'translateX(' + leftX + 'px)',
//         opacity: scoreOpacity
//       },

//       score: {
//         'transform': 'scale(' + scoreScale + ')',
//         '-webkit-transform': 'scale(' + scoreScale + ')',
//         color: scoreColor
//       }
//     }
//   },


//   //====================
//   // From start to peek
//   //====================
//   start_to_hover: function(){

//     // Show slider
//     this.tweenState('sliderX', {
//       easing: EASINGS.easeInQuad,
//       duration: SLIDER_PEEK_DURATION,
//       endValue: SLIDER_PEEK_X
//     });

//     // Hide score
//     this.tweenState('scoreOpacity', {
//       easing: EASINGS.linear,
//       duration: SLIDER_PEEK_DURATION,
//       endValue: 0
//     });    

//   },


//   //=========
//   // Sliding
//   //=========
//   hover_to_hover: function(data){
//     delta = data.delta;

//     // Let the peek finish ?
//     this.tweenState('sliderX', {
//       easing: EASINGS.easeInOutQuad,
//       duration: 0,
//       endValue: SLIDER_PEEK_X + delta
//     });
//   },


//   //===============
//   // Release peek
//   //===============
//   hover_to_start: function(){

//     // Hide slider
//     this.tweenState('sliderX', {
//       easing: EASINGS.easeInQuad,
//       duration: SLIDER_PEEK_DURATION,
//       endValue: 0
//     });

//     // Show score
//     this.tweenState('scoreOpacity', {
//       easing: EASINGS.easeInQuad,
//       duration: SLIDER_PEEK_DURATION,
//       endValue: 1
//     });    

//   },


//   //===============
//   // Slide Ok
//   //===============
//   hover_to_sending: function(){

//     // Fill slider
//     this.tweenState('sliderX', {
//       easing: EASINGS.easeOutQuad,
//       duration: SLIDER_PEEK_DURATION,
//       endValue: this.fullWidth
//     });

//   },

//   // ==================
//   // Sending successful
//   // ==================
//   sending_to_done: function(data){

//     console.log('animating to done');

//     var upvoted = !!data.upvoted;
//     var self = this;
//     var duration = SCORE_UPDATE_DURATION;


//     // Upvoted : 2 steps
//     // - 1. the score replaces the spinner with a scale effect
//     // - 2. the slider disappears, revealing the new liked track

//     // Not upvoted (refreshed) : 1 step
//     // - the slider disappear AND the score reappear

//     if (upvoted) {

//       // Hide upvote icon
//       // self.tweenState('sliderIconOpacity', {
//       //   easing: EASINGS.easeOutQuad,
//       //   duration: duration,
//       //   endValue: 0
//       // });

//       // Enter score
//       self.setState({scoreScale: 3, sliderIconOpacity: 0});

//       self.tweenState('scoreOpacity', {
//         easing: EASINGS.easeInQuad,
//         duration: duration,
//         endValue: 1
//       });

//       self.tweenState('scoreScale', {
//         easing: EASINGS.easeInQuad,
//         duration: duration,
//         endValue: 1
//       });

//       setTimeout(function(){

//         // Hide slider
//         self.setState({scoreBackground: RED});
//         self.tweenState('sliderX', {
//           easing: EASINGS.easeOutQuad,
//           duration: duration,
//           endValue: self.fullWidth * 2
//         });


//         setTimeout(function(){
//           // Reset slider
//           self.setState({
//             sliderX: 0,
//             sliderOpacity: 1,
//             sliderIconOpacity: 1
//           });

//           // Back to basics
//           self.setState({animation_step: 'start'})
//         }, duration);

//       }, duration);

//     }

//     else {

//       // Replace icon with score
//       self.setState({sliderIconOpacity: 0, scoreOpacity: 1});

//       self.tweenState('scoreOpacity', {
//         easing: EASINGS.easeInQuad,
//         duration: duration,
//         endValue: 1
//       });

//       // Hide slider
//       self.tweenState('sliderX', {
//         easing: EASINGS.easeOutQuad,
//         duration: duration,
//         endValue: self.fullWidth * 2
//       });

//       setTimeout(function(){
//         // Reset slider
//         self.setState({
//           sliderX: 0,
//           sliderOpacity: 1,
//           sliderIconOpacity: 1
//         });

//         // Back to basics
//         self.setState({animation_step: 'start'})
//       }, duration);
//     }
//   }

// };