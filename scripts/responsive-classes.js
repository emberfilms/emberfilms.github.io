'use strict';

$(function(){

    var html = $('html');

    //is mobile?
    if( isMobile.any ){
        html.addClass('mobile');
    }

    //form factor
    if( isMobile.phone ){
        html.addClass('phone');
    }
    else if( isMobile.tablet ){
        html.addClass('tablet');
    }
    else if( isMobile.seven_inch ){
        html.addClass('seven_inch');
    }
    else {
        html.addClass('desktop');
    }

    //brands
    if( isMobile.amazon.device ){
        html.addClass('amazon');
    }
    else if( isMobile.android.device ){
        html.addClass('android');
    }
    else if( isMobile.apple.device ){
        html.addClass('apple');
    }
    else if( isMobile.windows.device ){
        html.addClass('windows');
    }

    //browser
    if( isMobile.other.blackberry ){
        html.addClass('blackberry');
    }
    else if( isMobile.other.blackberry10 ){
        html.addClass('blackberry10');
    }
    else if( isMobile.other.chrome ){
        html.addClass('chrome');
    }
    else if( isMobile.other.firefox ){
        html.addClass('firefox');
    }
    else if( isMobile.other.opera ){
        html.addClass('opera');
    }
});
