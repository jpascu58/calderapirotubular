// JavaScript Document
var icono_open = false, pdi = false, font_size = 6, tamanios_fuentes = Array();
var colapse_col_central = false;
var cookie = new cookieList();
var position = false;

// SWIPE EVENTS
$('body').live('swipeleft swiperight',function(event){
	if( in_simple_page ){
		if (event.type == "swiperight") {   
			$(".botones8 .footer_bt_prev").click();
		}
		if (event.type == "swipeleft") {
			$(".botones8 .footer_bt_next").click();
		}
	}
	event.preventDefault();
});

//READY DOCUMENT
jQuery(document).ready(function(){

  $(".ui-loader.ui-corner-all.ui-body-a.ui-loader-default.ui-loader-fakefix").hide();
  
	$("body a").attr("rel", "external");
  
  if( $(".body .botones").length > 0 ){
		$(".body .botones .flotar_l").each( function(){ if( !$(this).hasClass("bt_gris_gadient") ) $(this).html("")  });
		$(".body .botones .flotar_r").each( function(){ if( !$(this).hasClass("bt_gris_gadient") ) $(this).html("")  });
		$(".body .botones").hide();
		$("body").append( '<div class="botones8">' + $(".body .botones").html() + '</div>' );
		in_simple_page = true;
  }
	
	
	/* Contents title MODULO */	
	if(typeof(portada_html) != "undefined" ){

		var htmls_v1 = '';
		htmls_v1 += '<div class="header_col_izq" style="height: 52px;">';
		htmls_v1 += '	<!--ICONO--><div class="icono"></div>';
		htmls_v1 += '	 <!--TEXTO--><div class="texto" style="margin-top: 12px;">M&Oacute;DULO DESCRIPTIVO</div>';
		htmls_v1 += '</div>';
		
		var htmls_v2 = '';
		htmls_v2 += '<div class="header_col_izq" style="height: 52px;">';
		htmls_v2 += '	<!--ICONO--><div class="icono"></div>';
		htmls_v2 += '	 <!--TEXTO--><div class="texto" style="margin-top: 12px;">M&Oacute;DULO OPERATIVO</div>';
		htmls_v2 += '</div>';
		
		//APPEND
		$('.col_izq').prepend(htmls_v1);
		
		//APPEND
		$('.item').each(function(){
			//alert($(this).text());
			var acad = $(this).text();
			if(/TESTS DE CONSOLI/.test(acad)){
				$(this).after(htmls_v2);
			}
			
		});
		
	}
	
	
	/* PORTADA DE UNIDAD Y PAGINA */
	if( ( typeof(unidad_html) != "undefined" ) || ( typeof(pagina_html) != "undefined" ) ){
		var bread_i = 0;
		$('.camino_migas a').each(function(){
			bread_i++;
			if(bread_i == 2){
				var acad = $(this).html();
				if(/OPERATIVO/.test(acad) || (acad.toLowerCase().indexOf('<op>') != -1)){
					$('.titulo_principal2').text('').append('M&Oacute;DULO OPERATIVO');
				}else{
					$('.titulo_principal2').text('').append('M&Oacute;DULO DESCRIPTIVO');
				}
			}
		});
	}
	
	
	$('.camino_migas .texto span a').each(function(){
		var txt		= $(this).html();
		txt 		= txt.split('<op>').join('').split('</op>').join('').split('<op/>').join('').split('<OP>').join('').split('</OP>').join('').split('<OP/>').join('');
		var txtLength	= txt.length;
		if(txtLength > 38) {
			txt		= txt.substring(0, 38);
			lastWord= txt.lastIndexOf(' ');
			if(lastWord != -1){ txt	= txt.substring(0, lastWord); }
			txt += '...'; 
			$(this).html(txt);
		}
	});

  $('.item_doc').mouseover(function(){
		$(this).find('.icono_flechita').height($(this).find('.texto').height()+10+'px');
  });
$('.open_activity').click(function(){
		var id_activity = $(this).attr('id_activity');
		if(!$('#'+id_activity).is(':visible')){
			if($('#'+id_activity).attr('src') == ''){
				$('#'+id_activity).attr('src', id_activity+'.html');
				$('#'+id_activity).show();
			}
			$('#'+id_activity).show();
			$('#contenido_'+id_activity).show();
		}else{
			$('#'+id_activity).hide();
			$('#contenido_'+id_activity).hide();
		}
});
$('.open_activity').trigger('click');

$cuaderno_digital = $('#nro_3').html();
resizeFooter();
loadWYSWYG($('.cuaderno-digital'));
alinearFelchitasVertical();
//$('.menu').hide();
$('.col_izq_unidad.caso_practico').show();
$('.menu').css('top','0px').css('left','0px');

//$('.col_izq_unidad.caso_practico').css('margin-left', -334+$('.bar_left').width()+'px');//POSICIONAR MENU IZQUIERDO
$(window).resize(function(){
	resizeFooter();
	alinearFelchitasVertical();
	//$('.col_izq_unidad.caso_practico').css('margin-left', -334+$('.bar_left').width()+'px');//POSICIONAR MENU IZQUIERDO
	position = false;
	$('#contenedor_menu_herramientas').hide();
});

//CONTROL MENU IZQUIERDO
//$('.menu').hide();


/*Ajuste contenido central*/
var altura_menu = $('.menu').height();
var altura_contenido_central = $('.content_col_central').height();
$('.bar-line-1').height(altura_menu+'px');
if(altura_contenido_central < altura_menu){
	//$('.content_col_central').css('min-height',altura_menu+'px');
	$('.content_col_central .botones').css('margin-top',(altura_menu-50)+'px');
}


$('.boton').click(function(){
	if($('.menu').is(':visible')){
		$('.menu').hide("slide", { direction: "left" }, 500,function(){
			$('.bar-line-1').show();
		});
		$('.boton').animate({left: "1px"}, 500 );
	}else{
		$('.bar-line-1').hide();
		$('.menu').show("slide", { direction: "left" }, 500);
		$('.boton').animate({left: "336px"}, 500 );
	}
	//if(!position){$('.col_izq_unidad').animate({marginLeft: $('.bar_left').width()-2+'px'}, 500); position = true}
	//else{ $('.col_izq_unidad').animate({marginLeft: -334+$('.bar_left').width()+'px'}, 500) ; position = false}
});
readBtBuscar();
$('.menu_superior .item').mouseover(function(){
	$('.tooltip').show();
	$('.tooltip').css('width', $(this).attr('width')+'px');
	$('.tooltip').css('top', $(this).offset().top+25+'px');
	$('.tooltip').css('left', $(this).offset().left-$('.tooltip').width()+20+'px');
	$('.tooltip .content_tootltip').text($(this).attr('titulo'));
	$('.tooltip').css('left', $(this).offset().right-parseInt($(this).attr('width'))+20+'px');

});
$('.menu_superior .item').mouseout(function(){
	$('.tooltip').hide();
});
								
	$('.item.content_false .contenido .icono_open').click(function(){
		icono_open = true;																   
		if(!$('#sub'+$(this).attr('id')).is(':visible')){	
			$('#sub'+$(this).attr('id')).slideToggle();
			$(this).parent().parent().addClass('open gris');
		}else{
			$('#sub'+$(this).attr('id')).slideUp();
			if(!$('#sub'+$(this).attr('id')+ ' .active').length) $(this).parent().parent().removeClass('gris');
			$(this).parent().parent().removeClass('open');
		}
	});
	$('.item.content_true .contenido .icono_open').click(function(){
		icono_open = true;
		if(!$('#sub'+$(this).attr('id')).is(':visible')){
			$('#sub'+$(this).attr('id')).slideToggle();
			$(this).parent().parent().addClass('open');
		}else{
			$('#sub'+$(this).attr('id')).slideUp();
			$(this).parent().parent().removeClass('open');
		}
	});

	$('.content_true').click(function(){
		if(!icono_open){
			$div_click = $(this).text();
			$(this).addClass('active');
			$('.item').each(function(){
				if($div_click != $(this).text()){
					$(this).removeClass('active');
					$(this).removeClass('gris');
					$(this).removeClass('open');	
				}
			});
			closeOtherSubmenu('sub'+$(this).find('.icono_open').attr('id'));
		}
		icono_open = false;
	});
	$('.content_false').click(function(){
		if(!icono_open){
			$('.item').removeClass('active');
			$('.item').removeClass('gris');
			$('.item').removeClass('open');
			if(!$('#sub'+$(this).find('.icono_open').attr('id')).is(':visible')){
				closeOtherSubmenu('sub'+$(this).find('.icono_open').attr('id'));
				$(this).addClass('gris');
				$('#sub'+$(this).find('.icono_open').attr('id')).slideToggle();
				$(this).addClass('open');
				$(this).next().find('.item').first().addClass('active');
			}else{
				$(this).addClass('gris');
				$('#sub'+$(this).find('.icono_open').attr('id')).slideUp();
				$(this).removeClass('open');
			}
		}
		icono_open = false;
	});	
	$('.sub_menu .item').click(function(){
		$('.sub_menu .item').removeClass('active');
		$(this).addClass('active');
/**/	$(this).parent().prev().removeClass('active');
		var texto_actual = $(this).parent().prev().text();
		var texto_this = $(this).text();
		closeOtherSubmenu('sub'+$(this).parent().prev().find('.icono_open').attr('id'));
		$('.item').each(function(){
			if(texto_actual != $(this).text() && texto_this != $(this).text()){
				$(this).removeClass('open');
				$(this).removeClass('active');
			}
		});
	});
	/*MENU LATERAL DERECHO*/
	$('.colapse_menu').click(function(){
		mostrarMenuDerecho();
	});
	
	$('.menu_herramientas .bt').click(function(e){
		if( $(this).find('.titulo').text() == 'Glosario' ){
			verGlosario();
		}else{
		   if(colapse_col_central){
			   if(!$(this).next().next().is(':visible')){
				   $('.menu_herramientas .bt').next().next().each(function(){
						if($(this).is(':visible')){
							$(this).slideUp();
						}
				  });
			   }
				$_this = $(this).next().next();
				if(($_this).is(':visible') && $(this).find('.bt_2').length > 0){
					$('#glossary').text("");
				}else if($(this).find('.bt_2').length > 0){
					$('#glossary').text("");
					$('#glossary').html($('#_content_glosario').html());
					eventsGlosario();
				}
				$_this.slideToggle();
				
				
		   }else{
			   $('#contenedor_menu_herramientas').css('height','auto');
					var x = $(this).offset().left - $('#contenedor_menu_herramientas').width() - 20;
					var y = $(this).offset().top;
					if(!$(this).find('.bt_2').length > 0)mostrarToolTip( x,y,$(this).find('.titulo').text(), $(this).next().next().html() );
					if($(this).find('.bt_1').length > 0) readBtBuscar();
					if($(this).find('.bt_2').length > 0){
						mostrarToolTip( x,y,$(this).find('.titulo').text(), $('#_content_glosario').html() );
						$('#contenedor_menu_herramientas').css('height','230px');
					}
					eventsGlosario();
		   }
		   $('.item_doc').mouseover(function(){
				$(this).find('.icono_flechita').height($(this).find('.texto').height()+10+'px');
		   });
	   
	   }
	});
	
	
	$('.content_col_central div').each(function(){
		tamanios_fuentes.push(parseInt($(this).css('font-size')));
	});
	
	//imagenes sin SRC
	$('IMG').each(function(){
		if( $(this).attr('src') == '100'){
			$(this).remove();
		}
	});
	
	//excepcion bt imprimir	en test de unidad
	if(/Test de la Unidad/.test( $('.barra_azul .texto .titulo_principal').text() )){
		$('.item.print').css('visibility','hidden');
	}
	
	//ADAPTACION SCORM
	if( $('.contenido iframe').length <= 0 && $('#iframe_exercise').length <= 0){
		pipwerks.SCORM.init();
		if( pipwerks.SCORM.API.isFound ){
			$.cookie("apiscorm", "true", { expires: 1 });
			intoLMS();
			setTimeout( intoLMS(), 250 );
		}
	}
	
});

