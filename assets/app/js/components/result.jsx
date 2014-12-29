/** @jsx React.DOM */

var Result = React.createClass({

  mixins: [PositionMixin, SwipeMixin, AnimationMixin], 

  sliderIcon: 'item-icon fa fa-plus',
  sliderIconLoading: 'item-icon fa fa-circle-o-notch item-spinner',

  componentDidMount: function() {
    console.log('[RESULT] Creating DOM node');
  },

  getInitialState: function() {
    return {
      adding: false,
      sliderDelta: 0
    };
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
    this.addTrack();
  }, 

  handleSwipeFailure: function(length){
    console.log('[TRACK] swipe failure');
    this.animateTo('ready');
  },

  addTrack: function() {
    this.setState({adding: true});

    var self = this;

    PD.Actions.combined.add({
      id: this.props.id,
      title: this.props.title,
      artist: this.props.artist
    }, function(){
      self.setState({adding: false});
      self.animateTo('done');
    });
  },

  getStyles: function() {
    var styles = {
      slider: {},
      left: {}
    }

    if (this.state.animation_step === 'hover') {
      var transform = 'translateX(' + (this.state.sliderDelta + 72) + 'px)';
      styles.left.transform = transform;
      styles.slider.transform = transform;

      styles.left['-webkit-transform'] = transform;
      styles.slider['-webkit-transform'] = transform;
    }

    return styles;
  },

  render: function() {

    var sliderIcon = (this.state.adding) ? this.sliderIconLoading : this.sliderIcon;

    var styles = this.getStyles();
    var className = 'item track ' + this.state.animation_step;

    return (

      <div className={className} style={this.getItemPositionStyle()}>

          <div className='item-slider' style={styles.slider}>
            <div className="item-right">
              <div className="item-content">
                <i className={sliderIcon}></i>
              </div>
            </div>
          </div>

          <div className="item-left" style={styles.left}>
              <div className="item-content">
                  <span className="item-line track-title">{this.props.title}</span>
                  <span className="item-line track-artist">{this.props.artist}</span>
              </div>
          </div>
      </div>

    );
  }
});