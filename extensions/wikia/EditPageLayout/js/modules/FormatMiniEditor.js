window.rhfs=window.rhfs||[];rhfs.push('./extensions/wikia/EditPageLayout/js/modules/FormatMiniEditor.js');
(function(window){

	var WE = window.WikiaEditor;

	WE.modules.FormatMiniEditor = $.createClass(WE.modules.ButtonsList, {
		headerClass: 'formatmini',
		items: [
			'Bold',
			'Italic',
			'Link'
		]
	});

})(this);