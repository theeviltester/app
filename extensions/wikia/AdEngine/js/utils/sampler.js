jsWC=window.jsWC || {}; jsWC["./extensions/wikia/AdEngine/js/utils/sampler.js"]=291;

define('ext.wikia.adEngine.utils.sampler', function () {
	'use strict';

	function sample(partToSample, all) {
		return getRandomInt(0, all) < partToSample;
	}

	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min)) + min;
	}

	return {
		sample: sample
	};
});
