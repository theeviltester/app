window.rhfs=window.rhfs||[];rhfs.push('./extensions/wikia/CommunityPage/scripts/CommunityPageBenefitsPageviews.js');
require([
	'wikia.pageviewsInSession',
	'CommunityPageBenefitsModal',
	'wikia.cookies'
], function (pageviews, modal, cookies) {
	'use strict';

	function init() {
		if (!cookies.get('cpBenefitsModalShown') && pageviews.getPageviewsCount() >= 4) {
			modal.open();
		}
	}

	init();
});