//ADAPTACION SCORM
function intoLMS(){ 
	$('.bt_entrar').remove();
	$('.content .item').removeAttr('onclick');
	$('.camino_migas a').attr('href','javascript:void(0)');
	$('.menu .item').removeAttr('onclick');
	$('.menu .item .texto').removeAttr('onclick');
	$('.botones8').remove();
	$('.bt_next').remove();
	$('.bt_next').remove();
}

function eventsGlosario(){
	/*MOSTRAR CONCEPTO GLOSARIO*/
	$('.lista_glosario li').click(function(){
		$('.lista_glosario li').removeClass('open');
		if($(this).next().is(':visible')){
			$(this).removeClass('open');
		}else{
			$(this).addClass('open');
		}
		if(!$(this).next().is(':visible')){
			$('.lista_glosario .concepto').each(function(){
				if($(this).is(':visible')){
					$(this).slideUp();
					$(this).prev().removeClass('open');
				}
			});
		}
		$(this).next().slideToggle();
	});
	
	$('.lista_glosario li').mouseover(function(){
		$(this).next().addClass('active');
	});
	$('.lista_glosario li').mouseout(function(){
		$(this).next().removeClass('active');
	});
	$('.lista_glosario .concepto').mouseover(function(){
		$(this).prev().addClass('active');
	});
	$('.lista_glosario .concepto').mouseout(function(){
		$(this).prev().removeClass('active');
	});
}
function resizeFooter(){
	var height_footer = $(window).height()-parseInt($('.content').height())+$('.footer').height();
	if (height_footer <= 96) height_footer = 96;
	//$('.footer').height( height_footer+'px' );
}
function readBtBuscar(){
	$('#buscar').click(function(){
		if($('.buscador').val() != ''){
			$('span').removeClass("highlight");
			$('.content_col_central').removeHighlight().highlight($('.buscador').val());
		}
	});
	$('#reset').click(function(){
	  $('span').removeClass("highlight");
	});
}

