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
	  this.direction = 0;
  	this.swiping = false;
  	this.swipeDistance = null;
	  
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

	onUpdate: function(event){
	  if (event.type === 'touchstart') {
	    this.swiping = true;
	    this.handleSwipeStart();
	  }

	  if (event.type === 'touchend') {
	    this.swiping = false;

	    if (this.swipeDistance > (this.length / 4)) {
	      this.handleSwipeSuccess();
	      return;
	    }
	    else {
	      this.handleSwipeFailure();
	    }
	  }

	  if (event.type === 'pan') {
	    this.swipeDistance = event.deltaX;
	    this.direction = event.direction;

	    this.handleSwipeProgress(event.deltaX);
	  }		
	}
}
