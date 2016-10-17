jsWC=window.jsWC || {}; jsWC["./extensions/wikia/EditPageLayout/js/modules/FormatMiniEditorSource.js"]=276;

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