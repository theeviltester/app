window.rhfs=window.rhfs||[];rhfs.push('./extensions/wikia/Bucky/js/spec/bucky.mock.js');
define('bucky.mock', [], function () {
	'use strict';

	var bucky = $.noop;

	bucky.timer = {
		start: $.noop,
		stop: $.noop
	};

	return bucky;
});
