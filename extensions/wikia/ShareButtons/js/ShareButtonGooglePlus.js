jsWC=window.jsWC || {}; jsWC["./extensions/wikia/ShareButtons/js/ShareButtonGooglePlus.js"]=205;

(function( window, $) {

var Wikia = window.Wikia || {},
	ShareButtons = Wikia.ShareButtons;

if ( ShareButtons ) {
	ShareButtons.add({
		dependencies: [ $.loadGooglePlusAPI ]
	});
}

})( window, jQuery );