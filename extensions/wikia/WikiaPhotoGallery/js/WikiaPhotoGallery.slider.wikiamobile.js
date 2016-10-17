jsWC=window.jsWC || {}; jsWC["./extensions/wikia/WikiaPhotoGallery/js/WikiaPhotoGallery.slider.wikiamobile.js"]=371;

/*global WikiaMobile: true */

$(function(){
	var sliders = document.getElementsByClassName('wkSlider'),
		i = sliders.length;

	if (i) {
		require(['track'], function(track){
			var click = function(ev){
				if(ev.target.tagName == 'IMG') {
					track.event('slider', track.CLICK);
				}
			};
			while (i--) sliders[i].addEventListener('tap', click, true);
		});
	}
});