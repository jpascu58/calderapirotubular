/**
 * detect IE
 * returns version of IE or false, if browser is not Internet Explorer
 */
function detectIE() {
    var ua = window.navigator.userAgent;

    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
        // IE 11 => return version number
        var rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
       // Edge (IE 12+) => return version number
       return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }

    // other browser
    return false;
}

// jQuery QuickView

(function($)
{
    $.fn.quickview = function(options)
    {
        var defaults = {
            embedded: true,
            growTo: 'left',
            transitionTime: 400,
            navigation: 'persistent',
            caption: 'showMax' /*hidden, persistent, showMax, showMin */
        }
		
        $.extend(defaults, options);
		
        return this.each(function()
        {
            var $self = $(this);
            var current_index = 0;
			var fileType ='img';
			var player_height = 345;
			var player_width = 530;
            var multimedia_arr = new Array();
            var total_items;
            var enlarged = false;
            var container;
            var quickview;
            var holder;
            var nav;
            var zoom = 1;
			
            //Setting variables
            total_items = $self.children("li").size();
			

            //Zoom in
            var zoomIn = function(index)
			{
                if(zoom > 0)
				{
					
					//Hacemos crecer el holder
					holder.slideDown(defaults.transitionTime/1.5);
					
					//Comprobamos que el índice se mantenga dentro de los límites del array
                    checkBoundaries(index);
					
					//Force display of icons
					if (zoom == 1){
						//Audios, vidios and swf fix
						switch (getFileExtension(multimedia_arr[current_index].max))
						{
							//Si es un formato permitido, mostramos la navegación clásica
							case 'swf': case 'mp4': case 'flv': case 'mp3':	
								zoom = 2;
								enlarged = true;
								zoomIn(index);
								return false;
							break;
						}
						$('.nav .disminuir, .nav .aumentar', quickview).show();
					}
					else if(zoom == 2)
					{
						$('.nav .aumentar', quickview).hide();
						$('.nav .disminuir', quickview).show();
					}
					
                    //Hide current image
                    hideMultimedia();

                    //Load Caption
                    loadCaption();
                }
				
            }

            //Zoom out
            var zoomOut = function(index)
			{
				
                if(zoom > 0)
				{
					//Audios, vidios and swf fix
					switch (getFileExtension(multimedia_arr[current_index].max))
					{
						//Si es un formato permitido, mostramos la navegación clásica
						case 'swf': case 'mp4': case 'flv': case 'mp3':	
							zoom = 0;
							enlarged = false;
							zoomOut(index);
							return false;
						break;
					}
					
                    checkBoundaries(index);

					//Force display of icons
					$('.nav .disminuir, .nav .aumentar', quickview).show();
					
                    //Hide current image
                    hideMultimedia();

                    //Load Caption
                    loadCaption();
                }
				else if(zoom == 0)
				{
					//Force display of icons
					$('.nav .aumentar', quickview).show();
					$('.nav .disminuir', quickview).hide();
					
					holder.slideUp(defaults.transitionTime/1.5);
                }
            };
	
	
            // Actualizar
            var updateData = function(index)
            {
			
                checkBoundaries(index);
				
				//Load Caption
                loadCaption();
				
				
				//Definimos nuevo estado de zoom dependiendo de si hay un thumb o no
				if(zoom == 1 && !multimedia_arr[current_index].thumb){ 
					zoom = 2;
					enlarged = true;
					zoomIn(current_index);
				}
				
				//Estado min
				if (zoom == 0){
					$('.nav .aumentar', quickview).show();
					$('.nav .disminuir', quickview).hide();
				}
				//Estado thumb
				else if (zoom == 1){
					$('.nav .disminuir, .nav .aumentar', quickview).show();
					
					//Si hay thumb pero es un audio o vídeo
					switch (getFileExtension(multimedia_arr[current_index].max))
					{
						//Si es un formato permitido, mostramos la navegación clásica
						case 'swf': case 'mp4': case 'flv': case 'mp3':	
							zoom = 2;
							enlarged = true;
							updateData(index);
						break;
					}
				}
				//Estado max
				else{
					$('.nav .disminuir', quickview).show();
					$('.nav .aumentar', quickview).hide();
				}
				
				//Modificación barra de navegación acorde al formato de archivo
				switch (getFileExtension(multimedia_arr[current_index].max))
				{
					//Si es un formato permitido, mostramos la navegación clásica
					case 'jpg': case 'png': case 'gif': case 'swf': case 'mp4': case 'flv': case 'mp3': case 'GIF': case 'PNG': case 'JPG': case 'JPEG': case 'jpeg':	
						$('.nav .descargar', quickview).hide();
						$('.nav .flotar', quickview).show();
					break;
					//Sino, quitamos max, min, ventana flotante y agregamos descargar
					default:
						$('.nav .flotar, .nav .disminuir, .nav .aumentar', quickview).hide();
						$('.nav .descargar', quickview).show();
					break;
				}
				
				//Modificación barra de navegación acorde al formato de archivo
				switch (getFileExtension(multimedia_arr[current_index].max))
				{ 
					case 'swf': 
						$('.nav .disminuir, .nav .aumentar', quickview).hide();
					break;
				}
				
				//Ocultamos elemento multimedia actualmente visible
				hideMultimedia();
                
            };
	
	
            //load Captions
            var loadCaption = function()
            {
                $('.desc', nav).html(multimedia_arr[current_index].caption);
				
            };
	
	
            //Check Boundaries
            var checkBoundaries = function(index)
            {
                if (index>=total_items){
                    current_index = 0;
                }
                else if (index<0){
                    current_index = total_items - 1;
                }
                else{
                    current_index = index;
                }
            };
	
	
		
            //Carga de las imágenes
            var loadImage = function()
            {
                //Determinamos que imagenes cargar
                 var url;
				
				if(enlarged){
					var ext = getFileExtension(multimedia_arr[current_index].max);
					
					switch (ext)
					{
						//Formatos permitidos
						case 'jpg': case 'png': case 'gif': case 'GIF': case 'PNG': case 'JPG': case 'JPEG': case 'jpeg':
							url = multimedia_arr[current_index].max;
						break;
								 
						//Si es un formato no soportado
						default:
							url = multimedia_arr[current_index].thumb;
						break;
					}
				}
				else
				{
					url = multimedia_arr[current_index].thumb;
				}
				
		
                var img = new Image();
		 		
				
				container.parent().addClass('loading');
								
                $(img).load(function () 
                {
                    $(this).hide();
                    container.html(this);
                    container.animate({
                        opacity: 0.7,
                        height: (this.height) ? this.height:"auto",
                        width: 635
                    }, defaults.transitionTime, function(){
                        showImage();
                  });
                }).attr('src', url);
            };
			
			
			//Carga de flash player
			var loadPlayer = function($target)
            {
				//Determinamos que elemento cargar
                var url = multimedia_arr[current_index].max;
				
				//Agregamos loader
				$target.parent().addClass('loading');
				
				//Creamos div vacío, será reemplazado por SWFObject para embeber el objeto Flash. Generamos un id específico
				var id = new Date().getTime();
				
				var is_firefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
				var testEl = document.createElement( "video" );
				
				if( testEl.canPlayType ){
					// modern browser video on html5 supported
					var video_file = url;
					video_file = video_file.split("../../ebook/").join("");
					var video_ogg = video_file.substr(0, video_file.lastIndexOf(".")) + ".ogg";
					var video_m4v = video_file.substr(0, video_file.lastIndexOf(".")) + ".m4v";
					$target.html('<div id="'+id+'"><video controls><source src="'+video_m4v+'" type="video/mp4" /><source src="'+video_ogg+'" type="video/ogg" /></video></div>');
					
					return;
				}
				
				var flashvars = {
					screencolor: '#f7f7f7',
					file: multimedia_arr[current_index].max,
					logo: null,
					autostart: false,
					image: multimedia_arr[current_index].thumb
				};
					
				var params = {
					allowfullscreen: 'true',
					wmode: 'transparent'
				};
					
				var attributes = {};
							
				swfobject.embedSWF("../core/swf/player.swf", id, multimedia_arr[current_index].width, multimedia_arr[current_index].height, "10.0.0","expressinstall.swf", flashvars, params, attributes);
				
				//Agrandamos container para que se vea el Player
				if ($target.hasClass('quickview-image')) showPlayer($target);
			}
			
			var showPlayer = function($target)
            {
                $target.animate({
                    opacity: 1,
					width: multimedia_arr[current_index].width,
					height: multimedia_arr[current_index].height
                }, defaults.transitionTime).removeClass('loading').fadeIn(defaults.transitionTime);
            }
			
			
            var showImage = function()
            {
                container.animate({
                    opacity: 1
                }, defaults.transitionTime).removeClass('loading').children().fadeIn(defaults.transitionTime);
				rezCont();
            };
	
			var getFileExtension = function(filename)
			{
				return filename.split('.').pop();
			};
			
			
            var hideMultimedia = function()
            {
				if(enlarged)
				{	
					//Determinamos la acción a seguir según el formato de archivo
					var ext = getFileExtension(multimedia_arr[current_index].max);
					
					container.children().hide();
					
					switch (ext)
					{
						//Si es imagen
						case 'jpg': case 'png': case 'gif': case 'swf': case 'GIF': case 'PNG': case 'JPG': case 'JPEG': case 'jpeg':
							fileType = 'img';
							loadImage();
						break;
							 
						//Si es vídeo, flash o audio
						case 'mp4': case 'flv': case 'mp3': 
							fileType = 'other';
							loadPlayer(container);
						break;
						
						//Si es un formato no soportado
						default:
							fileType = 'img';
							loadImage();
						break;
					}
				}
				else
				{
					loadImage();
				}
            };
			
			
			var resizeImg = function ($target, origWidth, origHeight)
			{
				var ratioW = $target.width()/origWidth;
				var ratioH = $target.height()/origHeight;
				
				if(ratioW < ratioH)
					$target.find('img').width(origWidth*ratioW).height(origHeight*ratioW);
				else
					$target.find('img').width(origWidth*ratioH).height(origHeight*ratioH);
			};
			
			
			var resizeObject = function ($target, origWidth, origHeight)
			{
				var ratioW = $target.width()/origWidth;
				var ratioH = $target.height()/origHeight;
				
				if(ratioW < ratioH)
					$target.find('object').width(origWidth*ratioW).height(origHeight*ratioW);
				else
					$target.find('object').width(origWidth*ratioH).height(origHeight*ratioH);
					
			};
			
			
			var loadWindow = function(e)
			{
				
				var dialog_id = multimedia_arr[current_index].max;
				
				if (!$('.ui-dialog-content[id="'+dialog_id+'"]').closest('.ui-dialog').is(':visible'))
				{
					var ext = multimedia_arr[current_index].max;
					ext = multimedia_arr[current_index].max.substr(ext.lastIndexOf(".")+1,ext.length);
						
					//Si se trata de una IMG
					
					if (ext == 'jpg' || ext == 'png' || ext == 'gif' || ext == 'GIF' || ext == 'PNG' || ext == 'JPG' || ext == 'JPEG' || ext == 'jpeg')
					{
						var img = new Image();
	
						$(img).load(function ()
						{
							var $target = $('<div id="'+dialog_id+'"></div>');
							var $temp = $('<div class="image-wrapper"></div>').wrapInner($(this));
							var origWidth = this.width;
							var origHeight = this.height;

							
							$target.append($temp).dialog(
							{
								title: multimedia_arr[current_index].title,
								width: this.width+10 ,
								zIndex: 9999,
								open: function(e, ui) {
									$(this).closest('.ui-dialog').append('<div class="ui-desc">'+multimedia_arr[current_index].caption+'</div>');
								},
								resize: function(event, ui) {
									var $target = $(this);
									resizeImg ($target, origWidth, origHeight);
								}
								
							}).dialogExtend({
								"maximize" : true,
								"minimize" : true,
								"dblclick" : "",
								"icons" : {
								  "maximize" : "ui-maximizar",
								  "minimize" : "ui-minimizar",
								  "restore" : "ui-restaurar"
								},
								"events" : {

									"minimize" : function(){
										$target.next().hide();
									},
									"maximize" : function(){
										var $target = $(this);
										resizeImg ($target, origWidth, origHeight);
										$(this).dialog("option",{
											"position": [0, 0]		   
										});
										$target.next().show();
									},
									"restore" : function(){
										var $target = $(this);
										resizeImg ($target, origWidth, origHeight);
										$(this).dialog("option",{
											"position": ['center', 'center']		   
										});
										$target.next().show();
									}
								}
							  });
						}).attr('src', multimedia_arr[current_index].max);
					}
					else if( ext == 'swf' )
					{
						//Si se trata de swf 
						var $target = $('<div id="'+dialog_id+'" style="padding-bottom: 25px"></div>');
						$target.delay(100).append($temp).dialog(
						{
						title: multimedia_arr[current_index].title,
							width: 680,
							height: 500,
							zIndex: 9999,
							open: function(e, ui) {
								$(this).closest('.ui-dialog').append('<div class="ui-desc">'+multimedia_arr[current_index].caption+'</div>');
								var ide = new Date().getTime();
								$target.html('<div id="'+ide+'" />');
								swfobject.embedSWF(multimedia_arr[current_index].max, ide, "100%", "100%", "10.0.0","expressinstall.swf");
							},
							resize: function(event, ui) {
								var $target = $(this);
								resizeObject ($target, origWidth, origHeight);
							}
						});
					}
					//Si se trata de vídeo, swf o audios
					else
					{
						var $target = $('<div id="'+dialog_id+'" style="padding-bottom: 25px"></div>');
						var id = new Date().getTime() ;
						var origWidth = multimedia_arr[current_index].width;
						var origHeight = multimedia_arr[current_index].height;
						var $temp = $('<div class="image-wrapper" id="'+id+'"></div>').css({height: origHeight, width: origWidth});
						
						$target.delay(100).append($temp).dialog(
						{
							title: multimedia_arr[current_index].title,
							width: this.width+10 ,
							zIndex: 9999,
							open: function(e, ui) {
								$(this).closest('.ui-dialog').append('<div class="ui-desc">'+multimedia_arr[current_index].caption+'</div>');
							},
							resize: function(event, ui) {
								var $target = $(this);
								resizeObject ($target, origWidth, origHeight);
							}
						}).dialogExtend({
								"maximize" : true,
								"minimize" : true,
								"dblclick" : "",
								"icons" : {
								  "maximize" : "ui-maximizar",
								  "minimize" : "ui-minimizar",
								  "restore" : "ui-restaurar"
								},
								"events" : {
									"minimize" : function(){
										$target.next().hide();
									},
									"maximize" : function(){
										loadPlayer($(this));
										var $target = $(this);
										resizeObject ($target, origWidth, origHeight);
										$(this).dialog("option",{
											"position": [0, 0]		   
										});
										$target.next().show();
									},
									"restore" : function(){
										loadPlayer($(this));
										var $target = $(this);
										resizeObject ($target, origWidth, origHeight);
										$(this).dialog("option",{
											"position": ['center', 'center']		   
										});
										$target.next().show();
									},
									"load": function(){
										loadPlayer($(this));
									}
								}
							  });
						
						
					}
				}
			};

		
			
            $self.find('li').each(function(i)
            {
                multimedia_arr[i] = new Array();
                multimedia_arr[i].max = $(this).find('a').attr('href');
                multimedia_arr[i].title = $(this).find('img').attr('title');
                multimedia_arr[i].caption = $(this).find('img').attr('desc');
                multimedia_arr[i].thumb = ($(this).find('img').attr('src')!="") ? ($(this).find('img').attr('src')) : null;
				multimedia_arr[i].width = ($(this).find('a').attr('width')) ? $(this).find('a').attr('width') : null;
				multimedia_arr[i].height = ($(this).find('a').attr('height')) ? $(this).find('a').attr('height') : null;
            });
			
			
            //Creamos el holder principal
            container = $('<div class="quickview-image"></div>');
            quickview = $('<div class="quickview" />');
            holder = $('<div class="quickview-holder"></div>');
            nav = $('<div class="nav"><div class="desc"></div><a href="#nogo" class="flotar" title="Abrir ventana flotante"><span>Flotar</span></a><a href="#nogo" class="descargar" title="Descargar"><span>Descargar</span></a><a href="#nogo" class="disminuir" title="Disminuir"><span>Disminuir</span></a><a href="#nogo" class="aumentar" title="Aumentar"><span>Aumentar</span></a><a href="#nogo" class="siguiente next-prev" title="Siguiente"><span>Siguiente</span></a><a href="#nogo" class="anterior next-prev" title="Anterior"><span>Anterior</span></a><div class="clear-fix"></div></div>');
			

            holder.append(container);
            quickview.append(holder).append(nav);
			
			


            $self.after(quickview);
            if(multimedia_arr.length<2){
                $self.next().find('.next-prev').remove();
            }
			
            //Eventos de navegacion
            $('.anterior', nav ).click(function(e){
                e.preventDefault();
                updateData(current_index - 1);
            });
			
            $('.siguiente', nav).click(function(e){
                e.preventDefault();
                updateData(current_index + 1);
            });
			
            $('.disminuir', nav).click(function(e){
                e.preventDefault();
                if(zoom ==1 || !multimedia_arr[current_index].thumb){
					zoom = 0;
				}
				else if(zoom == 2){
                    zoom = 1;
                }

				enlarged = false;
				zoomOut(current_index);
				//rezCont();
            });

			
            $('.aumentar', nav).click(function(e){
			
                e.preventDefault();
                if(zoom == 1 || !multimedia_arr[current_index].thumb){
                    zoom = 2;
                    enlarged = true;
                    zoomIn(current_index);
                }else if(zoom == 0){
                   	zoom = 1;
                   	enlarged = false;
                    zoomIn(current_index);
                }
				//rezCont();
            });
			
			$('.descargar', nav).click(function(e){
                e.preventDefault();
                window.open(multimedia_arr[current_index].max,'_blank');
            });
            
			//Ventana flotante
			$('.flotar', nav).click(function(e)
			{
               //Impedimos burbuja
			   e.preventDefault();

               //Abrimos ventana
			   loadWindow(e); 

            });
			
			//Si quickview está embebidod dentro de un bloque ocultable, lo hacemos más angosto
			if($self.parent().hasClass('contenido-ocultable')) quickview.css('width', 660);
			
			
            /* Initialize*/
            updateData(0);
         
			
			
        });
    };
    
	
})(jQuery);

jQuery('head').append('<style type="text/css"> .quickview-thumbs { position: absolute; top: -1000em; left: -1000em; } </style>');

function rezCont(){
	var userAgent_1 = navigator.userAgent.toLowerCase().indexOf('safari') > -1;
	var userAgent_2 = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
	var userAgent_3 = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
	if( userAgent_1 == true && userAgent_2 == true ){
		//return 'chrome';
		$('.quickview-image IMG').css('height','100%').height('100%');
	}else if( userAgent_1 == true ){
		//return 'safari';
		$('.quickview-image img').css('height','100%');
	}else if( userAgent_3 == true ){
		//return 'firefox';
		$('.quickview-image img').css('height','100%');
	}else{
		//return 'ie';
	}
}