window.rhfs=window.rhfs||[];rhfs.push('./extensions/wikia/BannerNotifications/js/templates.mustache.js');
define( 'BannerNotifications.templates.mustache', [], function() { 'use strict'; return {
    "BannerNotifications" : '<div class="banner-notification"><button class="close wikia-chiclet-button"><img></button><div class="msg">{{{content}}}</div></div>',
    "done": "true"
  }; });
