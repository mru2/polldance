/** @jsx React.DOM */
// The react track component

RED = '#e74c3c';

var Track = React.createClass({

  mixins: [PositionMixin, SwipeMixin, AnimationMixin], 

  sliderIcon: 'item-icon fa fa-heart',
  sliderIconLoading: 'item-icon fa fa-circle-o-notch item-spinner',

  componentDidMount: function() {
    console.log('[TRACK] Creating DOM node', this.props);
  },

  getInitialState: function() {
    return {
      upvoting: false,
      sliderDelta: 0
    };
  },

  liked: function() {
    return !!this.props.like_age && this.props.like_age < 1;
  },

  upvote: function(){
    console.log('[TRACK] on upvote');
    var self = this;
    var liked = this.liked();
    this.setState({upvoting: true});
    PD.Actions.combined.upvote(this.props.id, function(){
      self.setState({upvoting: false});
      if (liked) {
        self.animateTo('done');
      }
      else {
        self.animateTo('upvoted');
      }
    });
  },

  handleSwipeStart: function(){
    console.log('[TRACK] swipe start');
    this.setState({
      'sliderDelta': 0
    });
    this.animateTo('hover');
  },

  handleSwipeProgress: function(length){
    // console.log('[TRACK] swipe progress : ', length);
    this.setState({
      'sliderDelta': length
    });
  },

  handleSwipeSuccess: function(length){
    console.log('[TRACK] swipe success');
    this.animateTo('sending');
    this.upvote();
  }, 

  handleSwipeFailure: function(length){
    console.log('[TRACK] swipe failure');
    this.animateTo('ready');
  },

  getRightColor: function(like_age){
    return tinycolor(RED).desaturate(like_age * 100).toString();
  },

  getStyles: function() {

    // var sliderX           = this.getTweeningValue('sliderX');
    // var scoreOpacity      = this.getTweeningValue('scoreOpacity');
    // var sliderOpacity     = this.getTweeningValue('sliderOpacity');
    // var sliderIconOpacity = this.getTweeningValue('sliderIconOpacity');
    // var scoreScale        = this.getTweeningValue('scoreScale');

    // var leftX = (this.state.animation_step == 'hover' || this.state.animation_step == 'sending' || this.state.animation_step == 'start') ? sliderX : 0;

    var scoreColor = (this.liked()) ? 'white' : 'black';
    var scoreBackground = (this.liked()) ? this.getRightColor(this.props.like_age) : 'white';

    var styles = {
      slider: {},
      left: {},
      right: {
        'background-color': scoreBackground,
        color: scoreColor
      }
    }

    if (this.state.animation_step === 'hover') {
      var transform = 'translateX(' + (this.state.sliderDelta + 72) + 'px)';
      styles.left.transform = transform;
      styles.slider.transform = transform;
      styles.right.transform = transform;

      styles.left['-webkit-transform'] = transform;
      styles.slider['-webkit-transform'] = transform;
      styles.right['-webkit-transform'] = transform;
    }

    return styles;

  },

  render: function() {

    var styles = this.getStyles();
    var sliderIcon = (this.state.upvoting) ? this.sliderIconLoading : this.sliderIcon;

    var className = 'item track ' + this.state.animation_step;

    return (

      <div className={className} style={this.getItemPositionStyle()}>
          <div className="item-right" style={styles.right}>
            <div className="item-content">
              <a className="item-icon">
                <span className="track-score" onClick={this.upvote}>{this.props.score}</span>
              </a>
            </div>
          </div>

          <div className='item-slider' style={styles.slider}>
            <div className="item-right">
              <div className="item-content">
                <i className={sliderIcon}></i>
              </div>
            </div>
          </div>

          <div className="item-left" style={styles.left}>
              <div className="item-content">
                  <div className="item-line track-title">{this.props.title}</div>
                  <div className="item-line track-artist">{this.props.artist}</div>
              </div>
          </div>
      </div>

    );
  }
});