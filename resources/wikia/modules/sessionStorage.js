jsWC=window.jsWC || {}; jsWC["./resources/wikia/modules/sessionStorage.js"]=222;

/**
 * A set of AMD modules wrapping session storage API
 */
define('wikia.sessionStorage', ['wikia.window'], function (window) {
	'use strict';

	try {
		return window.sessionStorage;
	} catch (err) {
		return {};
	}
});
