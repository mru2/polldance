/** @jsx React.DOM */
// The react track component

var Track = React.createClass({

  mixins: [PositionMixin, SwipeMixin, AnimationMixin], 

  sliderIcon: 'item-icon fa fa-heart',
  sliderIconLoading: 'item-icon fa fa-circle-o-notch fa-spin',

  componentDidMount: function() {
    console.log('[TRACK] Creating DOM node');
  },

  getInitialState: function() {
    return {};
 },

  upvote: function(){
    console.log('[TRACK] on upvote');

    var self = this;

    PD.Actions.upvoteTrack(this.props.id);
    PD.API.upvoteTrack(this.props.id)
          .then(function(response){
            PD.Actions.upvoteTrackSuccess(response);
            self.animateTo('done');
          })
          .then(PD.Actions.apiFailure);
  },

  handleSwipeStart: function(){
    console.log('[TRACK] swipe start');
    this.animateTo('hover');
  },

  handleSwipeProgress: function(length){
    // console.log('[TRACK] swipe progress : ', length);
    this.animateTo('hover', {delta: length});
  },

  handleSwipeSuccess: function(length){
    console.log('[TRACK] swipe success');
    this.animateTo('sending');
    this.upvote();
  }, 

  handleSwipeFailure: function(length){
    console.log('[TRACK] swipe failure');
    this.animateTo('start');
  },

  render: function() {

    var styles = this.getStyles();
    var sliderIcon = (this.props.upvoting) ? this.sliderIconLoading : this.sliderIcon;

    return (

      <div className="item track" style={this.getItemPositionStyle()}>
          <div className="item-right" style={styles.right}>
            <div className="item-content">
              <a className="item-icon">
                <span className="track-score" style={styles.score} onClick={this.upvote}>{this.props.score}</span>
              </a>
            </div>
          </div>

          <div className='item-slider' style={styles.slider}>
            <div className="item-right">
              <div className="item-content">
                <i className={sliderIcon} style={styles.sliderIcon} ></i>
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