'use strict';

$(function() {

    var player        = $('#showreel-container video'),
        playerButton  = $('#play-showreel'),
        html          = $('html');

    if( player.length && false ){

        player[0].addEventListener('canplaythrough', function(){
            playerButton.removeClass('loading');
        });

        playerButton.on('click', function(){

            player.removeClass('loading');

            //if its paused, we play it
            if( player[0].paused ){
                player[0].play();
                html.addClass('video-played');
                html.toggleClass('video-playing');
            }
            //if its playing, we pause it
            else {
                player[0].pause();
                html.toggleClass('video-playing');
            }
        });

        player.on('mouseenter', function(){

            html.addClass('video-over');

        }).on('mouseleave', function(e){

            var ms  = {top: e.pageY, left: e.pageX};

            var box       = playerButton.offset();
            box.width     = playerButton.width();
            box.height    = playerButton.height();
            box.maxWidth  = box.width + box.left;
            box.maxHeight = box.height + box.top;

            if( ms.top >= box.top && ms.top <= box.maxHeight ){
                if( ms.left >= box.left && ms.left <= box.maxWidth ){
                    return false;
                }
            }

            html.removeClass('video-over');
        });
    }
});
