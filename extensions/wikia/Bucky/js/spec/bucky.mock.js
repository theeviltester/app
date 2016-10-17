jsWC=window.jsWC || {}; jsWC["./extensions/wikia/Bucky/js/spec/bucky.mock.js"]=150;

define('bucky.mock', [], function () {
	'use strict';

	var bucky = $.noop;

	bucky.timer = {
		start: $.noop,
		stop: $.noop
	};

	return bucky;
});
