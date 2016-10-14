window.rhfs=window.rhfs||[];rhfs.push('./extensions/wikia/templates/HelloWorld/js/modules/hello.js');
define('hello', ['wikia.nirvana'], function(nirvana) {
	function getContent(callback) {
		nirvana.sendRequest({
			controller: 'HelloWorld',
			method: 'index',
			format: 'html',
			type: 'get',
			callback: callback
		});
	}

	// module export list
	return getContent;
});