function mostrarToolTip( x,y, titulo,text ){
		if($('#contenedor_menu_herramientas .cabecera').text() == titulo){
			$('#contenedor_menu_herramientas .cabecera').text("");
			$('#contenedor_menu_herramientas').hide();

		}else{
			$('#contenedor_menu_herramientas').show();
			$('#contenedor_menu_herramientas .cabecera').html(titulo+'<div class="closeme"></div>');
			$('#contenedor_menu_herramientas .contenido').html(text);
			document.getElementById('contenedor_menu_herramientas').style.top = y+'px';
			document.getElementById('contenedor_menu_herramientas').style.left = x+'px';
			$('.closeme').click(function(){
				mostrarToolTip( x,y, titulo,text);
			});
		}
	}
function mostrarMenuDerecho(){
	if(!colapse_col_central){
		$('#contenedor_menu_herramientas').hide()
		$('.menu_herramientas').animate({width:'265px'},{duration:200,
			complete: function(){
					$('.menu_herramientas .bt').animate({width:'248px'}, 200);
					$('.menu_herramientas .bt .titulo').show();
					colapse_col_central = true;
					
					//ejecutar resizeiframe
					try{
						resizeIframeSingle();
					}catch(e){}
			}
		});
	}else{
		if($('.content_menu').is(':visible')){
			$('.content_menu').animate({height:'0px'},{duration:200,
				complete: function(){
					$(this).hide();
					colapseMenuDerecho(); 
					
					//ejecutar resizeiframe
					try{
						//resizeIframeSingle();
					}catch(e){}
				}
			});
			}else{
				colapseMenuDerecho();
				
					//ejecutar resizeiframe
					try{
						//resizeIframeSingle();
					}catch(e){}
			}
	}
}


