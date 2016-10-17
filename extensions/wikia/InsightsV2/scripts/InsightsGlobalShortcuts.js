jsWC=window.jsWC || {}; jsWC["./extensions/wikia/InsightsV2/scripts/InsightsGlobalShortcuts.js"]=254;

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
