window.rhfs=window.rhfs||[];rhfs.push('./extensions/wikia/InWikiExternalForm/js/InWikiExternalForm.js');
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
