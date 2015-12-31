'use strict';

$(function(){

    var btn = $('.burger-svg-wrapper'),
    menu    = $('nav'),
    frame   = $('#main-container'),
    body    = $('body');

    function toggleMenu(){

        body.toggleClass('menu-open').promise().done(function(){

            if( body.hasClass('menu-open') ){
                setTimeout(function(){
                    body.on('click', closeMenu);
                }, 1);
            }

        });
    }

    function closeMenu(e){

        var t = $(e.target),
            p = t.parents('nav');

        if( !p.length ){
            body.removeClass('menu-open');
            body.off('click', closeMenu);
        }
    }

    btn.on('click', toggleMenu);
});
