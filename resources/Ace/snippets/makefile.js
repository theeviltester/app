jsWC=window.jsWC || {}; jsWC["./resources/Ace/snippets/makefile.js"]=243;

ace.define('ace/snippets/makefile', ['require', 'exports', 'module' ], function(require, exports, module) {


exports.snippetText = "snippet ifeq\n\
	ifeq (${1:cond0},${2:cond1})\n\
		${3:code}\n\
	endif\n\
";
exports.scope = "makefile";

});
