window.rhfs=window.rhfs||[];rhfs.push('./extensions/wikia/EditPageLayout/js/modules/FormatMiniEditorSource.js');
(function(window){

	var WE = window.WikiaEditor;

	WE.modules.FormatMiniEditorSource = $.createClass(WE.modules.ButtonsList,{
		modes: {
			source: true
		},
		headerClass: 'formatsourcemini',
		items: [
			'SourceBold',
			'SourceItalic',
			'SourceLink'
		]
	});

})(this);