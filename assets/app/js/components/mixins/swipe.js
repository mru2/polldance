// ========== DOC ==========
// http://facebook.github.io/react/docs/reusable-components.html#mixins
// =========================

// Handle the swiping for a react track
// Done out of the react component to have a better resolution on the touch events

// TODO : destroy it when the element is unmounted

var SwipeMixin = {

	componentDidMount: function(){
		var domNode = this.getDOMNode();

		// Needed data
		this.length = domNode.offsetWidth;

		this.resetSwipe();

		var callback = _.bind(this.onUpdate, this);

		// Listen to swipe events
		this.mc = new Hammer(domNode);
		this.mc.on('pan', callback);
	  domNode.addEventListener('touchstart', callback);
    domNode.addEventListener('touchend', callback);
	},

	componentWillUnmount: function(){
		delete this.mc;
	},

	resetSwipe: function(){
		this.swiping = false;
		this.direction = 0;
		this.swipeDistance = null;
	},

	onUpdate: function(event){
	  if (event.type === 'touchstart') {
	    this.swiping = true;
	    this.handleSwipeStart();
	  }

	  if (event.type === 'touchend') {
	    this.swiping = false;

	    if (this.swipeDistance > (this.length / 4)) {
	    	this.resetSwipe();
	      this.handleSwipeSuccess();
	      return;
	    }
	    else {
	    	this.resetSwipe();
	      this.handleSwipeFailure();
	    }
	  }

	  if (event.type === 'pan') {
	  	delta = event.deltaX;
	  	if ( delta < -SLIDER_PEEK_X ) { delta = -SLIDER_PEEK_X; } 
	  	if ( delta > this.length-SLIDER_PEEK_X ) { delta = this.length-SLIDER_PEEK_X; } 

	    this.swipeDistance = delta;
	    this.direction = event.direction;

	    this.handleSwipeProgress(delta);
	  }		
	}
}
