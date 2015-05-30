var PositionMixin = {
  
  TRACK_HEIGHT: 72,

  getItemPositionStyle: function(){
    return {
      transform: 'translateY(' + this.props.position * 72 + 'px)',
      '-webkit-transform': 'translateY(' + this.props.position * 72 + 'px)'
    };
  }

};