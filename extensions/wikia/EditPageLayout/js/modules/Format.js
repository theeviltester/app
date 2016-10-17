jsWC=window.jsWC || {}; jsWC["./extensions/wikia/EditPageLayout/js/modules/Format.js"]=402;

(function(window){

	var WE = window.WikiaEditor;

	WE.modules.Format = $.createClass(WE.modules.ButtonsList,{
		headerClass: 'format',
		items: [
			'Bold',
			'Italic',
			'Link',
			//'Quote', // TODO
			'|',
			'BulletedList',
			'NumberedList',
			'Indent',
			'Outdent',
			'|',
			'Format',
			'JustifyLeft',
			'JustifyCenter',
			'JustifyRight',
			'|',
			'Undo',
			'Redo'
		]
	});
})(this);