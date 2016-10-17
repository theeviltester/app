jsWC=window.jsWC || {}; jsWC["./extensions/wikia/VideoPageTool/scripts/homepage/models/categorycarousel.js"]=217;

define('videohomepage.models.categorycarousel', [], function () {
	'use strict';
	var CategoryCarouselModel = Backbone.Model.extend({
		defaults: {
			displayTitle: String
		}
	});

	return CategoryCarouselModel;
});
