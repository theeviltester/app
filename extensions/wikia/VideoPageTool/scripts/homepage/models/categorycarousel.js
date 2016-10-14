window.rhfs=window.rhfs||[];rhfs.push('./extensions/wikia/VideoPageTool/scripts/homepage/models/categorycarousel.js');
define('videohomepage.models.categorycarousel', [], function () {
	'use strict';
	var CategoryCarouselModel = Backbone.Model.extend({
		defaults: {
			displayTitle: String
		}
	});

	return CategoryCarouselModel;
});
