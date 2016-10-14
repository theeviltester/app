window.rhfs=window.rhfs||[];rhfs.push('./resources/wikia/libraries/jquery/focusNoScroll/jquery.focusNoScroll.js');
/**
 * Yo Internet Explorer, stop scrolling all over the place on focus!
 *
 * @author Christian Williams christian@wikia-inc.com
 */
(function( $ ) {
	$.fn.focusNoScroll = function() {
		var x = $(window).scrollLeft(), y = $(window).scrollTop();
		$(this).focus();
		$(window).scrollLeft(x).scrollTop(y);
		return this;
	};
})( jQuery );
