window.rhfs=window.rhfs||[];rhfs.push('./extensions/wikia/ContentReview/scripts/contentReviewSpecialPage.run.js');
require(['ext.wikia.contentReview.special.page'], function(contentReviewSpecialPage) {
    contentReviewSpecialPage.init();
});
