window.rhfs=window.rhfs||[];rhfs.push('./extensions/wikia/Forum/js/ForumThread.js');
jQuery(function($) {
	$('#Forum').wikiaWall({
		pageController: 'ForumExternalController'
	});
});