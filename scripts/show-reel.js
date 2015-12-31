'use strict';

$(function() {

    var iframe = $('#showreel')[0];
    var player = $f(iframe);

    function onPause() {
       // console.log('paused');
    }

    function onFinish() {
      //  console.log('finished');
    }

    function onPlayProgress() {
      //  console.log(data.seconds + 's played');
    }

    try {
        // When the player is ready, add listeners for pause, finish, and playProgress
        player.addEvent('ready', function() {
            //player.play();
            player.addEvent('pause', onPause);
            player.addEvent('finish', onFinish);
            player.addEvent('playProgress', onPlayProgress);
        });
    }
    catch(e){
        console.error('vimeo error:', e);
    }

});
