window.rhfs=window.rhfs||[];rhfs.push('./extensions/wikia/PageShare/scripts/PageShareInit.js');
require(['wikia.pageShare', 'jquery'], function (pageShare, $) {
	'use strict';

	// bind events to links
	$(function () {
		pageShare.loadShareIcons();
	});
});
