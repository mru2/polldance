(function(Reflux, global) {
  'use strict';

  // Each action is like an event channel for one specific event. Actions are called by components.
  // The store is listening to all actions, and the components in turn are listening to the store.
  // Thus the flow is: User interaction -> component calls action -> store reacts and triggers -> components update

  global.Actions = Reflux.createActions([
    "updatePlaylist",       // called in response of every ajax call, and also periodically or on eventsource notifications
    "addTrack",             // called by swiping a result in the search view
    "addTrackSuccess",      // called when a track is added
    "upvoteTrack",          // called by swiping a track in the playlist view
    "upvoteTrackSuccess",   // called when a track is upvoted
    "search",               // called by submitting the search form
    "searchSuccess",        // called when search results are available
    "toggleSearch",         // called by clicking the hide/show search button
    "refresh",              // called by clicking the refresh button, or periodically
    "apiFailure"            // called when an API call failed
  ]);

})(window.Reflux, window.PD);


// Q? How to handle refresh / eventsource / ... Store? Directly listen to actions (possible?)