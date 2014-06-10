/*! Main v1.00.0 | (c) 2014, 2014 | */

// DOCUMENT LOAD =====================
//$(window).load(function(){});

// DOCUMENT READY ====================
/** Declaração do Sistema **/
$(document).ready(function(){
		//Inicia a função atualizaSistema();
		atualizaSistema();
		//Inicia Mobile Resize
		MobileTextResize(0);
		//Inicia Infográfico
		if(window_width>document_width){
			infograficoSidebar(true);
		} else {
			infograficoSidebar(false);
		}
		//Inicia Scroll Magic
		scrollMagic();
		//Inicia Fancybox
		fancyBoxLoader();
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
$(document).scroll(function () {
	document_position = $(this).scrollTop();
});

// SCROLL MAGIC ===================

var isMobileOffset = 120;

function scrollMagic() {
	if(window_width>document_width){
		isMobileOffset = 120;
	} else {
		isMobileOffset = -1000000;
	}
	controller = new ScrollMagic();

	// build tween
	$('.m-text').each(function(e){
		var tween = TweenMax.from($(this), 0.5, {autoAlpha: 0, scale: 0.7,});
		// build scene
		var scene = new ScrollScene({triggerElement: $(this)})
						.setTween(tween)
						.addTo(controller);
		// show indicators (requires debug extension)
		scene.addIndicators();
	});

	$('.m-infografico-sidebar ul').each(function(e){
		var tween = TweenMax.fromTo($(this), 0.5, {height: 0}, {height: $(this).parent('.m-infografico-sidebar').parent('.m-bloco').height()});
		// build scene
		var scene = new ScrollScene({triggerElement: $(this), offset: isMobileOffset})
						.setTween(tween)
						.addTo(controller);
		// show indicators (requires debug extension)
		scene.addIndicators();
	});

	$('.m-infografico-inicio').each(function(e){
		var tween = TweenMax.from($(this), 0.5, {autoAlpha: 0});
		// build scene
		var scene = new ScrollScene({triggerElement: $(this)})
						.setTween(tween)
						.addTo(controller);
		// show indicators (requires debug extension)
		scene.addIndicators();
	});

	$('.m-infografico-final').each(function(e){
		if(window_width>document_width){
			var tween = TweenMax.from($(this), 0.5, {autoAlpha: 0});
			// build scene
			var scene = new ScrollScene({triggerElement: $(this)})
							.setTween(tween)
							.addTo(controller);
			// show indicators (requires debug extension)
			scene.addIndicators();
		} else {}
	});

	$('.m-infografico-change').each(function(e){
		var tween = TweenMax.from($(this), 0.5, {autoAlpha: 0});
		// build scene
		var scene = new ScrollScene({triggerElement: $(this)})
						.setTween(tween)
						.addTo(controller);
		// show indicators (requires debug extension)
		scene.addIndicators();
	});

	$('.m-infografico-sidebar ul li').each(function(e){
		if(window_width>document_width){
			var tween = TweenMax.from($(this), 0.25, {autoAlpha: 0, height: 0, width: 0});
			// build scene
			var scene = new ScrollScene({triggerElement: $(this).parent('ul'), offset: isMobileOffset})
							.setTween(tween)
							.addTo(controller);
			// show indicators (requires debug extension)
			scene.addIndicators();
		} else {}
	});
}

// MENU DESKTOP ======================

//Waypoints
$('.l-menu').waypoint('sticky');
$('.m-bloco').each(function(){
	$(this).waypoint(function(){
		if(window_width > document_width){
			var elementoClasse = $(this).attr('id').split(' ');
			$('.m-bloco.atual').removeClass('atual');
			$(this).addClass('atual');
			$('.l-menu .active').removeClass('active');
			$('.l-menu a[href=#' + elementoClasse[0] + ']').addClass('active');
			slideAtual=jQuery.inArray( elementoClasse[0], slideId );
			atualizaSistema();
		}
	});
});

//Clique no menu e Scroll
$('.l-menu a').click(function(e) {
	e.preventDefault();
	var sectionscroll = $(this).attr('href');
	if(window_width>document_width){
		$(sectionscroll).animatescroll({scrollSpeed:2000,easing:'easeInOutBack',padding:0});
	} else {
		if(sectionscroll){
			vai(jQuery.inArray( sectionscroll.substring(1, sectionscroll.length), slideId ));
		}
	}
});

// MENU MOBILE =======================

var openMenu = false;

$('.icon-menu').mousedown(function(){
	OpenCloseMenuMobile();
});

function OpenCloseMenuMobile(){
	if(openMenu == false) {
		$('.icon-menu').next('ul').css('display','block');
		$('.icon-menu').parent('.l-container').parent('.m-menu').addClass('open-nav');
		openMenu = true;
	} else if(openMenu == true) {
		$('.icon-menu').next('ul').css('display','none');
		$('.icon-menu').parent('.l-container').parent('.m-menu').removeClass('open-nav');
		openMenu = false;
	}
}

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

// TESTE CONHECIMENTOS ===============

$('.teste').each(function(){
	//Cada teste
	var questionCount = 1;
	var questionList = new Array();
	var completedQuestions = new Array();
	$(this).children('div').children('.questao').each(function(questionNumber){
		//Cada Questão do teste
		//Soma na variável de questões
		questionList.push({ 
			"question": $(this),
			"taken": false  
		});
		//Adiciona um número antes
		$(this).children('.pergunta').after( "<span class='number'>" + questionCount + "</span>" );
		questionCount ++;//Contador
		$(this).children('.value').each(function(){
			//Cada Value da Questão
			$(this).click(function(){
				//Muda o valor do taken
				questionList[questionNumber].taken = true;
				//Clique no value deixa ele active
				$(this).addClass('active').siblings().removeClass('active');
			});
		});
	});
	//Clique no enviar:
	$(this).children('.enviar').click(function(e){
		e.preventDefault();
		$.each(questionList, function(number, valor){//alert(number); alert(valor.question); alert(valor.taken);
			//Identifica se existem questões a serem preenchidas
			if(valor.taken == false){//Questão incompleta
				valor.question.effect( "shake", {}, 500 );
			} else {//Questão completa
				//Preenche as questões realizadas
				if($.inArray(number, completedQuestions) == -1){
					completedQuestions.push(number);
				}
			}
		});
		$.each(questionList, function(number, valor){//alert(number); alert(valor.question); alert(valor.taken);
			//Apresenta o resultado		
			if(completedQuestions.length == questionList.length) {
				//Se todas as questões foram preenchidas
				valor.question.children('.active').each(function(){
					//Para cada value com um active
					if($(this).data('valor').indexOf('c') > -1) {
						//Questão correta
						valor.question.children('.resposta').addClass('correta');
						valor.question.children('.resposta').fadeIn(400);
					} else {
						//Questão errada
						valor.question.children('.resposta').addClass('errada');
						valor.question.children('.resposta').fadeIn(400);
					}
				});
				valor.question.children('.value').each(function(){
					//Para cada value correto
					if($(this).data('valor').indexOf('c') > -1) {
						//Questão correta
						$(this).addClass('correto');
					} else {
						//Questão errada
					}
				});
			}
		});
	});
});

// MOBILE-TEXT =======================

function MobileTextResize(e){
	if(window_width<document_width){//mobile
		$('.m-text').each(function(){
			$(this).width(window_width-20);
			$(this).height(window_height-140);
		});
	} else {
		$('.m-text').each(function(){
			if($(this).parent('.l-container').parent('.m-bg').parent('.m-bloco').hasClass('saiba_mais') || $(this).parent('.l-container').parent('.m-bg').parent('.m-bloco').hasClass('teste_conhecimentos') || $(this).parent('.l-container').parent('.m-bg').parent('.m-bloco').hasClass('referencias_bibliograficas')) { } else {
			if($(this).hasClass('capa')) {
					$(this).width(document_width);
				} else {
					$(this).width(640);
				}
				$(this).height(460);
			}
		});
		if(e==1){
			if(document_position<544){
				$('.stuck').removeClass('stuck');
				$('.sticky-wrapper').height($('.l-menu').height());
			} else {
				$('.l-menu').addClass('stuck');
				$('.sticky-wrapper').height($('.l-menu').height());
			}
		}
	}
}

// FANCYBOX ==========================

function fancyBoxLoader() {
	$('.modal').fancybox({
	  helpers: {
	    overlay: {
	      locked: false
	    }
	  }
	});
	$("img").click(function() {
		if($(this).hasClass('no-fancybox')){} else{
			$.fancybox.open($(this).attr('src'),{
			  padding: 0,
			  helpers: {
			    overlay: {
			      locked: false
			    }
			  }
			});
		}
	});
}

// FLIPBOARD =========================

$('.flipboard li').mouseenter(function(){
	$(this).children('.cover').animate({
	    top: "-=200"
	  }, 500, function() {
	    // Animation complete.
	 });
});

$('.flipboard li').mouseleave(function(){
	$(this).children('.cover').animate({
	    top: "+=200"
	  }, 500, function() {
	    // Animation complete.
	 });
});



// INFOGRAFICO =======================

//Tamanho
function infograficoSidebar(e) {
	$('.m-infografico-sidebar').each(function(){
		if(e == true) {
			//alert($(this).parent('.m-bloco').attr('id') + ' height: ' + $(this).parent('.m-bloco').height());
			$(this).children('ul').height($(this).parent('.m-bloco').height());
		} else {
			$(this).children('ul').height(0);
		}
	});
}

//Botão
$('.button-infografico').click(function(){
	if($(this).next('.m-main-content').css('display')=='none') {
		$(this).next('.m-main-content').css('display','block');
		$('.stuck').css('z-index','100');
		$('.m-mobile-navigation').css('z-index','140');
	} else {
		$(this).next('.m-main-content').css('display','none');
		$('.stuck').css('z-index','1000');
		$('.m-mobile-navigation').css('z-index','120');
	}
});

// RESIZE ============================
var mobileResizeWay = false;
function resizeMaior(){
	//Maior ====================================================================
	//Menu Dropdown
	$('.l-menu .nav .nav').css('display', 'none');
	$('.icon-menu').next('ul').css('display','block');
	//Scroll Desktop
	$('#'+slideId[slideAtual]).animatescroll({scrollSpeed:1,easing:'easeInCubic',padding:0});
	//slideAtual=jQuery.inArray( elementoClasse[0], slideId );
	/*desktop_anchor_memory = $(document).scrollTop();
	if(desktop_anchor_memory!=0 && desktop_anchor!=0 && desktop_anchor!=desktop_anchor_memory){
		desktop_anchor = desktop_anchor_memory;
	}
	if(desktop_anchor!=0){
		$(document).scrollTop(desktop_anchor);
		desktop_anchor_memory = desktop_anchor;
	}
	desktop_anchor = $(document).scrollTop();*/
	//Infográfico
	infograficoSidebar(true);
	//resize
	if (mobileResizeWay == true) {
		mobileResizeWay = false;
		setTimeout(
			function() {
				$('.m-bloco').each(function(){
					$(this).waypoint('enable');
				});
			}
			//A função anterior ocorre no tempo de 0,8s (1000 = 1s)
			,1000
		);
	}
	//sanfona
	if(resizeSanfona == true) {
		refreshSanfona();
		resizeSanfona = false;
	}
	//aba
	if(resizeAba == true) {
		refreshAba();
		resizeAba = false;
	}
	//Scroll Magic
	isMobileOffset = 120;
}

function resizeMenor(){
	//Menor ====================================================================
	//Menu Dropdown
	$('.l-menu .nav .nav').css('display', 'block');
	//Menu Mobile
	$('.icon-menu').next('ul').css('display','none');
	$('.icon-menu').parent('.l-container').parent('.m-menu').removeClass('open-nav');
	openMenu = false;
	//Infográfico
	infograficoSidebar(false);
	//resize
	if (mobileResizeWay == false) {
		$('.m-bloco').each(function(){
			$(this).waypoint('disable');
		});
		mobileResizeWay = true;
	}
	//sanfona
	resizeSanfona = true;
	//aba
	resizeAba = true;
	//Scroll Magic
	isMobileOffset = -1000000;
}

// SANFONA ===========================
var icons = {
	header: "fa-chevron-circle-right",
	activeHeader: "fa-chevron-circle-down"
};

var resizeSanfona = false;

$('.sanfona').each(function(){
	$(this).accordion({
      icons: icons
    });
});

function refreshSanfona() {
	$( ".sanfona" ).each(function(){
		$(this).accordion( "refresh" );
	});
}

// Aba ===========================

var resizeAba = false;

$( ".aba" ).each(function(){
	$(this).tabs({ heightStyle: "auto" });
});

function refreshAba() {
	$( ".aba" ).each(function(){
		$(this).tabs( "refresh" );
	});
}

/************ DECLARE **************/
/**========== DECLARAÇÕES DE VARIÁVEIS ==========**/
/** Declaração das variáveis referentes à identificação dos slides **/
//Array slideId identificador numérico do slide
var slideId=[];
$('.m-bloco').each(function(){
	slideId.push($(this).attr('id'));
});
/** Declaração das variáveis referentes à navegação **/
//O slideAtual inicial é igual à 1
var slideAtual=0;
//Variável booleana para travar o teclado
var travaTeclado=false;
//Cria a variável contador de slides
var slideCount = slideId.length-1;
/**========== /DECLARAÇÕES DE VARIÁVEIS ==========**/

/**========== /INICIA APLICATIVO ==========**/

/**========== ATUALIZA SISTEMA ==========**/
/** Função atualizaSistema(); identifica qual é o slide atual e faz as devidas alterações **/
function atualizaSistema(){
	//Verifica se a variável slideAtual é igual à variável slideCount
	if (slideAtual==slideCount){
		//Deixa o elemento '.next' transparente
		$('.next').css({opacity:'0'});
		//Deixa o elemento '.next' com cursor default
		$('.next').css({cursor:'default'});
	}
	//Se a variável slideAtual não é igual à variável slideCount
	else{
		//Deixa o elemento '.next' opaco
		$('.next').css({opacity:'1'});
		//Deixa o elemento '.next' com cursor pointer
		$('.next').css({cursor:'pointer'});	
	}
	//Verifica se a variável slideAtual é igual à 1
	if (slideAtual==0){
		//Deixa o elemento '.prev' transparente
		$('.prev').css({opacity:'0'});
		//Deixa o elemento '.prev' com cursor default
		$('.prev').css({cursor:'default'});
	}
	//Se a variável slideAtual não é igual à 1
	else{
		//Deixa o elemento '.prev' opaco
		$('.prev').css({opacity:'1'});
		//Deixa o elemento '.prev' com cursor pointer
		$('.prev').css({cursor:'pointer'});	
	}
	if(window_width<document_width){ // MOBILE ONLY
		//Limpa os elementos filhos do elemento '#slideAtual' e importa o conteúdo da url slideUrl[0] na pasta tela
		$('.active').removeClass('active');
		$('.m-menu a[href=#' + slideId[slideAtual] + ']').addClass('active');
	}
}


/************ NAVEGAÇÃO TOTAL **************/
/**========== FUNÇÃO VAI ==========**/
/** A função vai(); leva o usuário até uma interface de acordo com o argumento novoSlide **/
function vai(novoSlide){
	if(window_width<document_width){ // MOBILE ONLY
		if (novoSlide != slideAtual) {
			//~>$.fancybox.close();
			OpenCloseMenuMobile();
			//Se a variável slideAtual não é 1
			//Move o elemento '#slide' para esquerda desaparecendo em 0.4 segundos
			//Coloca como conteúdo do elemento '#slide' o arquivo do valor da variável slideUrlId na pasta tela/
			$('#' + slideId[slideAtual]).removeClass("atual");
			//Atualiza variável slideAtual somando mais 1 
			slideAtual=novoSlide;
			//Atualiza Classe no novo
			$('#' + slideId[slideAtual]).addClass("atual");
			//Libero o teclado e os controladores para a próxima transição.
			travaTeclado=false;
			//Aciona função atualizaSistema();
			atualizaSistema();
			//sanfona
			refreshSanfona();
			//aba
			refreshAba();
		}
	}
}
/**========== /FUNÇÃO VAI ==========**/

/************ NAVEGAÇÃO LINEAR **************/
/**========== TECLA PRESSIONADA ==========**/
/** A função pressionaTecla verifica se a travaTeclado está ativa para evitar excesso de contagem de slides e transição sobre transição que pode ocasionar bugs, depois verifica qual a tecla pressionada para tratar a transição de slides, caso esteja disponível.**/
//Assim que a janela identificar que houve uma tecla pressionada inicia a função pressionaTecla();
window.onkeydown = pressionaTecla;
//Função pressionaTecla(); referente ao argumento 'e'
function pressionaTecla(e) {
	if(window_width<document_width){ // MOBILE ONLY
		//Se a variável travaTeclado é falsa
		if (travaTeclado==false) {
			//Se o a tecla pressionada da variável 'e' for refere ao número 39 -right- ou 40 -down- (http://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes), e também, o slideAtual é menor que a variável slideCount
			if ((e.keyCode==39 || e.keyCode==40) && slideAtual < slideCount) {
				//Variável travaTeclado torna-se verdadeira
				travaTeclado=true;
				//Inicia função avancaSlide();
				avancaSlide();
			} 
			//Se o a tecla pressionada da variável 'e' for refere ao número 37 -left- ou 38 -up- (http://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes), e também, a variável slideAtual for maior que 1 
			else if ((e.keyCode==37 || e.keyCode==38) && slideAtual > 0) {
				//Variável travaTeclado torna-se verdadeira
				travaTeclado=true;
				//Inicia função voltaSlide();
				voltaSlide();
			} 
		}
	}
}

/**========== /TECLA PRESSIONADA ==========**/
/**========== CONTROLADOR PRESSIONADO ==========**/
/** A função controlador é semelhante a função pressionaTecla, mas funciona com os links dos botões controladores. **/
//Função controlador(); referente ao argumento 'posicao'
function controlador(posicao) {
	if(window_width<document_width){ // MOBILE ONLY
		//Se a variável travaTeclado é falsa
		if (travaTeclado==false) {
			//Se o argumento posicao é 1 e o slideAtual é menor que a variável slideCount
			if (posicao=='avanca' && slideAtual < slideCount) {
				//Variável Trava Teclado torna-se verdadeira
				travaTeclado=true;
				//Inicia função avancaSlide();
				avancaSlide();
			}
			//Se o argumento posicao é 2 e a variável slideAtual é maior que 1
			else if (posicao=='volta' && slideAtual > 0) {
				//Variável Trava Teclado torna-se verdadeira
				travaTeclado=true;
				//Inicia função voltaSlide();
				voltaSlide();
			}
			//sanfona
			refreshSanfona();
			//aba
			refreshAba();
		}
	}
}

/**========== /CONTROLADOR PRESSIONADO ==========**/


/**========== AVANÇA SLIDE ==========**/

/**Esta função é chamada para fazer a transição de avanço. Ela faz o slide que está na tela desaparecer em direção a esquerda, então carrega o próximo slide e faz ele aparecer vindo da direção direita.**/
function avancaSlide(){
	if(window_width<document_width){ // MOBILE ONLY
		//~>$.fancybox.close();
		//Se a variável slideAtual não é 1
		//Move o elemento '#slide' para esquerda desaparecendo em 0.4 segundos
		//Coloca como conteúdo do elemento '#slide' o arquivo do valor da variável slideUrlId na pasta tela/
		$('#' + slideId[slideAtual]).removeClass("atual");
		//Atualiza variável slideAtual somando mais 1 
		slideAtual++;
		//Atualiza Classe no novo
		$('#' + slideId[slideAtual]).addClass("atual");
		//Libero o teclado e os controladores para a próxima transição.
		travaTeclado=false;
		//Aciona função atualizaSistema();
		atualizaSistema();
		//sanfona
		refreshSanfona();
		//aba
		refreshAba();
		//maps
		initializeMaps();
	}
}

/**========== /AVANÇA SLIDE ==========**/


/**========== VOLTA SLIDE ==========**/

/**Semelhante a função que avança, mas esta faz o caminho contrário.**/
function voltaSlide(){
	if(window_width<document_width){ // MOBILE ONLY
		//~>$.fancybox.close();
		//Move o elemento '#slide' para direita
		//Coloca como conteúdo do elemento '#slide' o arquivo do valor da variável slideUrlId na pasta tela/
		$('#' + slideId[slideAtual]).removeClass("atual");
		//Atualiza variável slideAtual diminui em 1 
		slideAtual--;
		//Atualiza Classe no novo
		$('#' + slideId[slideAtual]).addClass("atual");
		//Libero o teclado e os controladores para a próxima transição.
		travaTeclado=false;
		//Aciona função atualizaSistema();
		atualizaSistema();
		//sanfona
		refreshSanfona();
		//aba
		refreshAba();
		//maps
		initializeMaps();
	}
}

/**========== /VOLTA SLIDE ==========**/


/**========== SCROLL SETAS FIREFOX ==========**/	

/**Script para desativar scroll com setas no firefox (buga a navegação em baixa resolução se não tiver esse script)**/
//<![CDATA[
window.onload = function() {
	var temp = document.createElement('p');
	/*for(var i = 0; i < 100; i++) {
		document.body.appendChild( temp.cloneNode(true)  );
	}*/
	addEvent(document.body, 'keydown', keyDown);
	addEvent(window, 'keydown', keyDown);
}	
function addEvent(obj, evType, fn) {
	if(obj.addEventListener) {
		obj.addEventListener(evType, fn, false);
		return true;
	}
	else if(obj.attachEvent) {
		var r = obj.attachEvent("on"+evType, fn);
		return r;
	}
}	
function keyDown(e){
	var ev = e||event;
	var key = ev.which||ev.keyCode;
	var esc = 0;
	switch(key) {
		case 37: // left
		case 38: // up
		case 39: // right
		case 40: // down
		esc = 1;
	  	break;
	}
	if(esc && ev.preventDefault) {
		ev.preventDefault();
	}
	return esc;
}
// ]]>
//Fim do Script// JavaScript Document

/**========== /SCROLL SETAS FIREFOX ==========**/

