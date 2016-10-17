jsWC=window.jsWC || {}; jsWC["./extensions/wikia/GlobalShortcuts/scripts/GlobalShortcutsHelpEntryPoint.js"]=164;

require(['GlobalShortcutsHelp'], function (gs) {
	'use strict';
	function init() {
		$('.global-shortcuts-help-entry-point').on('click', gs.open);
	}
	$(init);
});
