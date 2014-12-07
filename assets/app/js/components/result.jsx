/** @jsx React.DOM */

var Result = React.createClass({

  mixins: [PositionMixin], 

  componentDidMount: function() {
    console.log('[RESULT] Creating DOM node');
  },

  getInitialState: function() {
    return {};
  },

  addTrack: function() {
    PD.Actions.addTrack(this.props.id);
    PD.API.addTrack({
            id: this.props.id,
            title: this.props.title,
            artist: this.props.artist
          })
          .then(PD.Actions.addTrackSuccess)
          .then(PD.Actions.apiFailure);    
  },

  render: function() {
  
    return (

      <div className="item track" style={this.getItemPositionStyle()}>
          <div className="item-right">
            <div className="item-content">
              <a className="item-icon">
                <span className="track-score" onClick={this.addTrack}>+</span>
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
                  <span className="item-line track-title">{this.props.title}</span>
                  <span className="item-line track-artist">{this.props.artist}</span>
              </div>
          </div>
      </div>

    );
  }
});