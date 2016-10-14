window.rhfs=window.rhfs||[];rhfs.push('./extensions/wikia/EditPageLayout/js/plugins/EditorSurvey.js');
(function(window,$){

	var WE = window.WikiaEditor = window.WikiaEditor || (new Observable());

	WE.plugins.editorsurvey = $.createClass(WE.plugin,{

		init: function() {
			if ( window.EditorSurvey ) {
				EditorSurvey.bindUnload();
				this.editor.on('state', this.proxy(this.stateChanged));
			}
		},
		stateChanged: function( editor, state ) {
			if ( state == editor.states.SAVING ) {
				EditorSurvey.handleSuccess();
			}
		}
	});
})(this,jQuery);
