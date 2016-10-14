window.rhfs=window.rhfs||[];rhfs.push('./resources/wikia/modules/mw.js');
/**
 * AMD wrapper for mw global object
 */
define('mw', ['wikia.window'], function(window) {
	return window.mw;
});

