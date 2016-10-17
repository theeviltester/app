jsWC=window.jsWC || {}; jsWC["./extensions/wikia/SpecialVideos/scripts/mobile/controller.js"]=301;

require([
	'specialVideos.mobile.collections.videos',
	'specialVideos.mobile.views.index'
], function (VideosCollection, SpecialVideosIndexView) {
	'use strict';
	return new SpecialVideosIndexView({
		collection: new VideosCollection(),
		el: '#special-videos',
		filterActiveClass: 'active'
	});
});
