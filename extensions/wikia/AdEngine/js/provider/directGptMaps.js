window.rhfs=window.rhfs||[];rhfs.push('./extensions/wikia/AdEngine/js/provider/directGptMaps.js');
/*global define*/
define('ext.wikia.adEngine.provider.directGptMaps', [
	'ext.wikia.adEngine.provider.factory.wikiaGpt'
], function (factory) {
	'use strict';

	return factory.createProvider(
		'ext.wikia.adEngine.provider.directGptMaps',
		'DirectGptMaps',
		'maps',
		{
			'MAPS_BUTTON': {size: '320x50,1x1'}
		}
	);
});
