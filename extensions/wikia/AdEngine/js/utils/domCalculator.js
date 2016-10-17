jsWC=window.jsWC || {}; jsWC["./extensions/wikia/AdEngine/js/utils/domCalculator.js"]=295;

/*global define*/
define('ext.wikia.adEngine.utils.domCalculator', [
], function () {
	'use strict';

	function getTopOffset(el) {
		var topPos = 0;
		for (; el !== null; el = el.offsetParent) {
			topPos += el.offsetTop;
		}

		return topPos;
	}

	return {
		getTopOffset: getTopOffset
	};
});
