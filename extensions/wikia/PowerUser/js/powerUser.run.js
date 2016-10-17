jsWC=window.jsWC || {}; jsWC["./extensions/wikia/PowerUser/js/powerUser.run.js"]=197;

/**
 * This file is executed when a page is viewed by a power user.
 */
require(['ext.wikia.powerUser.pageViewTracking'], function (pageViewTracking) {
	'use strict';
	pageViewTracking.init();
});
