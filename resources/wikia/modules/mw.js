jsWC=window.jsWC || {}; jsWC["./resources/wikia/modules/mw.js"]=118;

/**
 * AMD wrapper for mw global object
 */
define('mw', ['wikia.window'], function(window) {
	return window.mw;
});

