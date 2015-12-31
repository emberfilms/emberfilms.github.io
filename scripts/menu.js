'use strict';

$(function(){

    var btn = $('.intro'),
    menu    = $('nav'),
    frame   = $('#main-container'),
    body    = $('body');

    function toggleMenu(){
        body.toggleClass('menu-open');
        console.log(frame, menu);
    }

    btn.on('click', toggleMenu);
});
