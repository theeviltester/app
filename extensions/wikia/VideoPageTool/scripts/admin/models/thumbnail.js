jsWC=window.jsWC || {}; jsWC["./extensions/wikia/VideoPageTool/scripts/admin/models/thumbnail.js"]=468;

define('videopageadmin.models.thumbnail', [
	'jquery'
], function ($) {
	'use strict';

	function ThumbnailModel(params) {
		this.imgTitle = params.imgTitle;
		this.wikiText = params.wikiText;
	}

	ThumbnailModel.prototype = {
		create: function () {
			var that = this;

			return $.nirvana.sendRequest({
				controller: 'VideoPageAdminSpecial',
				method: 'getImageData',
				data: {
					imageTitle: that.imgTitle
				}
			});
		}
	};

	return ThumbnailModel;
});