//ALINEACION DE FLECHITAS EN MENU IZQUIERDO
function alinearFelchitasVertical(){
  $('.icono_open').each(function(){
	$(this).css('margin-top', ($(this).parent().height()/2) - ($(this).height()/2) - 2+ 'px');
  });
}

function colapseMenuDerecho(){
	$('.menu_herramientas .bt .titulo').hide();
	$('.menu_herramientas .bt').animate({width:'41px'},{duration:200,
			complete: function(){
				$('.menu_herramientas').animate({width:'60px'}, 200);
					colapse_col_central = false;
					try{
						resizeIframeSingle();
					}catch(e){ }
			}
	});
}


function closeOtherSubmenu(id){
	$('.sub_menu').each(function(){
		if($(this).attr('id') != id && $(this).is(':visible')){
			$(this).slideUp();
		}
	});
}

function resizeIframeSingle(){
	var miIframe = "";
	miIframe = document.getElementById("iframe_exercise");
	var alturaPagina = 0;
	
	var navegador = testNavegator();
	var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
	var is_firefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
	
	try{
		alturaPagina=miIframe.contentWindow.document.body.scrollHeight+20;
		
		if( navegador == 'chrome' ){
			alturaPagina=miIframe.contentDocument.documentElement.scrollHeight+10;
		}
		
		if( navegador == 'firefox' ){
			alturaPagina=miIframe.contentWindow.document.body.scrollHeight+10;
		}

		miIframe.style.height=alturaPagina+'px';
		$('.botones').css('margin-top','60px');
	}catch(e){
		//console.log(e);
		//console.log( window.location.href );
				
		function receiveMessage(event)
		{
			console.log(event);

			alturaPagina = parseInt(event.data);
			
			if( navegador == 'chrome' ){
				alturaPagina=parseInt(event.data)+10;
			}
			
			if( navegador == 'firefox' ){
				alturaPagina=parseInt(event.data)+10;
			}

			miIframe.style.height = alturaPagina+'px';
			$('.botones').css('margin-top','60px');
		}
		window.addEventListener("message", receiveMessage, false);
	}
}

