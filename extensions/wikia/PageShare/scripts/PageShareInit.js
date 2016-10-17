jsWC=window.jsWC || {}; jsWC["./extensions/wikia/PageShare/scripts/PageShareInit.js"]=162;

require(['wikia.pageShare', 'jquery'], function (pageShare, $) {
	'use strict';

	// bind events to links
	$(function () {
		pageShare.loadShareIcons();
	});
});
