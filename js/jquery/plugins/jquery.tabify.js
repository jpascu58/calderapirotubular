// jQuery Tabify
(function($){
	
	 var methods = {
		
		init: function(options)
		{
			var defaults = {
				transition: 'slide', /* Valores: none, fade, slide */
				transitionTime: 400,
				event: 'click',
				tabsCSS: '.tabMenu',
				contentsCSS: '.tabBody .content',
				ajaxType: 'POST',
				show: '', //Acepta ID con #
				loader: 'ajax-loader.gif',
				loaderMessage: 'Cargando... Aguarde un momento por favor.',
				iframeHeight: 500,
				iframeWidth: '100%'
			};
			
			return this.each(function() 
			{        
				if ( options ) 
				{ 
					$.extend( defaults, options );
				}
				
				var reference = $(this);
				
				/* Inicializamos las pestañas*/
				//Si show está vacío cargamos la primera 
				if(defaults.show=='')
				{
					var first = $(defaults.tabsCSS + ' li:first-child a', reference).addClass('selected');
					
					//Ocultamos todos los bloques de contenidos menos el primero
					$('> '+ defaults.contentsCSS, reference).hide().siblings(':first-child').addClass('show').show();
				}
				//Si default contiene un ID, intentamos iniciar los tabs mostrando ese contenido específico
				else
				{
					var first = $(defaults.tabsCSS + ' li a[href*="'+defaults.show+'"]', reference).addClass('selected');
					
					//Ocultamos todos los bloques de contenidos menos el que corresponda al ID
					$('> '+ defaults.contentsCSS, reference).hide().siblings('#'+defaults.show).addClass('show').show();
				}
				
				
				//Si el primer enlace debe cargar un contenido externo, lo cargamos por ajax o por iframe
				if(first.attr('ajax') != undefined)
				{
					var url = first.attr('ajax'); 
					var id = first.attr('href');
							
					methods._loadContent(id, url, defaults);
				}
				
				//Si es un iframe
				else if(first.attr('iframe') != undefined)
				{
					var url = first.attr('iframe'); 
					var id = first.attr('href');
							
					$(id).html('<iframe src="'+ url +'" width="'+ defaults.iframeWidth+'" height="'+ defaults.iframeHeight+'"></iframe>');
				}
						
							
				$('> '+ defaults.tabsCSS +' ul > li a', reference).bind(defaults.event, function(e){

					e.preventDefault();
					
					var el = $(this);

					
					if (!el.hasClass('selected'))
					{
						//Cambiamos la pestaña seleccionada	
						el.parent().siblings().children('a').removeClass('selected');
						el.addClass('selected');
						
						//Ocultamos el contenido actual
						var actual = $('> '+ defaults.contentsCSS + '.show', reference);
						actual.removeClass('show');
						methods._showHide(actual, 'hide', defaults);
						
						
						//Cargamos el nuevo contenido
						var contentID = el.attr('href');
					
						$(contentID).addClass('show');
						methods._showHide($(contentID), 'show', defaults);
						
						//Mostramos el contenido nuevo
						if(el.attr('ajax') != undefined)
						{
							var url = el.attr('ajax'); 
							
							methods._loadContent(contentID, url, defaults);
						}
						else if(el.attr('iframe') != undefined)
						{
							var url = el.attr('iframe'); 
							
							$(contentID).html('<iframe src="'+ url +'" width="'+ defaults.iframeWidth+'" height="'+ defaults.iframeHeight+'"></iframe>');
						}
					}
				});	
		
			});

		},
		
		_showHide: function(el, type, defaults) 
		{
			
			switch(defaults.transition)
			{
				case 'none':
					if (type == 'show'){
						el.show();
					}else{
						el.hide();
					}
				break;
				case 'slide':
					if (type == 'show'){
						el.slideDown(defaults.transitionTime);
					}else{
						el.slideUp(defaults.transitionTime);
					}
				break;
				case 'fade':
					if (type == 'show'){
						el.fadeIn(defaults.transitionTime);
					}else{
						el.hide();
					}
				break;
			}
		},
		
		_loadContent: function(el, url, defaults) 
		{
			$(el).html('<div class="ajaxLoader"><img src="'+ defaults.loader+'" /><br>'+defaults.loaderMessage+'</div>');
							
			$.ajax({
				type: defaults.ajaxType,
				url: url,
				success: function(data){
					$(el).html(data);
				}
			});
		}
	 }
	
	$.fn.tabify = function(method) 
    {
		if ( methods[method]) 
		{
			return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} 
		else if ( typeof method === 'object' || ! method ) 
		{
			return methods.init.apply( this, arguments );
		} 
		else 
		{
			$.error( 'Method ' +  method + ' does not exist on jQuery.tooltip' );
		}    
    };
	
})(jQuery);