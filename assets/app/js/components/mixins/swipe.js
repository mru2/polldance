// ========== DOC ==========
// http://facebook.github.io/react/docs/reusable-components.html#mixins
// =========================


// // Handle the swiping for a react track
// // Done out of the react component to have a better resolution on the touch events

// // TODO : destroy it when the element is unmounted

// var SwipeController = function(reactEl, cbs){

//   this.reactEl = reactEl;
//   this.cbs = cbs;

//   console.log('initializing swipe controller on', reactEl);
//   var domNode = reactEl.getDOMNode();

//   // Initialize hammer.js
//   this.mc = new Hammer(domNode);

//   var callback = _.bind(this.onUpdate, this);
//   this.mc.on('pan', callback);

//   domNode.addEventListener('touchstart', callback);
//   domNode.addEventListener('touchend', callback);

//   // Store element size
//   this.length = domNode.offsetWidth;

//   // Store current state
//   this.direction = 0;
//   this.swiping = false;
//   this.swipeDistance = null;

// };


// SwipeController.prototype.onUpdate = function(event){

//   if (event.type === 'touchstart') {
//     this.swiping = true;
//     this.cbs.start();
//   }

//   if (event.type === 'touchend') {
//     this.swiping = false;

//     if (this.swipeDistance > (this.length / 4)) {
//       this.cbs.success();
//       return;
//     }
//     else {
//       this.cbs.failure();
//     }
//   }

//   if (event.type === 'pan') {
//     this.swipeDistance = event.deltaX;
//     this.direction = event.direction;

//     this.cbs.move(event.deltaX);
//   }
// };


// window.SwipeController = SwipeController;