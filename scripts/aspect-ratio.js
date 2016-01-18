'use strict';

$(function(){

    function calculate(){

        $('[data-aspect]').each(function(){

            var element = $(this),
            ratio = element.data('aspect').split(':'),
            boundry = element.data('aspect-boundry') || 'width',
            diff, height, width;

            if( boundry === 'width' ){
                diff = ratio[1] / ratio[0];
                width = $(this).parent()[0].getBoundingClientRect().width;
                height = width * diff;
            }
            else {
                diff = ratio[0] / ratio[1];
                height = $(this).parent()[0].getBoundingClientRect().height;
                width = height * diff;
            }

            element.css({width: width, height: height});
        });
    }

    $(window).on('resize load ready', _.debounce(calculate));
});
