window.rhfs=window.rhfs||[];rhfs.push('./extensions/wikia/AdEngine/js/slot/adUnitBuilder.js');
/*global define*/
define('ext.wikia.adEngine.slot.adUnitBuilder', [
	'ext.wikia.adEngine.adLogicPageParams',
], function (page) {
	'use strict';

	var dfpId = '5441';

	function build(slotName, src) {
		var params = page.getPageLevelParams();
		return [
			'', dfpId, 'wka.' + params.s0, params.s1, '', params.s2, src, slotName
		].join('/');
	}

	return {
		build: build
	};
});
