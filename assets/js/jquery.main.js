/*! Main v1.00.0 | (c) 2014, 2014 | */

//Variáveis Globais
var tamanho_tela = $(window).width(); //Tamanho da tela

//1 INFOGRAFICO =======================

//1.1 Tamanho
if(tamanho_tela >= '768'){
	infograficoSidebar(true);
} else {
	infograficoSidebar(false);
}
function infograficoSidebar(e) {
	$('.m-infografico-sidebar').each(function(){
		if(e == true) {
			$(this).children('ul').height($(this).parent('.l-row').parent('.l-container').height());
		} else {
			$(this).children('ul').height(0);
		}
	});
}

//1.2 Botão
$('.button-infografico').click(function(){
	if($(this).next('.m-main-content').css('display')=='none') {
		$(this).next('.m-main-content').css('display','block');
	} else {
		$(this).next('.m-main-content').css('display','none');
	}
});

//2 MENU ==============================

//2.1 Waypoints
$('.l-header-bottom').waypoint('sticky');
$('.bloco').each(function(){
	$(this).waypoint(function(){
		if(tamanho_tela >= '768'){
			var elementoClasse = $(this).attr('class').split(' ');
			$('.bloco.atual').removeClass('atual');
			$(this).addClass('atual');
			$('.l-header-bottom .active').removeClass('active');
			$('.l-header-bottom a[href=#' + elementoClasse[0] + ']').addClass('active');
		}
	});
});

//2.2 Clique no menu e Scroll
$('.scrolltobtn').click(function(e) {
	e.preventDefault();
	var sectionscroll = $(this).attr('href');
	$(sectionscroll).animatescroll({scrollSpeed:2000,easing:'easeInOutBack',padding:0});
});

//2.2 Clique do botão Responsivo
$('.btn-menu').click(function(){
	var valor = $(this).attr('data-value');
	if(valor == 'false'){
		$('.l-header-bottom').css('height','100%');
		$('body').css('overflow','hidden');
		$(this).next('ul').css('display','block');
		$(this).attr('data-value','true');
	} else {
		$('.l-header-bottom').css('height','auto');
		$('body').css('overflow','auto');
		$(this).next('ul').css('display','none');
		$(this).attr('data-value','false');
	}
});

//2.3 Resize Responsivo
$(window).resize(function(){
	tamanho_tela = $(window).width();
	if(tamanho_tela >= '768'){
		infograficoSidebar(true);
		$('body').css('overflow','auto');
		$('.btn-menu').next('ul').css('display','block');
	} else {
		infograficoSidebar(false);
		$('.l-header-bottom').css('height','auto');
		$('body').css('overflow','auto');
		$('.btn-menu').next('ul').css('display','none');
		$('.btn-menu').attr('data-value','false');
	}
});