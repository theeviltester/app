/*global require*/

require([
	'wikia.window',
	'wikia.abTest',
	'wikia.log',
	'ext.wikia.recirculation.experiments.placement.control',
	require.optional('videosmodule.controllers.rail')
], function(
	w,
	abTest,
	log,
	Control,
	VideosModule
) {
	var experimentName = 'RECIRCULATION_PLACEMENT',
		logGroup = 'ext.wikia.recirculation.experiments.placement',
		railSelector = '#RECIRCULATION_RAIL',
		group = abTest.getGroup(experimentName),
		isRail = false,
		errorHandled = false,
		experiment;

	if (w.wgContentLanguage !== 'en') {
		if (VideosModule) {
			VideosModule(railSelector);
		}
		return;
	}

	var module = 'ext.wikia.recirculation.experiments.placement.' + group;

	require([module], function(experiment) {
		experiment.run(experimentName)
			.fail(function(err) {
				if (err) {
					log(err, 'info', logGroup);
				}

				// If there is an error somewhere we render the control group with no tracking
				if (errorHandled) {
					return;
				}

				errorHandled = true;
				Control.run();
			});

	});
});
