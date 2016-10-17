jsWC=window.jsWC || {}; jsWC["./extensions/wikia/RTE/js/plugins/linksuggest/plugin.js"]=258;

CKEDITOR.plugins.add('rte-linksuggest', {
	init: function(editor) {
		if (typeof jQuery.fn.linksuggest === 'function') {
			editor.on('mode', function(ev) {
				if (editor.mode === 'source') {
					$(editor.textarea.$).linksuggest();
				}
			});
		}
	}
});
