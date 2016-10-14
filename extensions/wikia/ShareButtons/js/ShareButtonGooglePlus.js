window.rhfs=window.rhfs||[];rhfs.push('./extensions/wikia/ShareButtons/js/ShareButtonGooglePlus.js');
(function( window, $) {

var Wikia = window.Wikia || {},
	ShareButtons = Wikia.ShareButtons;

if ( ShareButtons ) {
	ShareButtons.add({
		dependencies: [ $.loadGooglePlusAPI ]
	});
}

})( window, jQuery );