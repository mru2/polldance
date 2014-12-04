/** @jsx React.DOM */

var Result = React.createClass({

  mixins: [PositionMixin], 

  componentDidMount: function() {
    console.log('[RESULT] Creating DOM node');
  },

  getInitialState: function() {
    return {};
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
                  <span className="track-title">{this.props.title}</span>
                  <span className="track-artist">{this.props.artist}</span>
              </div>
          </div>
      </div>

    );
  }
});