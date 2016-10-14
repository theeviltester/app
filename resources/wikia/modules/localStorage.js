window.rhfs=window.rhfs||[];rhfs.push('./resources/wikia/modules/localStorage.js');
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
