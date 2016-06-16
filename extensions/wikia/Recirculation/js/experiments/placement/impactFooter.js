/*global define*/
define('ext.wikia.recirculation.experiments.placement.IMPACT_FOOTER', [
	'jquery',
	'ext.wikia.recirculation.utils',
	'ext.wikia.recirculation.helpers.contentLinks',
	'ext.wikia.recirculation.helpers.data',
	'ext.wikia.recirculation.views.rail',
	'ext.wikia.recirculation.views.scroller',
	'ext.wikia.recirculation.views.impactFooter'
], function ($, utils, ContentLinks, DataHelper, RailView, ScrollerView, ImpactFooterView) {

	// TODO: renderRail and renderImpactFooter do not have access to experimentName
	function run(experimentName) {
		var scrollerView = ScrollerView();

		ContentLinksHelper({
			count: 6,
			extra: 6
		}).loadData()
			.then(scrollerView.render)
			.then(scrollerView.setupTracking(experimentName));

		return DataHelper({}).loadData()
			.then(formatData)
			.then(renderImpactFooter)
			.then(utils.waitForRail)
			.then(renderRail);
	}

	function formatData(data) {
		var railData = {
			title: data.fandom.title,
			items: data.fandom.items.splice(0,5)
		};

		return {
			rail: railData,
			footer: data
		};
	}

	function renderImpactFooter(data) {
		var view = ImpactFooterView();

		view.render(data.footer)
			.then(view.setupTracking(experimentName));

		return data;
	}

	function renderRail(data) {
		var view = RailView();

		return view.render(data.fandom)
			.then(view.setupTracking(experimentName));
	}

	return {
		run: run
	}

});
