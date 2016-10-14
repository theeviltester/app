window.rhfs=window.rhfs||[];rhfs.push('./extensions/wikia/ContentReview/scripts/contentReviewModule.run.js');
require(['ext.wikia.contentReview.module'], function(contentReviewModule) {
	contentReviewModule.init();
});
