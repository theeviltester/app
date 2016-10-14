window.rhfs=window.rhfs||[];rhfs.push('./extensions/wikia/FilePage/scripts/FilePage.wikiamobile.js');
/**
 * Any mobile-specific js for file page goes here.
 * @author Liz Lee
 */

require(['wikia.videoBootstrap', 'wikia.window'], function (VideoBootstrap, window) {
	'use strict';

	// Play video
	var filePageContainer = document.getElementById('file');

	if (filePageContainer && window.playerParams) {
		new VideoBootstrap(filePageContainer, window.playerParams, 'filePage');
	}
});
