window.rhfs=window.rhfs||[];rhfs.push('./extensions/wikia/SpecialVideos/scripts/mobile/controller.js');
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
