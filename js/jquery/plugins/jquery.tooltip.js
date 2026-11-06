( function($) {

    var o = {};

    $.tooltip = function(opts){

        o = $.extend( $.tooltip.defaultOpts, opts );

        $('body').delegate(o.target, 'mouseleave', $.tooltip.hide);
        $('body').delegate(o.target, 'mouseenter', $.tooltip.show);


    };

    $.tooltip.show = function(e){

        var $target = $(e.currentTarget),
        $tooltip = $(o.tooltipId),
        left, top,
        offset = $target.offset(),
        bodyWidth = $('body').width(),
        bodyHeight = $('body').height();

        if($target.hasClass('disabled')){
            $tooltip.find('p').html($target.attr('message_alt'));
        }else{
             $tooltip.find('p').html($target.attr('message'));
        }

            if(offset.left > bodyWidth - 300){
                left = offset.left-275;
                $tooltip.find('span').css('left', 278);
            }else{
                left = offset.left;
                $tooltip.find('span').css('left', 5);
            }

            if(offset.top > bodyHeight - $tooltip.height()-40){
                top = offset.top-$tooltip.height()-30;
                $tooltip.find('span.t').css('display', 'none');
                $tooltip.find('span.b').css({
                    'display' : 'inline',
                    'top' : $tooltip.height()+10
                    });
            }else{
                top = offset.top+40;
                $tooltip.find('span.t').css({
                    'display': 'inline' ,
                    'top': -15
                });
                $tooltip.find('span.b').css('display', 'none');
            }

            $tooltip.css({
                'display':'block',
                'left' : left,
                'top': top
            });
        }
    

    $.tooltip.hide = function(e){
        $(o.tooltipId).hide();
    }

    $.tooltip.defaultOpts = {
        tooltipId : '#tooltip'
    };

})(jQuery);