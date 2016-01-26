'use strict';

/*
* Opening / Closing System
*/
$(function(){

    var btn = $('.menu-button'),
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
    modifier      = 10,
    moveUnderline = function( ev, item ){

        var href = item || $(this),
        link     = href.find('span'),
        marginL  = parseInt(link.css('marginLeft')),
        paddingL = 0,
        left     = (link.position().left + marginL) + paddingL + (modifier / 2),
        width    = link.width() - modifier;

        if( !link.find('img').length ){

            bar.css({
                left: left,
                width: width
            });
        }
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
    },
    spanify = function(){

        _.each( items, function( item ){
            var link = $(item);
            link.html( '<span>' + link.html() + '</span>' );
        });
    };

    nav.on('mouseover', 'a', moveUnderline)
       .on('click', 'a', moveActiveClass)
       .on('mouseleave', initialPositioning)
       .ready(spanify);

    $(window).on('load', initialPositioning);
    $(document).on('refreshUnderline', initialPositioning);
});

/*
* Header Fader
*/
$(function(){

    var header    = $('body > header'),
    lastScrollTop = 0,
    fireRefresh = function(){
        setTimeout(function(){

            if( !header.hasClass('mini') ){
                $(document).trigger('refreshUnderline');
            }
        }, 250);
    };

    $(window).on('scroll', function(){

        var dist = $(document).scrollTop();

        if( dist > 60 ){

            if( dist > lastScrollTop ){

                if( !header.hasClass('mini') ){
                    header.addClass('mini');
                }

                if( dist > 100 ){

                    if( !header.hasClass('hide') ){
                        header.addClass('hide');
                    }
                }
            }
            else {
                header.removeClass('mini hide').promise().done(fireRefresh);
            }
        }
        else {
            header.removeClass('mini hide').promise().done(fireRefresh);
        }

        lastScrollTop = dist;
    });
});
