window.rhfs=window.rhfs||[];rhfs.push('./resources/wikia/modules/delayedHover.js');
define('wikia.delayedhover', ['wikia.window'], function(win) {
	'use strict';

	function attach(entryPoint, options) {
		win.delayedHover(entryPoint, options);
	}

	return {
		attach: attach
	};
});
