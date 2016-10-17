jsWC=window.jsWC || {}; jsWC["./resources/wikia/modules/localStorage.js"]=214;

/**
 * A set of AMD modules wrapping local storage API
 */
define('wikia.localStorage', ['wikia.window'], function(window) {
	'use strict';

	try {
		return window.localStorage;
	} catch(err) {
		return {};
	}
});
