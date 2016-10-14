window.rhfs=window.rhfs||[];rhfs.push('./resources/wikia/libraries/jquery/autoresize/jquery.autoresize.js');
/*
 * jQuery autoResize (textarea auto-resizer)
 * @copyright James Padolsey http://james.padolsey.com
 * @version 1.04
 */

(function($){
    
    $.fn.autoResize = function(options) {
        
        // Just some abstracted details,
        // to make plugin users happy:
        var settings = $.extend({
            onResize : function(){},
            animate : $.browser.msie ? false : true,
            animateDuration : 150,
            animateCallback : function(){},
            extraSpace : 20,
            min: 0,
            minFocus: 0,
            minContent: 0,
            minAnim: 25,
            limit: 1000,
            limitEmpty: 1000
        }, options);
        
        // Only textarea's auto-resize:
        this.filter('textarea').each(function(){
            
                // Get rid of scrollbars and disable WebKit resizing:
            var textarea = $(this).css({resize:'none','overflow-y':'hidden'}),
            
                // Cache original height, for use later:
                origHeight = textarea.height(),
                
                // Need clone of textarea, hidden off screen:
                clone = (function(){
                    
                    // Properties which may effect space taken up by chracters:
                    var props = ['height','width','lineHeight','textDecoration','letterSpacing'],
                        propOb = {};
                        
                    // Create object of styles to apply:
                    $.each(props, function(i, prop){
                        propOb[prop] = textarea.css(prop);
                    });
                    
                    // Clone the actual textarea removing unique properties
                    // and insert before original textarea:
                    return textarea.clone().removeAttr('id').removeAttr('name').css({
                        position: 'absolute',
                        top: 0,
                        left: -9999
                    }).css(propOb).attr('tabIndex','-1').insertBefore(textarea);
					
                })(),
                lastScrollTop = null,
                updateSize = function() {
					var node = $(this);
					
                    // Prepare the clone:
                    clone.height(0).width(textarea.outerWidth()).val($(this).val()).scrollTop(10000);
					
                    // Find the height of text:
                    var scrollTop = Math.max(clone.scrollTop(), origHeight) + settings.extraSpace,
                        toChange = node.add(clone);
                        
                    // Check for mins:
                    var focus = node.hasClass('focus') ? true : false;
                    var content = node.val().length > 0 && !node.hasClass('placeholder') ? true : false;
                    if ( scrollTop < settings.min ) scrollTop = settings.min;
                    if ( focus && scrollTop < settings.minFocus ) scrollTop = settings.minFocus;
                    if ( content && scrollTop < settings.minContent ) scrollTop = settings.minContent;
                    if ( !focus && !content && scrollTop > settings.limitEmpty ) scrollTop = settings.limitEmpty;

                    // Don't do anything if scrollTip hasen't changed:
                    if (lastScrollTop === scrollTop) { return; }
                    var diff = Math.abs(origHeight - scrollTop);
                    if (lastScrollTop != null) diff = Math.abs(lastScrollTop - scrollTop);
                    lastScrollTop = scrollTop;
					
                    // Check for limit:
                    if ( scrollTop >= settings.limit ) {
						node.css('overflow-y','');
                        if(diff < 100) // do not return if diff is large (probably a copy-paste)
                        	return;
                        else
                        	scrollTop = settings.limit;
                    }
                    
                    // Fire off callback:
                    settings.onResize.call(this);
					
                    // Either animate or directly apply height:
                    settings.animate && textarea.css('display') === 'block' && diff > settings.minAnim ?
                        toChange.stop().animate({height:scrollTop}, settings.animateDuration, settings.animateCallback)
                        : toChange.height(scrollTop);
                },
                onFocus = function() {
                    $(this).addClass('focus').trigger('change');
                },
                onBlur = function() {
                    $(this).removeClass('focus').trigger('change');
                };
            
            // Bind namespaced handlers to appropriate events:
            textarea
                .unbind('.dynSiz')
                .bind('keyup.dynSiz', updateSize)
                .bind('keydown.dynSiz', updateSize)
                .bind('focus.dynSiz', onFocus)
                .bind('blur.dynSiz', onBlur)
                .bind('change.dynSiz', updateSize);
            
        });
        
        // Chain:
        return this;
        
    };
    
    
    
})(jQuery);