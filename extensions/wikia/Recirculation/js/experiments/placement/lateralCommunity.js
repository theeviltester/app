/*global define*/
define('ext.wikia.recirculation.experiments.placement.LATERAL_COMMUNITY', [
	'jquery',
	'ext.wikia.recirculation.utils',
	'ext.wikia.recirculation.helpers.lateral',
	'ext.wikia.recirculation.views.incontent',
], function ($, utils, LateralHelper, IncontentView) {

	function run(experimentName) {
		var view = IncontentView();

		return LateralHelper({
			type: 'community',
			count: 3
		}).loadData()
			.then(utils.waitForRail)
			.then(view.render)
			.then(view.setupTracking(experimentName));
	}

	return {
		run: run
	}

});
