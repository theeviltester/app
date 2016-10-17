jsWC=window.jsWC || {}; jsWC["./extensions/wikia/VisitSource/scripts/VisitSource.js"]=294;

$(function () {
	'use strict';

	var sessionVisitSource = new VisitSource('WikiaSessionSource', window.wgCookieDomain),
		lifetimeVisitSource = new VisitSource('WikiaLifetimeSource', window.wgCookieDomain, false);

	sessionVisitSource.checkAndStore();
	lifetimeVisitSource.checkAndStore();
});