function resizeIframe( id ){
	miIframe = document.getElementById(id);
	try{

	$('#'+id).width('100%');
	$('#'+id).css({'border':'none', 'background':'#e9f0fa'});
	$('.exercise-bar').css({'background':'#e9f0fa'});
  	var alturaPagina = 0;
  	var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
  	if( is_chrome ){
   		alturaPagina=miIframe.contentDocument.documentElement.scrollHeight;
  	}else{
    	alturaPagina=miIframe.contentWindow.document.body.scrollHeight;
  	}
	alturaPagina = alturaPagina+((alturaPagina * 8) /100);
  	miIframe.style.height=alturaPagina;
	$('#contenido_'+id).height(alturaPagina+'px');
	$('#'+id).height(alturaPagina+'px');
	}catch(e){
		//console.log(e);
		//console.log( window.location.href );
	var navegador = testNavegator();
	var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
	var is_firefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
				
		function receiveMessage(event)
		{
			console.log(event);

			alturaPagina = parseInt(event.data);
			
			if( navegador == 'chrome' ){
				alturaPagina=parseInt(event.data)+10;
			}
			
			if( navegador == 'firefox' ){
				alturaPagina=parseInt(event.data)+10;
			}


		  	miIframe.style.height=alturaPagina;
			$('#contenido_'+id).height(alturaPagina+'px');
			$('#'+id).height(alturaPagina+'px');

		}
		window.addEventListener("message", receiveMessage, false);
	}
}
  
  
  

	function openDialog(archivo, w, h, titulo, clase){
		$('#content_popup').remove();
		$('body').append('<div id="content_popup"><div id="popup" class="popup"><div class="cabecera '+clase+'"><div class="titulo"></div><div class="close"></div></div><div><iframe src="'+archivo+'.html" class="content" id="content"></iframe></div></div></div>');
			w = parseInt(w);
			h = parseInt(h);
			$('.popup').hide();
			$('.popup').css('width', w);
			$('.popup').css('height', h);
			var left = (($(window).width()/2) - ($('.popup').width()/2)+'px');
			var top = (($(window).height()/2) - ($('.popup').height()/2)+'px');
			$('.popup .cabecera .titulo').text(titulo);
			//$('#content').load(archivo+'.html');
			$('.popup').show();
			$('.popup .content').css('height', (h-47));
			$('.popup .content').css('width', (w-4));
			$('.popup .cabecera').css('width', w);
			$('.popup').css('top', top);
			$('.popup').css('left', left);
			$('.close').click(function(){
				$('#content_popup').hide();
			});
		}
		
