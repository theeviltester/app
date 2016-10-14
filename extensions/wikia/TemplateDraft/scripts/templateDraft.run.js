window.rhfs=window.rhfs||[];rhfs.push('./extensions/wikia/TemplateDraft/scripts/templateDraft.run.js');
/**
 * This file is executed on view of a page in a template namespace
 */
require(['ext.wikia.templateDraft.tracking'], function (templateDraftTracking) {
	'use strict';
	templateDraftTracking.init();
});
