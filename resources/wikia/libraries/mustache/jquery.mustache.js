jsWC=window.jsWC || {}; jsWC["./resources/wikia/libraries/mustache/jquery.mustache.js"]=230;

/*
 * Mustache integration for jQuery
 */
$.mustache =  Mustache.render;

$.fn.mustache = function (view, partials) {
	var html = $(this).first().html(),
		template = $.trim(html);
	return $.mustache(template, view, partials);
};
