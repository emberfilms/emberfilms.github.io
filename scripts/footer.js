'use strict';

$(function(){
    var html = $('footer .date');
    var year = new Date().getFullYear().toString();
    if( html.text() !== year ){
        html.text(year);
    }
});
