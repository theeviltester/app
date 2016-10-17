jsWC=window.jsWC || {}; jsWC["./extensions/wikia/MiniEditor/js/Wall/Wall.Setup.js"]=617;

(function($) {

// Create a namespace for the Wall
MiniEditor.Wall = {};

// Add Wall styles for inside the iframe
GlobalTriggers.on('MiniEditorReady', function() {
	if (MiniEditor.ckeditorEnabled) {
		RTE.config.contentsCss.push($.getSassLocalURL('/extensions/wikia/MiniEditor/css/Wall/Wall.content.scss'));
	}
});

// Add class to iframe body for different editarea types
GlobalTriggers.on('WikiaEditorReady', function(wikiaEditor) {

	// Check if inside 'new-message'
	if (wikiaEditor.getEditorElement().parentsUntil('.new-message').length) {
		wikiaEditor.getEditbox().addClass('new-message');
	}
});

})(jQuery);