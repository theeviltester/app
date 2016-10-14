window.rhfs=window.rhfs||[];rhfs.push('./extensions/wikia/CommunityPage/scripts/entryPoint.js');
require([
	'jquery',
	'wikia.tracker',
], function ($, tracker) {
	'use strict';

	var track = tracker.buildTrackingFunction({
		action: tracker.ACTIONS.CLICK,
		category: 'community-page-entry-point',
		trackingMethod: 'analytics'
	});

	$(function() {
		$('.community-page-entry-point-button').on(
			'mousedown touchstart',
			track.bind(this, {label: 'entry-button'})
		);

		// Track impression
		track({
			action: tracker.ACTIONS.IMPRESSION,
			label: 'entry-point-loaded',
		});
	});
});
