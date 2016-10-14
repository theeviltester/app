window.rhfs=window.rhfs||[];rhfs.push('./extensions/wikia/AdEngine/js/provider/remnantGptMobile.js');
/*global define*/
define('ext.wikia.adEngine.provider.remnantGptMobile', [
	'ext.wikia.adEngine.provider.factory.wikiaGpt'
], function (factory) {
	'use strict';

	return factory.createProvider(
		'ext.wikia.adEngine.provider.remnantGptMobile',
		'RemnantGptMobile',
		'mobile_remnant',
		{
			MOBILE_TOP_LEADERBOARD:     {size: '300x50,300x250,320x50,320x100,320x480'},
			MOBILE_BOTTOM_LEADERBOARD:  {size: '300x50,300x250,320x50,320x100,320x480'},
			MOBILE_IN_CONTENT:          {size: '320x50,300x250,300x50,320x480'},
			MOBILE_PREFOOTER:           {size: '320x50,300x250,300x50'}
		}
	);
});
