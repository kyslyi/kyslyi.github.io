$(document).ready(function(){

  //////////
  // Global variables
  //////////

  var _window = $(window);
  var _document = $(document);

  ////////////
  // READY - triggered when PJAX DONE
  ////////////
  function pageReady(){
    legacySupport();
    updateHeaderActiveClass();
    initHeaderScroll();

    initPopups();
    initSliders();
    initScrollMonitor();
    initMasks();
    // initSelectric();
    // custom
    jsAccordion();
    imgToSvg();
    inputFile();
    sortCity();
    // videoEvents(); 
    customTabs(); 
    scrollTop();
    checkBox();
    // formSend();
    // development helper
    _window.on('resize', debounce(setBreakpoint, 200))
    // AVAILABLE in _components folder
    // copy paste in main.js and initialize here
    // initPerfectScrollbar();
    // initLazyLoad();
    // initTeleport();
    // parseSvg();
    // revealFooter();
    // _window.on('resize', throttle(revealFooter, 100));
  }

  // this is a master function which should have all functionality
  pageReady();


  // some plugins work best with onload triggers
  _window.on('load', function(){
    // your functions
  })


  //////////
  // COMMON
  //////////

  function legacySupport(){
    // svg support for laggy browsers
    svg4everybody();

    // Viewport units buggyfill
    window.viewportUnitsBuggyfill.init({
      force: false,
      refreshDebounceWait: 150,
      appendToBody: true
    });
  }


  // Prevent # behavior
	_document
    .on('click', '[href="#"]', function(e) {
  		e.preventDefault();
  	})
    .on('click', 'a[href^="#section"]', function() { // section scroll
      var el = $(this).attr('href');
      $('body, html').animate({
          scrollTop: $(el).offset().top}, 1000);
      return false;
    })


  // HEADER SCROLL
  // add .header-static for .page or body
  // to disable sticky header
  function initHeaderScroll(){
    _window.on('scroll', throttle(function(e) {
      var vScroll = _window.scrollTop();
      var header = $('.header').not('.header--static');
      var headerHeight = header.height();
      var firstSection = _document.find('.page__content div:first-child()').height() - headerHeight;
      var visibleWhen = Math.round(_document.height() / _window.height()) >  2.5

      if (visibleWhen){
        if ( vScroll > headerHeight ){
          header.addClass('is-fixed');
        } else {
          header.removeClass('is-fixed');
        }
        if ( vScroll > firstSection ){
          header.addClass('is-fixed-visible');
        } else {
          header.removeClass('is-fixed-visible');
        }
      }
    }, 10));
  }


  // HAMBURGER TOGGLER
  _document.on('click', '.js-hamburger', function(){
    $(this).toggleClass('is-active');
    $('.mobile-navi').toggleClass('is-active');
  });

  function closeMobileMenu(){
    $('.js-hamburger').removeClass('is-active');
    $('.mobile-navi').removeClass('is-active');
  }

  // SET ACTIVE CLASS IN HEADER
  // * could be removed in production and server side rendering when header is inside barba-container
  function updateHeaderActiveClass(){
    $('.header__menu li').each(function(i,val){
      if ( $(val).find('a').attr('href') == window.location.pathname.split('/').pop() ){
        $(val).addClass('is-active');
      } else {
        $(val).removeClass('is-active')
      }
    });
  }

  //////////
  // SLIDERS
  //////////

  function initSliders(){

    // EXAMPLE SWIPER
    new Swiper('.cases-our-agents-slider', {
      navigation: {
        nextEl: '.cases-our-agents-button-next',
        prevEl: '.cases-our-agents-button-prev',
      },
      autoHeight: true,
    });

    new Swiper('.video-reviews-slider', {
      navigation: {
        nextEl: '.video-reviews-button-next',
        prevEl: '.video-reviews-button-prev',
      },
    });

  }

  $(window).resize(function(){
    initSliders();
  });

  function correctLine() {

    let list = $('.cases-our-agents ul');
    list.prepend('<div class="line"></div>');
    list.each(function(){

      let height = $(this).find('li:last-child').outerHeight() / 2;
      $(this).find('.line').height($(this).outerHeight() - height);

    });

  }

  function plashka() {

    if ($('.fixed-reg').length) {
      
      $('.fixed-reg button').click(function(){

        $(this).closest('.fixed-reg').find('.wrapper-form').slideToggle();

      });

    }

  }

  function fixedReg() {

    // _window.on('resize load', function() {

    //   // let winContainer = $('section.couch .container').width();
    //   // let widthWindow = _window.width();
    //   // let fixedReg = $('.fixed-reg');
    //   // let widthFixedReg = fixedReg.width();
    //   // let between = widthWindow / 2 - winContainer / 2 - widthFixedReg;
    //   // if( winContainer + widthFixedReg * 2 < widthWindow ) {
    //   //   fixedReg.css('right', between + 'px');
    //   // } else {
    //   //   fixedReg.css('right', '15px');
    //   // }
    //   // if (_window.width() > 768) {
    //   //   fixedReg.fadeIn();
    //   // } else {
    //   //   fixedReg.fadeOut();
    //   // }

    // });

    // let fixedReg = $('.fixed-reg');

    $('.fixed-reg button').click(function(){

      $(this).closest('.fixed-reg').toggleClass('active');

    });





  }

  fixedReg();
  correctLine();
  // plashka();

  //////////
  // MODALS
  //////////

  function initPopups(){
    // Magnific Popup
    var startWindowScroll = 0;
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
          // $('html').addClass('mfp-helper');
        },
        close: function() {
          // $('html').removeClass('mfp-helper');
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

  ////////////
  // UI
  ////////////

  // textarea autoExpand
  _document
    .one('focus.autoExpand', '.ui-group textarea', function(){
        var savedValue = this.value;
        this.value = '';
        this.baseScrollHeight = this.scrollHeight;
        this.value = savedValue;
    })
    .on('input.autoExpand', '.ui-group textarea', function(){
        var minRows = this.getAttribute('data-min-rows')|0, rows;
        this.rows = minRows;
        rows = Math.ceil((this.scrollHeight - this.baseScrollHeight) / 17);
        this.rows = minRows + rows;
    });

  // Masked input
  function initMasks(){
    $(".js-dateMask").mask("99.99.99",{placeholder:"ДД.ММ.ГГ"});
    $("input[type='tel']").mask("+7 (000) 000-0000");
  }

  // selectric
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

  ////////////
  // SCROLLMONITOR - WOW LIKE
  ////////////
  function initScrollMonitor(){
    $('.wow').each(function(i, el){

      var elWatcher = scrollMonitor.create( $(el) );

      var delay;
      if ( $(window).width() < 768 ){
        delay = 0
      } else {
        delay = $(el).data('animation-delay');
      }

      var animationClass = $(el).data('animation-class') || "wowFadeUp"

      var animationName = $(el).data('animation-name') || "wowFade"

      elWatcher.enterViewport(throttle(function() {
        $(el).addClass(animationClass);
        $(el).css({
          'animation-name': animationName,
          'animation-delay': delay,
          'visibility': 'visible'
        });
      }, 100, {
        'leading': true
      }));
      // elWatcher.exitViewport(throttle(function() {
      //   $(el).removeClass(animationClass);
      //   $(el).css({
      //     'animation-name': 'none',
      //     'animation-delay': 0,
      //     'visibility': 'hidden'
      //   });
      // }, 100));
    });

  }

  //////////
  // MEDIA Condition helper function
  //////////
  function mediaCondition(cond){
    var disabledBp;
    var conditionMedia = cond.substring(1);
    var conditionPosition = cond.substring(0, 1);

    if (conditionPosition === "<") {
      disabledBp = _window.width() < conditionMedia;
    } else if (conditionPosition === ">") {
      disabledBp = _window.width() > conditionMedia;
    }

    return disabledBp
  }

  //////////
  // DEVELOPMENT HELPER
  //////////
  function setBreakpoint(){
    var wHost = window.location.host.toLowerCase()
    var displayCondition = wHost.indexOf("localhost") >= 0 || wHost.indexOf("surge") >= 0
    if (displayCondition){
      var wWidth = _window.width();
      
      var content = "<div class='dev-bp-debug'>"+wWidth+"</div>";
      
      $('.page').append(content);
      setTimeout(function(){
        $('.dev-bp-debug').fadeOut();
      },1000);
      setTimeout(function(){
        $('.dev-bp-debug').remove();
      },1500)
    }
  }
  
  //////////
  // CUSTOM SCRIPTS

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

  function sortCity() {
    
    let list = $('.wrapper-list ul');

    list.each(function(){

      let arrListCity = [];

      // пушим в массив города конкретного списка
      for( let i = 1; i <= $(this).find('li').length; i++ ) {
        
        let city = $(this).find('li:nth-child('+ i +')').text();
        arrListCity.push(city);

      }

      // сортируем в алфавитном порядке
      arrListCity.sort();

      // перезаписывывам html разметку в сортированном виде
      for( let i = 1; i <= $(this).find('li').length; i++ ) {
        
        $(this).find('li:nth-child('+ i +')').text(arrListCity[i - 1]);

      }

    });

    // снимает прозрачность

    list.find('li').css('opacity', '1');


  }

  function playVideo() {
    
    $('.play').click(function(){

      let iframeVideo = $(this).closest('.wrapper-video').data('video');
      let wrapperVideo = $(this).closest('.wrapper-video');
      
      wrapperVideo.removeClass('non');
      wrapperVideo.find('img').fadeOut(400);

      wrapperVideo.append(iframeVideo);


    });

  }

  function customPlaceholder() {
    
    $('section.free-online-learning-footer .ui-group input, section.become-part-ocat-team .ui-group.text input, section.main-next .wrapper-input input, section.invest-yourself .ui-group.text input').focus(function(){

      $(this).closest('.ui-group, .wrapper-input').find('.placeholder').hide();

    });

    $('section.free-online-learning-footer .ui-group input, section.become-part-ocat-team .ui-group.text input, section.main-next .wrapper-input input, section.invest-yourself .ui-group.text input').blur(function(){

      $(this).closest('.ui-group, .wrapper-input').find('.placeholder').show();

    });

  }

  playVideo();
  customPlaceholder();


  function jsAccordion() {
    $('.js-accordion').on('click',function(){
      $(this).find('.answer').slideToggle();
      $('.js-accordion').not(this).find('.answer').slideUp();
    })
  }

  //////////
  // input type file logic
  function inputFile(){
    $( '.file input' ).on('change',function(){
      $(this).closest("label").find(".file__name").text(this.files[0].name);
    });
  }
  // video events
  function videoEvents(){
    $('.play-btn').on('click', function(){
      var myVid = $(this).parent().find('video').get(0);
      myVid.controls = true;
      myVid.play();
      $(this).hide();
    });
  }
  // tabs logic
  function customTabs(){
    $('.tabs .tabs__nav .tab').on('click', function(){
      if ($(this).hasClass('active')){     
      }else{
        var currentTab = $(this).index();
        $('.tabs .tabs__nav .tab, .tabs .tabs__for .tab').removeClass('active');
        $(this).addClass('active');
        $('.tabs .tabs__for .tab').eq(currentTab).addClass('active');
      }
    });
  }
  //    scroll top btn
    function scrollTop(){
      /* When distance from top = 250px fade button in/out */
      $(window).scroll(function(){
        if ($(this).scrollTop() > 250) {
          $('#back-top').fadeIn(300);
        } else {
          $('#back-top').fadeOut(300);
        }
      });
  
      /* On click scroll to top of page t = 1000ms */
      $('#back-top').click(function(){
        $("html, body").animate({ scrollTop: 0 }, 750);
        return false;
      });
    }
    function checkBox(){
      $('.ui-checkbox input').on('click', function(){    
        $(this).closest('.ui-checkbox').toggleClass('active');
      });
    }
    function formSend(){
      var wpcf7Elm = document.querySelector( '.wpcf7' );
      wpcf7Elm.addEventListener( 'wpcf7mailsent', function( event ) {
        var el = $('#modal-form-tnx');
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

    function timer() {

      function addNull(array) {

        array.each(function(e){
          if ( Number($(this).text()) < 10 ) {
            let thisNumber = $(this).text();
            $(this).text('0' + thisNumber);
          }
        });

      }

      function formatDate(date) {

        let dd = date.getDate();
        if (dd < 10) dd = '0' + dd;
      
        let mm = date.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;
      
        let yy = date.getFullYear() % 100;
        if (yy < 10) yy = '0' + yy;
      
        return dd + '.' + mm + '.' + yy;
      }


      const second = 1000,
      minute = second * 60,
      hour = minute * 60,
      day = hour * 24;
      // Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec
      currentDate = new Date();
      let m_year = currentDate.getFullYear();
      let m_month = currentDate.getMonth();
      let m_day = currentDate.getDate();
      let m_week = currentDate.getDay();
      
      if ( m_week == 0 ) {
        m_week = 'Воскресенье'
      }
      if ( m_week == 1 ) {
        m_week = 'Понедельник'
      }
      if ( m_week == 2 ) {
        m_week = 'Вторник'
      }
      if ( m_week == 3 ) {
        m_week = 'Среда'
      }
      if ( m_week == 4 ) {
        m_week = 'Четверг'
      }
      if ( m_week == 5 ) {
        m_week = 'Пятница'
      }
      if ( m_week == 6 ) {
        m_week = 'Суббота'
      }

      if ( m_month == 0 ) {
        m_month = 'Jan'
      }
      if ( m_month == 1 ) {
        m_month = 'Feb'
      }
      if ( m_month == 2 ) {
        m_month = 'Mar'
      }
      if ( m_month == 3 ) {
        m_month = 'Apr'
      }
      if ( m_month == 4 ) {
        m_month = 'May'
      }
      if ( m_month == 5 ) {
        m_month = 'Jun'
      }
      if ( m_month == 6 ) {
        m_month = 'Jul'
      }
      if ( m_month == 7 ) {
        m_month = 'Aug'
      }
      if ( m_month == 8 ) {
        m_month = 'Sep'
      }
      if ( m_month == 9 ) {
        m_month = 'Oct'
      }
      if ( m_month == 10 ) {
        m_month = 'Nov'
      }
      if ( m_month == 11 ) {
        m_month = 'Dec'
      }

      $('p.time .date_web').text(formatDate(currentDate));
      $('p.time .date_week').text(m_week);

      let countDown = new Date(m_month + ' ' + m_day + ' ,' + m_year + ' 20:00:00').getTime();
      
      if($('body').hasClass('homepage')) {
        
        x = setInterval(function() {

          let now = new Date().getTime(),
          distance = countDown - now;
          if ( distance <= 0 ) {} else {
  
            document.getElementById('days').innerText = Math.floor(distance / (day)),
            document.getElementById('hours').innerText = Math.floor((distance % (day)) / (hour)),
            document.getElementById('minutes').innerText = Math.floor((distance % (hour)) / (minute)),
            document.getElementById('seconds').innerText = Math.floor((distance % (minute)) / second);
  
            document.getElementById('days2').innerText = Math.floor(distance / (day)),
            document.getElementById('hours2').innerText = Math.floor((distance % (day)) / (hour)),
            document.getElementById('minutes2').innerText = Math.floor((distance % (hour)) / (minute)),
            document.getElementById('seconds2').innerText = Math.floor((distance % (minute)) / second);
  
            addNull($('#days, #hours, #minutes, #seconds, #days2, #hours2, #minutes2, #seconds2'));
          }
      
        }, second)

      }


    }


    timer();


});
