window.rhfs=window.rhfs||[];rhfs.push('./extensions/wikia/ContentReview/scripts/contentReviewTestMode.run.js');
require(['ext.wikia.contentReview.testMode'], function (contentReviewTestMode) {
	'use strict';
	$(contentReviewTestMode.init);
});
