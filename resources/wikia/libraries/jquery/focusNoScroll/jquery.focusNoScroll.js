jsWC=window.jsWC || {}; jsWC["./resources/wikia/libraries/jquery/focusNoScroll/jquery.focusNoScroll.js"]=339;

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
