'use strict';

$(function() {

    try {
        var iframe = $('#showreel');
        var player = $f(iframe[0]);

            // When the player is ready, add listeners for pause, finish, and playProgress
            player.addEvent('ready', function() {

                player.addEvent('play', function(){
                   $(document).trigger('videoLoaded');
                });

                $(document).on('pageLoaded', function(){
                    iframe.addClass('visible');
                });

                //player.addEvent('pause', onPause);
                //player.addEvent('finish', onFinish);
                //player.addEvent('playProgress', onPlayProgress);
            });
    }
    catch(e){
        console.error('vimeo error:', e);
    }

});
