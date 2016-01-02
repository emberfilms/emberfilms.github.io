'use strict';

/*
* Opening / Closing System
*/
$(function(){

    var btn = $('.burger-svg-wrapper'),
    body    = $('body');

    function closeMenu(e){

        var t = $(e.target),
            p = t.parents('nav');

        if( !p.length ){
            body.removeClass('menu-open');
            body.off('click', closeMenu);
        }
    }

    function toggleMenu(){

        body.toggleClass('menu-open').promise().done(function(){

            if( body.hasClass('menu-open') ){

                $(document).trigger('refreshUnderline');

                setTimeout(function(){
                    body.on('click', closeMenu);
                }, 1);
            }

        });
    }

    btn.on('click', toggleMenu);
});

/*
* Underline animation
*/
$(function(){

    var $elem     = $('[data-navigation-underline]'),
    nav           = $elem.parent(),
    items         = nav.find('a'),
    bar           = $elem,
    moveUnderline = function( ev, item ){

        var link = item || $(this),
        marginL  = parseInt(link.css('marginLeft')),
        left     = link.position().left + marginL,
        width    = link.width();

        bar.css({
            left: left,
            width: width
        });

    },
    initialPositioning = function(){

        _.each( items, function( item ){

            var link = $(item);

            if( link.hasClass('active') ){
                moveUnderline( {}, link );
            }
        });
    },
    moveActiveClass = function(){
        items.removeClass('active');
        $(this).addClass('active');
    };

    nav.on('mouseover', 'a', moveUnderline)
       .on('click', 'a', moveActiveClass)
       .on('mouseleave', initialPositioning)
       .ready(initialPositioning);

    $(document).on('refreshUnderline', initialPositioning);
});

/*
* Header Fader
*/
$(function(){

    $(window).on('scroll', function(){

        var header = $('header'),
        scrollT    = $(window).scrollTop(),
        range      = 200,
        opacity    = (1 - (((scrollT + range) / range) - 1)).toFixed(2);

        if( opacity < 0.00 ){
            opacity = 0;
        }

        header.css('opacity', opacity);
    });
});