function getFileNameFromURI()
		{
			var loc = window.location;
			var start = loc.pathname.lastIndexOf('/') + 1;
			var end = loc.pathname.lastIndexOf('.');
			
    		var fileName = loc.pathname.substring(start, end);
			
			return fileName;
	
		}
		
function cookieList() 
		{
		
			return {
				"add": function(key, val) {
					//Add to cookie
					$.cookie(key, val);
				},
				"clear": function(key) {
					//clear the cookie.
					$.cookie(key, null);
				},
				"get": function(key) {
					//Get all the items.
					return $.cookie(key);
				}
			}
		};		
 function loadWYSWYG($target)
		  {
			  
			//Carga de apuntes desde cookie
			if (cookie.get(getFileNameFromURI()+'-apuntes') != null)
			{
				$(".input-textarea.editable", $target).val(cookie.get(getFileNameFromURI()+'-apuntes'));
				$(".visualizacion .texto", $target).html(cookie.get(getFileNameFromURI()+'-apuntes')).append('');
			}
			
			
			$('.highlight-editar-apunte', $target).click(function(){
				$(".input-textarea.editable", $target).val(cookie.get(getFileNameFromURI()+'-apuntes')).htmlarea('updateHtmlArea');									 
				$(".visualizacion", $target).hide();
				$(".edicion", $target).show();
			});
			
			
			// Plugin de WYSWYG
			if ($('.input-textarea.editable', $target).length>0)
			{
				 $(".input-textarea.editable", $target).htmlarea({
						// Override/Specify the Toolbar buttons to show
						toolbar: [
							["bold", "|", "italic", "|", "underline", "|", "increasefontsize", "|", "decreasefontsize", "|", "forecolor", "|", "link", "|", "unlink"]                
						],
						css: "../core/css/jHtmlArea.Editor.css",
						toolbarText: $.extend({}, jHtmlArea.defaultOptions.toolbarText, {
							"bold": "Negrita",
							"italic": "Cursiva",
							"increasefontsize": "Aumentar tama&ntilde;o de tipograf&iacute;a",
							"decreasefontsize": "Disminuir tama&ntilde;o de tipograf&iacute;a",
							"underline": "Subrayado",
							"forecolor": "Color de fuente"
						})
					});
				
					
					//Comportamiento de SAVE
					$(".bt-save", $target).click(function()
					{
						//Contenido
						var content = $(".input-textarea.editable", $target).htmlarea('toHtmlString');
						
						//Validaciones
						content = $.trim(content.replace(/&nbsp;/gi, " "));
						
						//Comprobamos
						if (content.length!=false && content != '<br>')
						{
							//Guardamos en cookie los apuntes para modo OFFLINE
							cookie.add(getFileNameFromURI()+'-apuntes', content);
							
							$(".input-textarea.editable", $target).val(content).htmlarea('updateHtmlArea');
							$(".input-textarea.editable", '.modulo-lateral-preview').val(content).htmlarea('updateHtmlArea');
						
							//Asignamos contenido
							$(".visualizacion .texto").html(content);
						}
						else
						{
							//Asignamos contenido
							$(".visualizacion .texto").html('<em style="font-size: 0.9em; text-align: center;">A&uacute;n no has ingresado texto.</em>');
						}
						
						//Ocultamos modo de edición y volvemos a mostrar el modo visualización
						$(".visualizacion .texto", $target).parent().show();
						$(".edicion", $target).hide();
						
						//Frenamos burbuja
						return false;
					});
					
					//Comportamiento de DELETE
					$(".bt-delete", $target).click(function()
					{
						//
						$(".input-textarea.editable", $target).val('').htmlarea('updateHtmlArea');
						$(".input-textarea.editable", '.modulo-lateral-preview').val('').htmlarea('updateHtmlArea');
						
						//Borramos de cookie los apuntes para modo OFFLINE
						cookie.clear(getFileNameFromURI()+'-apuntes');
						
						//Feedback
						$(".feedback", $target).text('Borrado').delay(500).slideUp(500, function(){$(".feedback", $target).text('').slideDown()});
						
						//Frenamos burbuja
						return false;
					});
				
				}  
		  };		

