window.rhfs=window.rhfs||[];rhfs.push('./extensions/wikia/InsightsV2/scripts/InsightsGlobalShortcuts.js');
/**
 * Insights module for adding shortcut key to GlobalShortcuts extension
 * that allows navigating to Insights page
 */
require(['GlobalShortcuts'],
	function (GlobalShortcuts) {
		'use strict';
		GlobalShortcuts.add('special:Insights', 'g i');
	}
);
