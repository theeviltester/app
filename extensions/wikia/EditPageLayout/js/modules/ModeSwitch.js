jsWC=window.jsWC || {}; jsWC["./extensions/wikia/EditPageLayout/js/modules/ModeSwitch.js"]=234;

(function(window){

	var WE = window.WikiaEditor;

	WE.modules.ModeSwitch = $.createClass(WE.modules.ButtonsList,{
		modes: true,

		headerClass: 'mode_switch',

		items: [
			'ModeSource',
			'ModeWysiwyg',
			'|'
		]
	});

})(this);