window.rhfs=window.rhfs||[];rhfs.push('./extensions/wikia/ContentFeeds/js/FirstFewArticles.js');
var FirstFewArticles = {
	ErrorMessages : {
		EmptyTitle : 'emptyTitleErrorMsg',
		EmptyBody: 'emptyBodyErrorMsg'
	}
};

$('#firstFewArticlesTagNextBtn').bind( 'click', function(e) {
	var title = $('#firstFewArticlesTagArticleTitle').val();
	var body = $('#firstFewArticlesTagArticleBody').val();

	if( title == '' ) {
		$('#firstFewArticlesTagErrorMsg').text( FirstFewArticles.ErrorMessages.EmptyTitle );
		return;
	}

	if( body == '' ) {
		$('#firstFewArticlesTagErrorMsg').text( FirstFewArticles.ErrorMessages.EmptyBody );
		return;
	}

	$('#firstFewArticlesTagErrorMsg').text( '' );

	Mediawiki.editArticle(
		{ title : title, text: body },
		function() {
			alert( 'ok!' );
		},
		function() {
			alert( 'error!' );
		}

	);
});

