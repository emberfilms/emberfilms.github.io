
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
    body          = $('body'),
    lastScrollTop = 0,
    fireRefresh = function(){
        setTimeout(function(){

            if( !header.hasClass('mini') ){
                $(document).trigger('refreshUnderline');
            }
        }, 250);
    };

    $(window).on('scroll', function(){

        var dist = $(document).scrollTop(),
            offset = header[0].getBoundingClientRect().height;

        if( dist > offset ){

            if( dist > lastScrollTop ){

                if( !body.hasClass('mini-nav') ){
                    body.addClass('mini-nav');
                }

                body.removeClass('peek');

            }
            else {
                body.addClass('peek').promise().done(fireRefresh);
            }
        }
        else {
            body.removeClass('mini-nav peek').promise().done(fireRefresh);
        }

        lastScrollTop = dist;
    });
});
