window.rhfs=window.rhfs||[];rhfs.push('./extensions/wikia/EditPageLayout/js/modules/Format.js');
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