window.rhfs=window.rhfs||[];rhfs.push('./extensions/wikia/AdEngine/js/wrappers/prebid.js');
/*global define*/
define('ext.wikia.adEngine.wrappers.prebid', [
	'wikia.window'
], function (win) {
	'use strict';

	win.pbjs = win.pbjs || {};
	win.pbjs.que = win.pbjs.que || [];

	return {
		get: function () {
			return win.pbjs;
		},
		push: function (callback) {
			win.pbjs.que.push(callback);
		}
	};
});