/*MULTIMEDIA*/
jQuery(function() {
    if ($(".quickview-thumbs").length) $(".quickview-thumbs").quickview();
	$('.flotar').click(function(){
		$('.ui-icon-closethick').click(function(){
			$('.ui-dialog-content object').each(function(){
				$(this).remove();
			});
		});
	});
	 	   //Ventana de preview 	
		   var preview = $('<div class="modulo-lateral-preview" />');	
		   preview.append('<div class="top1" />');
		   preview.append('<div class="contenido"><div class="wyswyg">'+$('.contenido', '.modulo-lateral.cuaderno-digital').html()+'</div><div class="otros" /></div>');
		   $('.contenido-central').append(preview);

		  //Aumento de tamaño de tipografía
		  $('.a_mas').click(function(){
			   if(parseInt($('.content_col_central').css('font-size')) < 20){
				   font_size--;
				   $('.content_col_central').css('font-size', parseInt($('.content_col_central').css('font-size'))+1+'px');
				    $('.content_col_central div').each(function(){
						$(this).css('font-size', parseInt($(this).css('font-size'))+1+'px');
				    });
					$('.bt_prev').find('.bt_gris_gadient').next().css('font-size','14px');
				   $('.bt_next').find('.bt_gris_gadient').next().css('font-size','14px');
				   
				   var entrada_segura = true;
				   //llamar a tamaños MAS dentro del iframe
				   try{
						document.getElementById('iframe_exercise').contentWindow.a_mas_iframe(); 
						entrada_segura = false;
				   }catch(e){}
				   
				    //llamar a tamaños MAS dentro del iframe cuando hay mas de una actividad
					if(entrada_segura){
						try{
							$('iframe').each(function(){
								document.getElementById($(this).attr('id')).contentWindow.a_mas_iframe(); 
							});
						}catch(e){}
					}
			   }
		  });
		  
		  //Disminución de tamaño de tipografía
		  $('.a_menos').click(function(){					   
			   if(parseInt($('.content_col_central').css('font-size')) > 9){
				   font_size++;
				   $('.content_col_central').css('font-size', parseInt($('.content_col_central').css('font-size'))-1+'px');
				   $('.content_col_central div').each(function(){
						$(this).css('font-size', parseInt($(this).css('font-size'))-1+'px');
				    });
				   $('.bt_prev').find('.bt_gris_gadient').next().css('font-size','14px');
				   $('.bt_next').find('.bt_gris_gadient').next().css('font-size','14px');
				   
				   var entrada_segura = true;
				   //llamar a tamaños MENOS dentro del iframe
				   try{
						document.getElementById('iframe_exercise').contentWindow.a_menos_iframe(); 
						entrada_segura = false;
				   }catch(e){}
				   
				   //llamar a tamaños MENOS dentro del iframe cuando hay mas de una actividad
				   if(entrada_segura){
						try{
							$('iframe').each(function(){
								document.getElementById($(this).attr('id')).contentWindow.a_menos_iframe(); 
							});
						}catch(e){}
					}
			   }
		  });
		  
		  //Impresión
		  $('.print').click(function(){
			   //$('.libro-html').jqprint({ printContainer: false });
			   //$('.col_central').jqprint({ printContainer: false });
			   $(".col_central").jprintBookPrint();
		  }); 
		   //PDI
		  $('.pdi').click(function(){
				
				var entrada_segura = true;
				//llamar a tamaños PDI dentro del iframe			   
			   try{
					document.getElementById('iframe_exercise').contentWindow.pdi_iframe(); 
					entrada_segura = false;
			   }catch(e){}
			   
			   //llamar a tamaños PDI dentro del iframe cuando hay mas de una actividad
			   if(entrada_segura){
					try{
						$('iframe').each(function(){
							document.getElementById($(this).attr('id')).contentWindow.pdi_iframe(); 
						});
					}catch(e){}
				}
			   
			   if(!pdi){
				   colapseMenuDerecho();
				   if($('.menu').is(':visible')){ $('.boton').trigger('click'); } //replegar el sumario en caso que este desplegado
					//desplegar imgs del visor multimedia si no lo estan
					if($('.quickview .aumentar').is(':visible')){
						$('.quickview .aumentar').trigger('click');
					}
					// ocultar cabecera
					$('.header').hide();
					$('.menu_superior.pdi-activo').show();
					
				   var i = 0;
				   $('.content_col_central div').each(function(){
						if(tamanios_fuentes[i] != '0px' && tamanios_fuentes[i] != '0'){
							$(this).css('font-size', tamanios_fuentes[i]+6+'px');
						}
						i++;
					});
				   $('.content_col_central').css('font-size', '20px');
				   $('.bt_prev').find('.bt_gris_gadient').next().css('font-size','14px');
				   $('.bt_next').find('.bt_gris_gadient').next().css('font-size','14px');
				   pdi = true;
			   }else{
					// mostrar cabecera
					$('.menu_superior.pdi-activo').hide();
					$('.header').show();
					
				   var i = 0;
				   $('.content_col_central div').each(function(){
						if(tamanios_fuentes[i] != '0px' && tamanios_fuentes[i] != '0'){
							$(this).css('font-size', tamanios_fuentes[i]+'px');
						}
						i++;
					});
				   $('.content_col_central').css('font-size', '14px');
				   $('.bt_prev').find('.bt_gris_gadient').next().css('font-size','14px');
				   $('.bt_next').find('.bt_gris_gadient').next().css('font-size','14px');
				   pdi = false;
			   }
		  }); 
		  
		  
});


