window.rhfs=window.rhfs||[];rhfs.push('./extensions/wikia/GlobalShortcuts/scripts/GlobalShortcutsHelpEntryPoint.js');
require(['GlobalShortcutsHelp'], function (gs) {
	'use strict';
	function init() {
		$('.global-shortcuts-help-entry-point').on('click', gs.open);
	}
	$(init);
});
