// Handle the swiping for a react track
// Done out of the react component to have a better resolution on the touch events

// TODO : destroy it when the element is unmounted

var SwipeController = function(reactEl){

  this.reactEl = reactEl;

  console.log('initializing swipe controller on', reactEl);
  var domNode = reactEl.getDOMNode();

  // Initialize hammer.js
  this.mc = new Hammer(domNode);

  var callback = _.bind(this.onSwipe, this);
  this.mc.on('pan', callback);

  domNode.addEventListener('touchstart', callback);
  domNode.addEventListener('touchend', callback);

};

SwipeController.prototype.onSwipe = function(event){
  var state = {};

  if (event.type === 'touchstart') {
    state.hasSlider = true;
  }

  if (event.type === 'touchend') {

    if (this.direction === 4 && this.deltaX > 72) {
      this.reactEl.setSwiped();
      return;
    }
    else {
      state.hasSlider = false;
      state.touchDelta = 0;
    }
  }

  if (event.type === 'pan') {
    state.touchDelta = this.deltaX = event.deltaX;
    console.log(event)
    this.direction = event.direction;

  }

  this.reactEl.setState(state);
};


window.SwipeController = SwipeController;