window.rhfs=window.rhfs||[];rhfs.push('./resources/wikia/modules/document.js');
/**
 * AMD module wrapping document object
 */
define('wikia.document', ['wikia.window'], function (window) {
	'use strict';

	return window.document;
});
