window.rhfs=window.rhfs||[];rhfs.push('./extensions/wikia/RTE/js/RTE.preferences.js');
$(function() {
	$().log('setting up user preferences', 'RTE');

	var sections = ['editarea-size', 'monobook-layout'];

	if (window.skin != 'monobook') {
		$.each(sections, function() {
			var section = $('#mw-htmlform-' + this).parent();
			section.hide();
		});
	}
});

