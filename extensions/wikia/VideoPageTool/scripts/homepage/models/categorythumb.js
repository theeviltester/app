jsWC=window.jsWC || {}; jsWC["./extensions/wikia/VideoPageTool/scripts/homepage/models/categorythumb.js"]=229;

define('videohomepage.models.categorythumb', [], function () {
	'use strict';
	var CategoryThumbModel = Backbone.Model.extend({
		defaults: {
			videoThumb: String,
			videoTitle: String
		}
	});

	return CategoryThumbModel;
});
