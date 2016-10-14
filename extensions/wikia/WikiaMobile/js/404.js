window.rhfs=window.rhfs||[];rhfs.push('./extensions/wikia/WikiaMobile/js/404.js');
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