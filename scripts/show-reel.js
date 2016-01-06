'use strict';

$(function() {

    var player = $('#showreel-container video')[0];

    player.addEventListener('canplaythrough', function(){
        $(document).trigger('videoLoaded');
    });

});
