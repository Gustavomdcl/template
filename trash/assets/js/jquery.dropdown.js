/*! jQuery Dropdown v1.00.0 | (c) 2014, 2014 | */

$('.nav li').mouseenter(function () {
	if(tamanho_tela>1024){
		$(this).children('.nav').css('display','block');
	}
});

$('.nav li').mouseleave(function () {
	if(tamanho_tela>1024){
		$(this).children('.nav').css('display','none');
	}
});