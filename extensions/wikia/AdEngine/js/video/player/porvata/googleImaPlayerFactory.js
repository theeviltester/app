/*global define, google*/
define('ext.wikia.adEngine.video.player.porvata.googleImaPlayerFactory', [
	'ext.wikia.adEngine.video.player.porvata.googleImaSetup',
	'ext.wikia.adEngine.video.player.porvata.moatVideoTracker',
	'wikia.document',
	'wikia.log'
], function (imaSetup, moatVideoTracker, doc, log) {
	'use strict';
	var logGroup = 'ext.wikia.adEngine.video.player.porvata.googleImaPlayerFactory';

	function create(adDisplayContainer, adsLoader, videoSettings) {
		var params = videoSettings.getParams(),
			isAdsManagerLoaded = false,
			status = '',
			videoMock = doc.createElement('video'),
			adsManager,
			mobileVideoAd = params.container.querySelector('video');

		function adsManagerLoadedCallback(adsManagerLoadedEvent) {
			adsManager = adsManagerLoadedEvent.getAdsManager(videoMock, imaSetup.getRenderingSettings(params));
			isAdsManagerLoaded = true;

			if (videoSettings.isMoatTrackingEnabled()) {
				moatVideoTracker.init(adsManager, params.container, google.ima.ViewMode.NORMAL);
			}

			log('AdsManager loaded', log.levels.debug, logGroup);
		}

		function addEventListener(eventName, callback) {
			log(['addEventListener to AdManager', eventName], log.levels.debug, logGroup);

			if (isAdsManagerLoaded) {
				adsManager.addEventListener(eventName, callback);
			} else {
				adsLoader.addEventListener('adsManagerLoaded', function () {
					adsManager.addEventListener(eventName, callback);
				});
			}
		}

		function removeEventListener(eventName, callback) {
			log(['removeEventListener to AdManager', eventName], log.levels.debug, logGroup);

			if (isAdsManagerLoaded) {
				adsManager.removeEventListener(eventName, callback);
			} else {
				adsLoader.addEventListener('adsManagerLoaded', function () {
					adsManager.removeEventListener(eventName, callback);
				});
			}
		}

		function setAutoPlay(value) {
			// mobileVideoAd DOM element is present on mobile only
			if (mobileVideoAd) {
				mobileVideoAd.autoplay = value;
				mobileVideoAd.muted = value;
			}
		}

		function playVideo(width, height) {
			function callback() {
				var roundedWidth = Math.round(width),
					roundedHeight = Math.round(height);

				log(['Video play: prepare player UI', roundedWidth, roundedHeight], log.levels.debug, logGroup);
				adsManager.dispatchEvent('wikiaAdPlayTriggered');

				// https://developers.google.com/interactive-media-ads/docs/sdks/html5/v3/apis#ima.AdDisplayContainer.initialize
				adDisplayContainer.initialize();
				adsManager.init(roundedWidth, roundedHeight, google.ima.ViewMode.NORMAL);
				adsManager.start();
				adsLoader.removeEventListener('adsManagerLoaded', callback);

				log('Video play: started', log.levels.debug, logGroup);
			}

			if (isAdsManagerLoaded) {
				callback();
			} else {
				// When adsManager is not loaded yet video can't start without click on mobile
				// Muted auto play is workaround to run video on adsManagerLoaded event
				setAutoPlay(true);
				adsLoader.addEventListener('adsManagerLoaded', callback, false);
				log(['Video play: waiting for full load of adsManager'], log.levels.debug, logGroup);
			}
		}

		function reload() {
			adsManager.destroy();
			adsLoader.contentComplete();
			adsLoader.requestAds(imaSetup.createRequest(params));

			log('IMA player reloaded', log.levels.debug, logGroup);
		}

		function resize(width, height) {
			var roundedWidth = Math.round(width),
				roundedHeight = Math.round(height);

			if (adsManager) {
				adsManager.resize(roundedWidth, roundedHeight, google.ima.ViewMode.NORMAL);

				log(['IMA player resized', roundedWidth, roundedHeight], log.levels.debug, logGroup);
			}
		}

		function dispatchEvent(eventName) {
			adsManager.dispatchEvent(eventName);
		}

		function setStatus(newStatus) {
			return function () {
				status = newStatus;
			};
		}

		function getStatus() {
			return status;
		}

		function getAdsManager() {
			return adsManager;
		}

		adsLoader.addEventListener('adsManagerLoaded', adsManagerLoadedCallback, false);
		adsLoader.requestAds(imaSetup.createRequest(params));
		if (videoSettings.isAutoPlay()) {
			setAutoPlay(true);
		}

		addEventListener('resume', setStatus('playing'));
		addEventListener('start', setStatus('playing'));
		addEventListener('pause', setStatus('paused'));
		addEventListener('complete', setStatus('completed'));

		return {
			addEventListener: addEventListener,
			dispatchEvent: dispatchEvent,
			getAdsManager: getAdsManager,
			getStatus: getStatus,
			playVideo: playVideo,
			reload: reload,
			removeEventListener: removeEventListener,
			resize: resize,
			setAutoPlay: setAutoPlay
		};
	}

	return {
		create: create
	};
});
