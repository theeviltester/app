window.rhfs=window.rhfs||[];rhfs.push('./resources/wikia/modules/location.js');
/**
 * AMD module wrapping location
 */
define('wikia.location', ['wikia.window'], function(window) {
	return window.location;
});
