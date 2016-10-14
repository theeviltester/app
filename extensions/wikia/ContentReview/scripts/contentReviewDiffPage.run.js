window.rhfs=window.rhfs||[];rhfs.push('./extensions/wikia/ContentReview/scripts/contentReviewDiffPage.run.js');
require(['ext.wikia.contentReview.diff.page'], function(contentReviewDiffPage) {
    contentReviewDiffPage.init();
});
