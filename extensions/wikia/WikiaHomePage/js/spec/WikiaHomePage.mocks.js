window.rhfs=window.rhfs||[];rhfs.push('./extensions/wikia/WikiaHomePage/js/spec/WikiaHomePage.mocks.js');
$.storage = {
	get: function() {
		return null;
	},
	set: function() {
		return null;
	}
}

window.wgInitialWikiBatchesForVisualization = [];

$.fn.log = function(){return true};
$.fn.tooltip = function(){return true};
$.fn.startThrobbing = function(){return true};
