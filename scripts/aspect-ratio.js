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

            //hero hack
            if( element.data('aspect-offset') ){
                height = height + parseInt( element.data('aspect-offset') );
            }

            element.css({width: width, height: height});
        });

        try {
            UIkit.trigger('changed.uk.dom');
        }
        catch(e){
            console.log('uikit not loaded yet');
        }
    }

    $(window).on('resize load ready', _.debounce(calculate));
});
