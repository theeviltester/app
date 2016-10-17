jsWC=window.jsWC || {}; jsWC["./extensions/wikia/Chat2/js/spec/integration/views.mocks.js"]=307;

var Backbone = {
	View: {
		extend: function(obj){
			return function(){
				this.processText = obj.processText
			}
		},
		prototype: {}
	}
};

var WikiaEmoticons = {
	doReplacements: function(text){return text}
}

var _ = {
	template: function(){
		return 'TEST';
	}
}

var EmoticonMapping = function(){};