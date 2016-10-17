jsWC=window.jsWC || {}; jsWC["./extensions/wikia/CreatePage/js/focus.js"]=257;

$(function() {
    $("#postTitle").keydown(function (e) {
    	if(e.keyCode == 9){
    		if (typeof RTE != "undefined" ) {
    			RTE.getInstance().focus();
    			return false;
    		}

    		$("#wpTextbox1").focus();
    		return false;
    	}
    });
});