jsWC=window.jsWC || {}; jsWC["./extensions/wikia/InWikiExternalForm/js/InWikiExternalForm.js"]=273;

var InWikiExternalForm = {
	init: function() {
		Wikia.Tracker.track({
			category: 'in-wiki-external-form',
			action: Wikia.Tracker.ACTIONS.IMPRESSION,
			label: 'form-impression',
			trackingMethod: 'internal'
		});
	}
}

$(function () {
	InWikiExternalForm.init();
});
