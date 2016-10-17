jsWC=window.jsWC || {}; jsWC["./extensions/wikia/WikiaMobile/js/404.js"]=292;

$(function(){
	var link = document.getElementById('wk404');

	if (link) {
		require(['track'], function (track) {
			link.addEventListener('click', function(ev) {
				track.event('error-page', track.CLICK, {
					label: 'random-image',
					href: this.href
				},
				ev);
			});
		});
	}
});