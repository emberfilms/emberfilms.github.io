'use strict';

$(function(){
    var html = $('footer span');
    var year = new Date().getFullYear().toString();
    if( html.text() != year ){
        html.text(year);
    }
});
