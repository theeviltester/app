/*global define*/
define('ext.wikia.recirculation.experiments.placement.FANDOM_TOPIC', [
	'jquery',
	'ext.wikia.recirculation.utils',
	'ext.wikia.recirculation.helpers.fandom',
	'ext.wikia.recirculation.views.rail'
], function ($, utils, FandomHelper, RailView) {

	function run(experimentName) {
		var view = RailView();

		return FandomHelper({
		    type: 'community',
			limit: 5
		}).loadData()
			.then(utils.waitForRail)
			.then(view.render)
			.then(view.setupTracking(experimentName));
	}

	return {
		run: run
	}

});
