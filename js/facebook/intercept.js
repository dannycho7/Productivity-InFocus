
/**
 * This script should run at document start to set up
 * intercepts before FB loads.
 */

 const paths = [ '', '/' ];

 function isEnabled() {
 	return paths.indexOf( window.location.pathname ) > -1;
 }

 // Check if the event target is a chat conversation
 var isConversation = function isConversation(target) {
   if (!target || !target.matches) {
     return false;
   }

   if (target.matches('.conversation') || target.matches('#ChatTabsPagelet')) {
     return true;
   }

   if (!target.parentNode) {
     return false;
   }

   return isConversation(target.parentElement);
 };

 const maybeBlock = (MouseWheelEvent ) => {
 	if ( ! isEnabled() ) {
 		return false;
 	}
 	// Allow infinite scrolling of chats on the home page
 	if ( isConversation( event.target ) ) {
 		return false;
 	}
 	event.stopImmediatePropagation();
 	return true;
 }

function disableInfiniteScroll() {
 	window.addEventListener('scroll', maybeBlock, true);
 	window.addEventListener('mousewheel', maybeBlock, true);
 }

disableInfiniteScroll();
