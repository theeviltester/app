window.rhfs=window.rhfs||[];rhfs.push('./extensions/wikia/VKTag/js/VKTag.js');
require(['jquery', 'wikia.loader'], function ($, loader) {
	'use strict';

	loader({
		type: loader.LIBRARY,
		resources: ['vk']
	}).done(function () {
		$('[data-wikia-widget="vk"]').each(function () {
			var $this = $(this),
				elementId = $this.attr('id'),
				options = $this.data(),
				groupId = options.groupId;

			VK.Widgets.Group(elementId, options, groupId);
		});
	});
});
