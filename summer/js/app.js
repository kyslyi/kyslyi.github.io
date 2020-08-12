$(document).ready(function(){

  let _window = $(window);
  let _document = $(document);

  function pageReady(){
  // вспомогательные скрипты, библиотеки
    legacySupport();
    imgToSvg();
    formSend();
    activeHeaderScroll();
  // инициализация библиотек
    initSliders();
    initPopups();
    initMasks();
    // initSelectric();
    initLazyPicture();
  // кастомные скрипты
    // burgerMenu();
    customMenu();
    scrollTop();
    sectionNavigation();
    customCountDown();
    customAccordion();
    customIframeYoutube();
    downloadProgram();
  }

  pageReady();

  function legacySupport(){
    svg4everybody();
  }

  function sectionNavigation() {
    _document
    .on('click', '[href="#"]', function(e) {
  		e.preventDefault();
  	})
    .on('click', 'a[href^="#section"]', function() {
      let el = $(this).attr('href');
      $('body, html').animate({
          scrollTop: $(el).offset().top}, 1000);
      return false;
    })
  }

  function customCountDown() {

    function addNull(array) {
      array.each(function(e){
        if ( Number($(this).text()) < 10 ) {
          let thisNumber = $(this).text();
          $(this).text('0' + thisNumber);
        }
      });
    }

    let second = 1000;
    let minute = second * 60;
    let hour = minute * 60;
    let day = hour * 24;

    let dots = '<div class="line"><div class="dots"></div></div>';
    let defaultDeg = -90;

    let countMinutes = 60;
    let countHours = 24;
    let countDays = 12 // произвольное

    let degMinutes = 360 / countMinutes;
    let degHours = 360 / countHours;
    let degDays = 360 / countDays;

    let circles = $('.count-down .wrapper-counts');
    let isDomRender = false;

    countDown();
    
    setInterval(countDown, 5000);
    

    function countDown() {

      let nextDate = new Date('Mar 31, 2020');
      let currentDate = new Date();
      let differenceTime = nextDate.getTime() - currentDate.getTime();

      let daysLeft = Math.floor(differenceTime / day);
      let hoursLeft = Math.floor((differenceTime % day) / hour);
      let minuteLeft = Math.floor((differenceTime % hour) / minute);

      circles.each(function(){

        let thisDeg = 0;
        let countDots = 0;
        let timeDots = 0;

        let defaultDegForCircles = defaultDeg;

        let dataCountDown = $(this).data('count-down');
        let thisWrapperLine = $(this).find('.wrapper-lines');

        if(dataCountDown == 'days') { countDots = countDays; thisDeg = degDays; timeDots = daysLeft; }
        if(dataCountDown == 'hours') { countDots = countHours; thisDeg = degHours; timeDots = hoursLeft; }
        if(dataCountDown == 'minutes') { countDots = countMinutes; thisDeg = degMinutes; timeDots = minuteLeft; }

        $(this).find('.count').text(timeDots);
        thisWrapperLine.find('.line .dots').css('background-color','#526c6d');
        
        for(let i = 1; i <= countDots; i++) {
          
          if(!isDomRender) { thisWrapperLine.append(dots); }
          thisWrapperLine.find('.line:nth-child(' + i + ')').css('transform', 'rotate(' + (defaultDegForCircles + thisDeg) + 'deg)');
          if(i <= timeDots) { thisWrapperLine.find('.line:nth-child(' + i + ') .dots').css('background-color','#00ffff'); }
          defaultDegForCircles = defaultDegForCircles + thisDeg;

        }

      });

      isDomRender = true;

      addNull($('.count-down .count'));
    }

  }

  function customAccordion() {

    // делаем первый элемент видимым
    $('.accordion.active .wrapper-content-accordion').show();

    $('.accordion').click(function(){

      if($(this).hasClass('active')) {
        $(this).removeClass('active');
        $(this).find('.wrapper-content-accordion').slideUp();
      } else {
        $('.accordion').removeClass('active');
        $('.accordion').find('.wrapper-content-accordion').slideUp();
        $(this).addClass('active');
        $(this).find('.wrapper-content-accordion').slideDown();
      }

    });


  }

  function customIframeYoutube() {

    let autoPlay = 'autoplay=1';
    let fullLink = $('.wrapper-video').data('link-video');
    let minLink = fullLink.slice(17, fullLink.length);

    $('.wrapper-video').click(function(){
      $(this).append('<iframe src="https://www.youtube.com/embed/' + minLink + '?' + autoPlay +'" frameborder="0" allowfullscreen></iframe>')
    });

  }

  function downloadProgram() {
    
  }

  function activeHeaderScroll(){

    let header = $('header.header');
    _window.on('scroll load', function(){
      if ( _window.scrollTop() >= 10 ) {
        header.addClass('active');
      } else {
        header.removeClass('active');
      }
    });

  }

  function initPopups(){

    // Magnific Popup
    let startWindowScroll = 0;
    $('.js-popup').magnificPopup({
      type: 'inline',
      fixedContentPos: true,
      fixedBgPos: true,
      overflowY: 'auto',
      closeBtnInside: true,
      preloader: false,
      midClick: true,
      removalDelay: 300,
      mainClass: 'popup-buble',
      callbacks: {
        beforeOpen: function() {
          startWindowScroll = _window.scrollTop();
        },
        close: function() {
          _window.scrollTop(startWindowScroll);
        }
      }
    });

    $('.js-popup-gallery').magnificPopup({
  		delegate: 'a',
  		type: 'image',
  		tLoading: 'Загрузка #%curr%...',
  		mainClass: 'popup-buble',
  		gallery: {
  			enabled: true,
  			navigateByImgClick: true,
  			preload: [0,1]
  		},
  		image: {
  			tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
  		}
    });
    
  }

  function closeMfp(){
    $.magnificPopup.close();
  }

  function initSliders(){

    new Swiper('.what-summer-breeze-slider', {
      navigation: {
        nextEl: '.what-summer-breeze-button-next',
        prevEl: '.what-summer-breeze-button-prev',
      },
      lazy: true,
      fadeEffect: {
        crossFade: true
      },
      slidesPerView: 3,
      spaceBetween: 27,
      breakpoints: {
        992: {
          slidesPerView: 2
        },
        768: {
          slidesPerView: 1
        }
      },
    });

    new Swiper('.summer-breeze-program-slider', {
      navigation: {
        nextEl: '.summer-breeze-program-next',
        prevEl: '.summer-breeze-program-prev',
      },
      lazy: true,
      slidesPerView: 2,
      spaceBetween: 20,
      breakpoints: {
        768: {
          slidesPerView: 1
        }
      },
    });

    new Swiper('.reviews-about-our-project-slider', {
      navigation: {
        nextEl: '.reviews-about-our-project-next',
        prevEl: '.reviews-about-our-project-prev',
      },
      lazy: true,
    });

  }

  function initMasks(){
    //$(".js-dateMask").mask("99.99.99",{placeholder:"ДД.ММ.ГГ"});
    $("input[type='tel']").mask("+7 (000) 000-0000");
  }

  function initSelectric(){
    $('select').selectric({
      maxHeight: 300,
      arrowButtonMarkup: '<b class="button"></b>',

      onInit: function(element, data){
        var $elm = $(element),
            $wrapper = $elm.closest('.' + data.classes.wrapper);

        $wrapper.find('.label').html($elm.attr('placeholder'));
      },
      onBeforeOpen: function(element, data){
        var $elm = $(element),
            $wrapper = $elm.closest('.' + data.classes.wrapper);

        $wrapper.find('.label').data('value', $wrapper.find('.label').html()).html($elm.attr('placeholder'));
      },
      onBeforeClose: function(element, data){
        var $elm = $(element),
            $wrapper = $elm.closest('.' + data.classes.wrapper);

        $wrapper.find('.label').html($wrapper.find('.label').data('value'));
      }
    });
  }

  function initLazyPicture() {
    $('.lazy').lazy({
      effect: 'fadeIn',
      effectTime: 200
    });
    // data-src
  }

  function imgToSvg(){
    $('img.svg').each(function(){
      var $img = $(this);
      var imgID = $img.attr('id');
      var imgClass = $img.attr('class');
      var imgURL = $img.attr('src');
    
      $.get(imgURL, function(data) {
          var $svg = $(data).find('svg');
          if(typeof imgID !== 'undefined') {
              $svg = $svg.attr('id', imgID);
          }
          if(typeof imgClass !== 'undefined') {
              $svg = $svg.attr('class', imgClass+' replaced-svg');
          }
          $svg = $svg.removeAttr('xmlns:a');
          if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
              $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
          }
          $img.replaceWith($svg);
      }, 'xml');
    });
  }

  function burgerMenu() {

    let burger = $('.burger');
    let menu = $('nav.nav-header .container > ul');

    $(document).mouseup(function(e) {

      if ( burger.is(e.target) || burger.has(e.target).length === 1 ) {
        if ( menu.hasClass('active') ) {
          menu.removeClass('active');
          burger.removeClass('active');
        } else {
          menu.addClass('active');
          burger.addClass('active');
        }
      } else if ( !menu.is(e.target) && menu.has(e.target).length === 0 && menu.hasClass('active') ) {
        menu.removeClass('active');
        burger.removeClass('active');
      }

    });

  }

  function scrollTop(){
    _window.scroll(function(){
      if ($(this).scrollTop() > 250) {
        $('#back-top').fadeIn(300);
      } else {
        $('#back-top').fadeOut(300);
      }
    });

    $('#back-top').click(function(){
      $("html, body").animate({ scrollTop: 0 }, 750);
      return false;
    });
  }

  function formSend(){
    document.addEventListener( 'wpcf7mailsent', function( event ) {
      let el = $('#modal-form-tnx');
      if (el.length) {
      $.magnificPopup.open({
          items: {
              src: el
          },
          type: 'inline',
          fixedContentPos: true,
          fixedBgPos: true,
          overflowY: 'auto',
          closeBtnInside: true,
          preloader: false,
          midClick: true,
          removalDelay: 300,
          mainClass: 'popup-buble',
      });
      }
    }, false );
  }

  function customMenu() {
    var navTrigger = document.getElementById('nav-trigger');
    var nav = document.getElementById('nav');
    var labels = document.getElementsByClassName('nav-label');
    navTrigger.addEventListener('click', navToggle);
    function navToggle(e) {
      var closed = (navTrigger.className.indexOf('close') > 0); 
      if(closed) {
        navTrigger.className = 'nav-trigger open';
        nav.className = 'out';
      } else {
        navTrigger.className = 'nav-trigger close';
        nav.className = 'in';
      }
    }

  }


  let heightToMap = $('section.section-map').offset().top;
  let windowHeight = _window.height();
  let isRenderMap = false
  
  _window.on('scroll load', function() {
    if(_window.scrollTop() + windowHeight >= heightToMap && !isRenderMap) {
      ymaps.ready(mapInit);
      isRenderMap = true;
    }
  });

  function mapInit(){
    let myMap = new ymaps.Map("map", {
      center: [44.186410, 38.925861],
      zoom: 14,
      controls: []
    });
    let customMarker = ymaps.templateLayoutFactory.createClass('<div class="map-label"></div>');
    let customPlacemark = new ymaps.Placemark([44.186410, 38.925861],
      {
        balloonContent: '1',
      },
      {
        iconLayout: customMarker,
      }
    );
    myMap.geoObjects.add(customPlacemark);
  }

});