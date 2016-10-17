jsWC=window.jsWC || {}; jsWC["./resources/wikia/modules/abTest.js"]=226;

/**
 * AMD module exporting Wikia.AbTest object
 */
/*global define*/
define('wikia.abTest', ['wikia.window'], function(window) {
	'use strict';
	if (window.Wikia && window.Wikia.AbTest) {
		return window.Wikia.AbTest;
	}
});