/* VER GLOSARIO */
function verGlosario(){
	//openDialog('elglosario', '825', '385', 'AVISO LEGAL');
	
	$('#content_popup').remove();
	var cont_glosario = $('#_content_glosario').html();
	$('body').append('<div id="content_popup"><div id="popup" class="popup"><div class="cabecera elglosario" style="background: #EC8B00;"><div class="titulo"></div><div class="close"></div></div><div style="border: 0px solid; width: 772px; height: 281px; overflow: auto; margin-left: 10px; margin-top: 10px; padding: 15px;">'+cont_glosario+'</div></div></div>');
	w = '825';
	h = '385';
	$('.popup').hide();
	$('.popup').css('width', w);
	$('.popup').css('height', h);
	var left = (($(window).width()/2) - ($('.popup').width()/2)+'px');
	var top = (($(window).height()/2) - ($('.popup').height()/2)+'px');
	$('.popup .cabecera .titulo').text('Glosario');
	$('.popup').show();
	$('.popup .content').css('height', (h-47));
	$('.popup .content').css('width', (w-4));
	$('.popup .cabecera').css('width', w);
	$('.popup').css('top', top);
	$('.popup').css('left', left);
	$('.close').click(function(){
		$('#content_popup').hide();
	});
	$('.content_glosario ul.lista_glosario .concepto').show();
}


function irABlank(_url){
  window.open(_url,'_blank');
}

function IrA(_url){
  window.open(_url,'_self');
}

//NAVEGADOR			
function testNavegator(){
	var userAgent_1 = navigator.userAgent.toLowerCase().indexOf('safari') > -1;
	var userAgent_2 = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
	var userAgent_3 = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
	if( userAgent_1 == true && userAgent_2 == true ){
		return 'chrome';
	}else if( userAgent_1 == true ){
		return 'safari';
	}else if( userAgent_3 == true ){
		return 'firefox';
	}else{
		return 'ie';
	}
	
}


/********* FIN DE ARCHIVO *********/