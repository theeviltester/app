jsWC=window.jsWC || {}; jsWC["./extensions/wikia/templates/HelloWorld/js/HelloWorld.js"]=261;

require(['jquery', 'hello'], function($, hello) {
	function init() {
		// Bind click to button
		$('#HelloWorldAjax button').click(function() {
			hello(function(html) {
				$('#HelloWorldAjax').append(html);
			});
		});
	}

	$(function() {
		init();
	});
});
