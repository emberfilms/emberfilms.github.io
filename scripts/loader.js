'use strict';

$(function(){

    var html = $('html'),
    loaded   = function(){

        $('html').addClass('loaded').removeClass('loading');

        $('#loader').fadeOut(function(){
            $(this).remove();
            $(document).trigger('pageLoaded');
        });

    };

    if( html.hasClass('mobile') ){
        loaded();
    }
    else {
        setTimeout(loaded, 5000);
    }

    $(window).on('load', loaded);
});
