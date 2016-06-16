/*global define*/
define('ext.wikia.recirculation.experiments.placement.CAKE_RELATED_CONTENT', [
	'jquery',
	'ext.wikia.recirculation.utils',
	'ext.wikia.recirculation.helpers.cakeRelatedContent',
	'ext.wikia.recirculation.views.rail'
], function ($, utils, CakeHelper, RailView) {

	function run(experimentName) {
		var view = RailView();

		return CakeHelper().loadData()
			.then(utils.waitForRail)
			.then(view.render)
			.then(view.setupTracking(experimentName));
	}

	return {
		run: run
	}

});
