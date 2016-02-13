'use strict';

/*
* Services auto scrollio
*/
$(function(){

    var services = $('#services');

    if( services.length ){

        var topOffset = services.offset().top;

        $('html, body').animate({
            scrollTop: topOffset
        });
    }
});

/*
* Ajax loading of services overlay
*/
$(function(){

    var link = $('.services-link');

    if( link.length ){

        link.on('click', function(e){

            if( document.location.pathname !== '/services/' ){
                e.preventDefault();
            }

            $('html').addClass('services-open');

            var thisLink = $('.nav .active');
            var overlay = $('<div id="services-overlay" />');

            overlay.load('/services/index.html #services', function( resp ){

                overlay.appendTo( $('body') );
               // overlay.find('.transparent').removeClass('transparent');
                $(document).trigger('calculateAspectRatios');

                try {
                    var title = $(resp)[1].innerText;
                    document.title = title;

                    var thisUrl = document.location.pathname;

                    $(window).one('popstate', function(){

                        if( !history.state ){

                            document.title = $('html head title').text();
                            history.replaceState(null, document.title, thisUrl);

                            $('.nav .active').removeClass('active');
                            thisLink.addClass('active');
                            $(document).trigger('refreshUnderline');

                            overlay.fadeOut(function(){
                                overlay.remove();
                            });
                        }

                    });

                    $('#close-services').one('click', function(){
                        window.history.back();
                    });

                    history.pushState({isServices: true}, title, '/services/');

                } catch(err){
                    console.log('couldn\'t retieve page title');
                }

            });

        });

    }

});
