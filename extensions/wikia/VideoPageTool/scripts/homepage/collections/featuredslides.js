window.rhfs=window.rhfs||[];rhfs.push('./extensions/wikia/VideoPageTool/scripts/homepage/collections/featuredslides.js');
define('videohomepage.collections.featuredslides', [], function () {
	'use strict';

	var SlideCollection = Backbone.Collection.extend({
		resetEmbedData: function () {
			_.each(this.models, function (e) {
				e.set({
					embedData: null
				});
			});
		}
	});

	return SlideCollection;
});
