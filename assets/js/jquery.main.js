/*! Main v1.00.0 | (c) 2014, 2014 | */

// DOCUMENT LOAD =====================
$(window).load(function(){
	MobileTextResize(0);
});

// TAMANHO DA TELA ===================

var document_width = 960;
var window_width = $(window).width(); //Tamanho da tela
var window_height = $(window).height(); //Tamanho da tela
$(window).resize(function(){
	window_width = $(window).width();
	window_height = $(window).height();
	if(window_width>document_width){ resizeMaior(); } else { resizeMenor();	}
	//REZISE FUNCTIONS
	MobileTextResize(1);
});

// DOCUMENT SCROLL ===================
var document_position = $(document).scrollTop();
var desktop_anchor = $(document).scrollTop();
var desktop_anchor_memory = $(document).scrollTop();
$(document).scroll(function () {
	document_position = $(this).scrollTop();
});

// MENU DESKTOP ======================

//Waypoints
$('.l-menu').waypoint('sticky');
$('.m-bloco').each(function(){
	$(this).waypoint(function(){
		if(window_width > document_width + 1){
			var elementoClasse = $(this).attr('id').split(' ');
			$('.m-bloco.atual').removeClass('atual');
			$(this).addClass('atual');
			$('.l-menu .active').removeClass('active');
			$('.l-menu a[href=#' + elementoClasse[0] + ']').addClass('active');
		}
	});
});

//Clique no menu e Scroll
$('.l-menu a').click(function(e) {
	e.preventDefault();
	var sectionscroll = $(this).attr('href');
	$(sectionscroll).animatescroll({scrollSpeed:2000,easing:'easeInOutBack',padding:0});
});

// MENU MOBILE =======================

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

// MOBILE-TEXT =======================

function MobileTextResize(e){
	if(e==1){
		if(window_width<document_width){//mobile
			$('.m-text').each(function(){
				$(this).width(window_width-20);
				$(this).height(window_height-140);
			});
		} else {
			$('.m-text').each(function(){
				if($(this).hasClass('capa')) {
					$(this).width(document_width);
				} else {
					$(this).width(640);
				}
				$(this).height(460);
			});
			if(document_position<544){
				$('.stuck').removeClass('stuck');
			} else {
				$('.l-menu').addClass('stuck');
				$('.sticky-wrapper').height($('.l-menu').height());
			}
		}
	} else {
		if(window_width<document_width){//mobile
			$('.m-text').each(function(){
				$(this).width(window_width-20);
				$(this).height(window_height-140);
			});
		}
	}
}

// RESIZE ============================

function resizeMaior(){
	//Maior ====================================================================
	//Menu Dropdown
	$('.l-header-bottom .nav .nav').css('display', 'none');
	$('.icon-menu').next('ul').css('display','block');
	//Scroll Desktop
	desktop_anchor_memory = $(document).scrollTop();
	if(desktop_anchor_memory!=0 && desktop_anchor!=0 && desktop_anchor!=desktop_anchor_memory){
		desktop_anchor = desktop_anchor_memory;
	}
	if(desktop_anchor!=0){
		$(document).scrollTop(desktop_anchor);
		desktop_anchor_memory = desktop_anchor;
	}
	desktop_anchor = $(document).scrollTop();
}

function resizeMenor(){
	//Menor ====================================================================
	//Menu Dropdown
	$('.l-header-bottom .nav .nav').css('display', 'block');
	//Menu Mobile
	$('.icon-menu').next('ul').css('display','none');
	$('.icon-menu').parent('.l-container').parent('.m-menu').removeClass('open-nav');
	openMenu = false;
}