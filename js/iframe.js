// JavaScript Document

//FUNCIONES INVOCADAS DESDE FUERA DEL IFRAME
var font_size = 0;
var pdi = false;

//AUMENTAR TAMAÑO
function a_mas_iframe(){
	if( font_size < 4){
	   font_size++;
	   $('.central').css('font-size', parseInt($('.central').css('font-size'))+1+'px');
		changeFontSize( "", $('.central') );
   }
}

//DISMINUIR TAMAÑO
function a_menos_iframe(){
	if( font_size > -4 ){
	   font_size--;
	   $('.central').css('font-size', parseInt($('.central').css('font-size'))-1+'px');			   
	   changeFontSize( "", $('.central') );
	}
}

//AJUSTE PDI
function pdi_iframe(){
	if(!pdi){
	   changeFontSize( "pdi-on", $('.central') );
	   pdi = true;
	}else{
	   changeFontSize( "pdi-off", $('.central') );
	   pdi = false;
	}
}

//AJUSTE DE FUENTE
function changeFontSize( operation, $element ){
	$element.children().each(function(){
		if( $(this).css('font-size').length > 0 ){
			switch( operation ){
				case "pdi-on":
					$(this).css('font-size', (parseInt($(this).attr('default-font-size'))+6)+'px');
				break;
				case "pdi-off":
					$(this).css('font-size', (parseInt($(this).attr('default-font-size')) )+'px');
				break;
				default:
					$(this).css('font-size', (parseInt( $(this).attr('default-font-size') )+font_size)+'px');
				break;
			}
			if( $(this).children().length > 0 ){
				changeFontSize( operation, $(this) );
			}
		}
	});
	
	//AJUSTANDO IFRAME
	try{
		window.parent.resizeIframeSingle();
	}catch(e){ }
}

//SETEANDO VALORES ORIGINALES DE FUENTE
function setOriginalSize( $element ){
	$element.children().each(function(){
		if( $(this).css('font-size').length > 0 ){
			
			$(this).attr( "default-font-size", $(this).css('font-size') ); 
			
			if( $(this).children().length > 0 ){
				setOriginalSize( $(this) );
			}
		}
	});
}

/********* FIN DE ARCHIVO *********/