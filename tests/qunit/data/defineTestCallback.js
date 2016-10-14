window.rhfs=window.rhfs||[];rhfs.push('./tests/qunit/data/defineTestCallback.js');
window.mw.loader.testCallback = function() {
	start();
	ok( true, 'Implementing a module, is the callback timed properly ?');
};
