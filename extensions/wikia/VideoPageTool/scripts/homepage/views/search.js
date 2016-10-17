jsWC=window.jsWC || {}; jsWC["./extensions/wikia/VideoPageTool/scripts/homepage/views/search.js"]=519;

define('videohomepage.views.search', [
	'jquery',
	'wikia.tracker'
], function ($, Tracker) {
	'use strict';

	function SearchView() {
		this.$el = $('#WikiaSearch');

		this.track = Tracker.buildTrackingFunction({
			action: Tracker.ACTIONS.CLICK,
			category: 'video-home-page',
			trackingMethod: 'analytics'
		});

		this.init();
	}

	SearchView.prototype.init = function () {
		var that = this;
		this.$el.on('click', function () {
			that.track({
				label: 'search-box'
			});
		});
	};

	return SearchView;
});
