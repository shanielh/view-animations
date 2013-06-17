(function($) {

    /**
    * Copyright 2012, Digital Fusion
    * Licensed under the MIT license.
    * http://teamdf.com/jquery-plugins/license/
    *
    * @author Sam Sehnert
    * @desc A small plugin that checks whether elements are within
    *     the user visible viewport of a web browser.
    *     only accounts for vertical position, not horizontal.
    */

    var win               = $(window);

    $.fn.visible = function() {

        var target            = $(this),
  
        // On the both next sections : bottom is larger than top!

        // Defines the range of Y that is shown on screen
        viewTop           = win.scrollTop(),
        viewBottom        = viewTop + win.height(),
  
        // Defines the range of Y of the given object
        targetTop         = target.offset().top,
        targetBottom      = targetTop + target.height(),

        padding           = 100,

        // Whether on screen or not
        isOnView          = 
        (targetBottom - padding) <= viewBottom && (targetBottom - padding) >= viewTop ||
        (targetTop + padding) <= viewBottom && (targetTop + padding) >= viewTop;
  
        return isOnView;

    };

    /**
    * @author Shani Elharrar
    * @desc When called, calls the callback when 
    * the element is visible for the first time.
    */
    $.fn.onVisible = function(callback) {

        var target = $(this);

        var scrollCallback = function() {
            
            if (target.visible()) {
                win.unbind('scroll', scrollCallback); 
                callback(target);   
            }
            
        };

        win.scroll(scrollCallback);
        scrollCallback();
    }
    
    /**
    * @author Shani Elharrar
    * @desc Attaches 'onVisible' for elements
    * that have data-on-visible-class 
    * and adds the wanted class on the callback
    */
    $(function() {
        
        $('*[data-on-visible-class]').each(function(index, item) {
                
            var target = $(item);
            
            var notVisibleClass = target.data('not-visible-class');

            if (target.visible()) {
                return;
            }
        
            if (notVisibleClass) {
                target.addClass(notVisibleClass);
            }
            
            var classToAdd = target.data('on-visible-class');

            var callback = function() {
                target.addClass(classToAdd);
            };
        
            target.onVisible(callback);
        
        });
        
    });

})(jQuery);