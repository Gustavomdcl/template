/*! Main v1.00.0 | (c) 2014, 2014 | */

// TAMANHO DA TELA ===================

var document_width = 960;
var window_width = $(window).width(); //Tamanho da tela
$(window).resize(function(){ window_width = $(window).width(); });

// MENU ==============================

var openMenu = false;

$('.icon-menu').click(function(){
	if(openMenu == false) {
		$(this).next('ul').css('display','block');
		$(this).parent('.l-container').parent('.m-menu').addClass('open-nav');
		openMenu = true;
	} else if(openMenu == true) {
		$(this).next('ul').css('display','none');
		$(this).parent('.l-container').parent('.m-menu').removeClass('open-nav');
		openMenu = false;
	}
});

// DROPDOWN ==========================

$('.nav li').mouseenter(function () {
	if(window_width>document_width){
		$(this).children('.nav').css('display','block');
	}
});

$('.nav li').mouseleave(function () {
	if(window_width>document_width){
		$(this).children('.nav').css('display','none');
	}
});

// RESIZE ============================

$(window).resize(function(){
	if(window_width>document_width){
		//Maior ====================================================================
		//Menu Dropdown
		$('.l-header-bottom .nav .nav').css('display', 'none');
		$('.icon-menu').next('ul').css('display','block');
	} else {
		//Menor ====================================================================
		//Menu Dropdown
		$('.l-header-bottom .nav .nav').css('display', 'block');
		//Menu Mobile
		$('.icon-menu').next('ul').css('display','none');
		$('.icon-menu').parent('.l-container').parent('.m-menu').removeClass('open-nav');
		openMenu = false;
	}
});