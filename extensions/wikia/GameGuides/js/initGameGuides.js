jsWC=window.jsWC || {}; jsWC["./extensions/wikia/GameGuides/js/initGameGuides.js"]=332;

//in webview setTimeout does not work as expected
//ie. webview is too long (as long as before section wrapping)
//but we still want setTimeout to work for animations and stuff
window.setTimeout = (function(timeout){
	return function(func, time){
		if(time == 0) {
			func();
		}else{
			timeout(func, time);
		}
	};
})(setTimeout);