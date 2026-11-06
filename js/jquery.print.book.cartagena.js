// -----------------------------------------------------------------------
// Eros Fratini - eros@recoding.it
// jqprint 0.3
//
// - 19/06/2009 - some new implementations, added Opera support
// - 11/05/2009 - first sketch
//
// Printing plug-in for jQuery, evolution of jPrintArea: http://plugins.jquery.com/project/jPrintArea
// requires jQuery 1.3.x
//
// Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
//------------------------------------------------------------------------
(function($) {
    var opt, printval;
    
   

    $.fn.jprintBookPrint = function (options) {

        var $element = (this instanceof jQuery) ? this : $(this);
        var scope = $(this);
        var uri = window.location.pathname ;
        var date = new Date();
        var doc = null;
		
		
		
        $.extend(scope, $.fn.jprintBookPrint.defaults, options);
        opt = $.extend({}, $.fn.jprintBookPrint.defaults, options);
		
        printval = !opt.debug ? 'print' : 'screen';
                
                
        //opt.debug = true;
        
        if (opt.operaSupport && $.browser.opera) 
        { 
            var tab = window.open("","jqPrint-preview");
            tab.document.open();

            var doc = tab.document;
        }
        else 
        {
            //If iframe already exists, delete it
            if($('#iframeprint').length) $('#iframeprint').remove();
						
            var $iframe = $("<iframe id='iframeprint' />");
        
            if (!opt.debug) { 
                $iframe.css({
                    position: "absolute", 
                    width: "0px", 
                    height: "0px", 
                    left: "-600px", 
                    top: "-600px"
                }); 
            }
            //Debug on
            else{
                $iframe.css({
                    position: "absolute", 
                    width: "1000px", 
                    height: "600px"
                }); 
            }
			
            $iframe.appendTo("body");
            var doc = $iframe[0].contentWindow.document;
        }
		       
		
        //Force focus
        (opt.operaSupport && $.browser.opera ? tab : $iframe[0].contentWindow).focus();
		





                
        doc.write('<link rel="stylesheet" type="text/css" href="../core/css/comun.css" media="print"/>')

        //Section procesing
        /////////////////////////////////////////////////////// EXERCISES ///////////////////////////////////////////////////////////////
		
      
        var pageHeader = '<table cellpadding="4" width="100%" cellspacing="0" border="0" style="border-bottom: 1px solid #000; display: block">'+
        '<tr>'+
        '<td align="right" valign="top" width="50"><b>Nombre:</b></td>'+
        '<td align="left" valign="top">_______________________</td>'+
        '<tr>'+
		
        '<td align="right" width="50" valign="top"><b>Libro:</b></td>'+
        '<td align="left" width="350" valign="top">'+$('.titulo_principal').first().text()+'</td>'+
        '</tr>'+
		
        '<tr>'+
        '<td align="right" width="50" valign="top"><b>P&aacute;gina:</b></td>'+
        '<td align="left" width="700px" valign="top">'+$('.titulo_principal').last().text()+'</td>'+
        '</tr>'+
		
        '</table>';			   

			

        //Page Header
        doc.write(pageHeader);
        doc.write('<br/><br/>');
			
       
		//CONTENIDO CENTRAS
        doc.write(($('.col_central').length) ? $('.col_central').html() : "");
		
           
		//VISORES MULTIMEDIA - VIDEO
		$(doc).find('.quickview-image object param').each(function(){
			var unStr = '';
			var busc = $(this).attr('value').split('&');
			try{
				if(/image/.test(busc[4])){
					unStr = busc[4].replace('image=','');					
					$(this).parent().parent().parent().parent().parent().prepend('<img src="'+unStr+'" />').find('.quickview-thumbs').remove();
				}
			}catch(e){}
		});
		
		
		//VISORES MULTIMEDIA - IMAGENES
		$(doc).find('.quickview').remove();
		$(doc).find('.quickview-image img').remove();		
		$(doc).find('.quickview-thumbs a').each(function(){
			var img_ap = $(this).attr('href');
			$(this).parent().css('list-style-type','none').append('<img src="'+img_ap+'" />').find('a').remove();
		});
		
		
		//LISTAS
		$(doc).find('.lista_desordenada li').css('list-style-type','square');
		
		
		//IFRAMES EJERCICIOS
		$(doc).find('iframe').parent().parent().remove();
		
	
		
		
		
		
		
		
        //Footer
        doc.write("<br/><div class='copy'>&copy; 2013 Servicio Regional de Empleo y Formaci&oacute;n Consejer&iacute;a de Educaci&oacute;n, Formaci&oacute;n y Empleo / CARM.</div>")
        
        //Closing doc
        doc.close();
        
        //Opera detection
        (opt.operaSupport && $.browser.opera ? tab : $iframe[0].contentWindow).focus();
		
        //Printing
        if(!opt.debug) setTimeout( function() {
            (opt.operaSupport && $.browser.opera ? tab : $iframe[0].contentWindow).print();
            if (tab) {
                tab.close();
            }
        }, 1000);
		
		
    }
    
	
	
    $.fn.jprintBookPrint.defaults = {
        operaSupport: true,
        debug: false,
        style: [
        //'<link rel="stylesheet" type="text/css" href="exercises.css" media="print"/>',
        '<link rel="stylesheet" type="text/css" href="../core/css/print.css" media="print"/>',
        '<link rel="stylesheet" type="text/css" href="../core/css/comun.css" media="print"/>'
        //'<link rel="stylesheet" type="text/css" href="../../css/core.css" media="print"/>'
        ],
        toHide: ['.exercise-bar',  '.exercise-feedback', '.marked', '.print', '.anchor-navigation', '.multimedia']
    };
			
})(jQuery);
