window.rhfs=window.rhfs||[];rhfs.push('./extensions/wikia/EditPageLayout/js/modules/ModeSwitch.js');
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