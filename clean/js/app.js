$(document).ready(function () {

    let _window = $(window);
    let _document = $(document);

    function pageReady() {
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
        burgerMenu();
        scrollTop();
        sectionNavigation();
        calculateCost();
        inputNumber()
        howWeWorkTabs();
        accordion();
        videoSliderIframe();
        calcForm();
        calcFormWindow();
        addListElemUsluga();
        accordionTable();
        loadMoreReview();
        tabsReview();
        videoReview();
    }

    pageReady();

    function tabsReview() {
        
        let tabBtn = $('.main-reviews__tab-title');
        let tabContent = $('.main-reviews__tab-content');

        tabBtn.click(function(){
            if(!$(this).hasClass('active')) {
                let dataTab = $(this).attr('data-tab');

                tabContent.hide();
                tabBtn.removeClass('active');

                $('.main-reviews__tab-content[data-tab="'+ dataTab +'"]').fadeIn();
                $(this).addClass('active');
            }
        });

    }

    function loadMoreReview() {

        if($('.main-reviews').length) {

            let txtTab = $('.main-reviews__tab-content[data-tab="txt"]');
            let btnLoadMore = $('.js-load-more');
            let countAddReview = 5 - 1;
            let NextDownloadableReview = 1;
            btnLoadMore.click(function(){
                
                let wrap = $('<div style="display: none;"></div>');
                btnLoadMore.before(wrap);

                wrap.load('./load-more-reviews.html .review-txt-container:nth-child(n+' + NextDownloadableReview + '):nth-child(-n+' + (NextDownloadableReview + countAddReview) + ')', function(response, status, xhr) {
                    if(wrap.html() == '') {
                        btnLoadMore.hide();
                        return;
                    }
                    // чтобы удалить обвёртку делаем span
                    let temporarySpan = $('<span class="js-remove-wrap"></span>');
                    temporarySpan.prependTo(wrap);
                    wrap.find(temporarySpan).unwrap();
                    temporarySpan.remove();
                    NextDownloadableReview += 5;
                });

            });

            btnLoadMore.click();
        }
    }

    function accordionTable() {
        if($('.price-table--uslugis').length) {
            let accordion = $('.price-table__table');
            let visibleArea = $('.price-table__title-table');
            let slideArea = $('.price-table__content');
            
            visibleArea.click(function(){
                let thisAccordion = $(this).closest(accordion);
                if(thisAccordion.hasClass('active')) {
                    thisAccordion.removeClass('active');
                    thisAccordion.find(slideArea).slideUp();
                } else {
                    slideArea.slideUp();
                    accordion.removeClass('active');

                    thisAccordion.addClass('active');
                    thisAccordion.find(slideArea).slideDown();
                }
            });
        }
    }

    function addListElemUsluga() {
        if($('.what-included-cleaning--usluga').length) {
            $('.all-items').click(function(){
                $('.usluga-item__section:hidden').show();
                $(this).hide();
            });
        }
    }

    function videoSliderIframe() {
        
        let playBtn = $('.video-slider .play');

        playBtn.click(function(){
            let thisSlide = $(this).closest('.swiper-slide');
            let iframeInSlide = thisSlide.find('iframe');
            if(!iframeInSlide.length) {
                let codeIframe = thisSlide.attr('data-iframe-video');
                thisSlide.append(codeIframe);
            }
        });

    }

    function videoReview() {
        
        let playBtn = $('.js-video-container-review__play');

        playBtn.click(function(){
            let thisWrapper = $(this).closest('.video-container-review__block');
            let iframe = thisWrapper.find('iframe');
            if(!iframe.length) {
                let codeIframe = thisWrapper.attr('data-iframe-video');
                thisWrapper.append(codeIframe);
            }
        });

    }

    function calcForm() {
        
        if(document.querySelector('.section-calc form')) {

            let calcWrapper = document.querySelector('.section-calc form');
            let inputButtons = calcWrapper.querySelectorAll('input[type="radio"], input[type="checkbox"]');
            let changeElems = calcWrapper.querySelectorAll('input[type="radio"], input[type="checkbox"], .quantity-num');
            let plusMinusInputNumber = calcWrapper.querySelectorAll('.minus, .plus');
            
            function calcFormMain() {
                let result = 0;
                let resultWithDiscount = 0;
                let inputButtonsNotTypeCleaning_result = 0;
                let inputButtonsTypeCleaning_result = 0;
                let inputNumberArea = calcWrapper.querySelector('.quantity-num').getAttribute('data-count-calc');

                let oldPriceNum = calcWrapper.querySelector('.old-price-num');
                let newPriceNum = calcWrapper.querySelector('.new-price-num');

                let inputButtonsNotTypeCleaning = calcWrapper.querySelectorAll('.additional-services input[type="checkbox"]:checked, .type-premises input[type="radio"]:checked, .location input[type="radio"]:checked');
                let inputButtonsTypeCleaning = calcWrapper.querySelector('.type-cleaning input[type="radio"]:checked');

                for(let i = 0; i < inputButtonsNotTypeCleaning.length; i++) {
                    inputButtonsNotTypeCleaning_result += +inputButtonsNotTypeCleaning[i].getAttribute('data-count-calc');
                }

                if(inputButtonsTypeCleaning) {
                    inputButtonsTypeCleaning_result = +inputButtonsTypeCleaning.getAttribute('data-count-calc');
                }

                result = inputButtonsNotTypeCleaning_result + (inputButtonsTypeCleaning_result * inputNumberArea);
                resultWithDiscount = result - (result * 10) / 100;

                oldPriceNum.innerHTML = result;
                newPriceNum.innerHTML = resultWithDiscount;
            
            }

            // создаём дата атрибуты для чекбоксов и радио кнопок
            inputButtons.forEach(function(current){
                let valueInput = current.getAttribute('value');
                let formatedValue = valueInput.replace(/[{}\d+]/g, '');
                formatedValue = valueInput.replace(/[{}\d+]/g, '');
                // вырезаем последний пробел
                formatedValue = formatedValue.substring(0, formatedValue.length - 1);

                let countValue = valueInput.match(/{(\d+)}/g, '')[0];
                countValue = countValue.substring(1, countValue.length - 1);
                // сохраняем отформатированное значение в value и обновляем текстовое содержимое соседа span
                current.setAttribute('value', formatedValue);
                current.nextSibling.textContent = formatedValue;
                // создаём дата атрибут для определенного инпута
                current.setAttribute('data-count-calc', countValue);
            })

            calcWrapper.style.opacity = "1";

            changeElems.forEach(function(current){
                current.addEventListener('input', calcFormMain)
            });

            plusMinusInputNumber.forEach(function(current){
                current.addEventListener('click', calcFormMain);
            });
        }
    }

    function calcFormWindow() {
        
        if(document.querySelector('.calculator-box form')) {

            let calcWrapper = document.querySelector('.calculator-box form');
            let changeElems = calcWrapper.querySelectorAll('.quantity-num');
            let plusMinusInputNumber = calcWrapper.querySelectorAll('.minus, .plus');
            let dataCountForInput = calcWrapper.querySelectorAll('.js-data-count');
            
            function calcFormMain() {
                
                let result = 0;
                let resultWithDiscount = 0;
                let oldPriceNum = calcWrapper.querySelector('.old-price-num');
                let newPriceNum = calcWrapper.querySelector('.new-price-num');

                changeElems.forEach(function(current){
                    let thisValueInput = +current.getAttribute('data-count-calc');
                    if(thisValueInput) {
                        result += thisValueInput * current.getAttribute('data-count-calc-window');
                    }
                });

                resultWithDiscount = result - (result * 10) / 100;
                oldPriceNum.innerHTML = result;
                newPriceNum.innerHTML = resultWithDiscount;

            }

            // создаём дата атрибуты
            changeElems.forEach(function(current) {
                let wrapperCurrent = current.closest('.ui-group, .item-field');
                let titleWrapper = wrapperCurrent.querySelector('.js-data-count');
                let valueInput = titleWrapper.textContent;

                let formatedValue = valueInput.replace(/{(\d+)}/g, '');
                // // вырезаем последний пробел
                formatedValue = formatedValue.substring(0, formatedValue.length - 1);

                let countValue = valueInput.match(/{(\d+)}/g, '')[0];
                countValue = countValue.substring(1, countValue.length - 1);

                // // сохраняем отформатированное значение и обновляем текстовое содержимое titleWrapper
                current.setAttribute('data-count-calc-window', countValue);
                titleWrapper.textContent = formatedValue;
                // // создаём дата атрибут для определенного инпута
            });

            calcWrapper.style.opacity = "1";

            changeElems.forEach(function(current){
                current.addEventListener('input', calcFormMain)
            });

            plusMinusInputNumber.forEach(function(current){
                current.addEventListener('click', calcFormMain);
            });
        }
    }

    function accordion() {
        let accordion = $('.faq .accordion');
        let visibleArea = $('.visible-area');

        $('.accordion.active .slide-area').show()

        visibleArea.click(function(){
            $(this).closest(accordion).find('.slide-area').slideToggle()
            $(this).closest(accordion).toggleClass('active');
        });
    }

    function inputNumber() {
            
        let $quantityArrowMinus = document.querySelectorAll('.minus');
        let $quantityArrowPlus = document.querySelectorAll('.plus');
        let inpNumber = document.querySelectorAll('input[type="number"]');

        for(let i = 0; i < inpNumber.length; i++) {
            inpNumber[i].setAttribute('data-count-calc', inpNumber[i].value);
            inpNumber[i].addEventListener('input', function(){
                inpNumber[i].setAttribute('data-count-calc', inpNumber[i].value);
            });
        }
        
        for(let i = 0; i < $quantityArrowPlus.length; i++) {
            $quantityArrowPlus[i].addEventListener('click', function() {
                let wrapper = this.closest('.wrapper-input');
                let thisQuantityNum = wrapper.querySelectorAll('.quantity-num')[0];
                // thisQuantityNum.setAttribute('value', +thisQuantityNum.getAttribute('value') + 1);
                thisQuantityNum.value = +thisQuantityNum.value + 1;
                thisQuantityNum.setAttribute('data-count-calc', thisQuantityNum.value);
            });
        }

        for(let i = 0; i < $quantityArrowMinus.length; i++) {
            $quantityArrowMinus[i].onclick = function() {
                let wrapper = this.parentNode;
                let thisQuantityNum = wrapper.querySelectorAll('.quantity-num')[0];
                if (thisQuantityNum.value > 0) {
                    // thisQuantityNum.setAttribute('value', +thisQuantityNum.getAttribute('value') - 1);
                    thisQuantityNum.value = +thisQuantityNum.value - 1;
                    thisQuantityNum.setAttribute('data-count-calc', thisQuantityNum.value);
                }
            }
        }

    }

    function howWeWorkTabs() {

        let tabsContent = $('.how-we-work-index .tab-content');
        tabsContent.each(function(){
            let nameTitleTab = $(this).attr('data-title-tab');
            $('.wrapper-tabs-title').append('<li class="tab-title">' + nameTitleTab + '</li>')
        });

        $('.tab-title').click(function(){

            // lazy load image
            if(!tabsContent.eq($(this).index()).find('img').attr('src')) {
                let srcImg = tabsContent.eq($(this).index()).find('img').attr('data-src');
                tabsContent.eq($(this).index()).find('img').attr('src', srcImg);
            }

            tabsContent.hide()
            $('.tab-title').removeClass('active')

            $(this).addClass('active');
            tabsContent.eq($(this).index()).fadeIn()
        });

    }

    function calculateCost() {

        let $quantityArrowMinus = document.querySelectorAll('.minus-calculateCost');
        let $quantityArrowPlus = document.querySelectorAll('.plus-calculateCost');
        
        for(let i = 0; i < $quantityArrowPlus.length; i++) {
            $quantityArrowPlus[i].onclick = function() {

                let wrapper = this.closest('.ui-group');
                let thisQuantityNum = wrapper.querySelectorAll('.quantity-num')[0];
                let valueInput = thisQuantityNum.getAttribute('value');
                let count = parseInt(valueInput.match(/\d+/)) + 1;
                let word = '';

        
                if(!wrapper.classList.contains('area')) {
                    if(count == 1) word = wrapper.getAttribute('data-word1'); 
                    if(count > 1 && count <= 4) word = wrapper.getAttribute('data-word2_4');
                    if(count >= 5) word = wrapper.getAttribute('data-word5');
                    thisQuantityNum.setAttribute('value', count + ' ' + word);
                } else {
                    thisQuantityNum.setAttribute('value', count + ' м²');
                }
            }
        }

        for(let i = 0; i < $quantityArrowMinus.length; i++) {
            $quantityArrowMinus[i].onclick = function() {
                let wrapper = this.closest('.ui-group');
                let thisQuantityNum = wrapper.querySelectorAll('.quantity-num')[0];
                let valueInput = thisQuantityNum.getAttribute('value');
                let count = parseInt(valueInput.match(/\d+/)) - 1;

                if(count == 0) return;

                let word = '';

                if(!wrapper.classList.contains('area')) {
                    if(count == 1) word = wrapper.getAttribute('data-word1'); 
                    if(count > 1 && count <= 4) word = wrapper.getAttribute('data-word2_4');
                    if(count >= 5) word = wrapper.getAttribute('data-word5');
                    thisQuantityNum.setAttribute('value', count + ' ' + word);
                } else {
                    thisQuantityNum.setAttribute('value', count + ' м²');
                }
            }
        }


    }

    function legacySupport() {
        svg4everybody();
    }

    function sectionNavigation() {
        _document
            .on('click', '[href="#"]', function (e) {
                e.preventDefault();
            })
            .on('click', 'a[href^="#section"]', function () {
                let el = $(this).attr('href');
                $('body, html').animate({
                    scrollTop: $(el).offset().top
                }, 1000);
                return false;
            })
    }

    function activeHeaderScroll() {

        let header = $('header.header');
        _window.on('scroll load', function () {
            if (_window.scrollTop() >= 10) {
                header.addClass('active');
            } else {
                header.removeClass('active');
            }
        });

    }

    function initPopups() {

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
                beforeOpen: function () {
                    startWindowScroll = _window.scrollTop();
                },
                close: function () {
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
                preload: [0, 1]
            },
            image: {
                tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
            }
        });

    }

    function closeMfp() {
        $.magnificPopup.close();
    }

    function initSliders() {

        new Swiper('.our-services-index-slider', {
            navigation: {
              nextEl: '.our-services-index-button-next',
              prevEl: '.our-services-index-button-prev',
            },
            lazy: true,
            spaceBetween: 20,
            breakpoints: {
                992: {
                    slidesPerView: 4,
                },
                768: {
                    slidesPerView: 3,
                },
                480: {
                    slidesPerView: 2,
                },
                320: {
                    slidesPerView: 1,
                },
            }
        });

        new Swiper('.review-slider', {
            navigation: {
              nextEl: '.review-button-next',
              prevEl: '.review-button-prev',
            },
            autoHeight: true,
        });

        new Swiper('.video-slider', {
            navigation: {
              nextEl: '.video-button-next',
              prevEl: '.video-button-prev',
            },
            lazy: true,
        });

        new Swiper('.our-portfolio__slider', {
            navigation: {
              nextEl: '.our-portfolio-button-next',
              prevEl: '.our-portfolio-button-prev',
            },
            lazy: true,
            spaceBetween: 20,
            breakpoints: {
                992: {
                    slidesPerView: 2,
                },
                320: {
                    slidesPerView: 1,
                }
            }
        });

    }

    function initMasks() {
        //$(".js-dateMask").mask("99.99.99",{placeholder:"ДД.ММ.ГГ"});
        $("input[type='tel']").mask("+7 (000) 000-00-00");
    }

    function initSelectric() {
        $('select').selectric({
            maxHeight: 300,
            arrowButtonMarkup: '<b class="button"></b>',

            onInit: function (element, data) {
                var $elm = $(element),
                    $wrapper = $elm.closest('.' + data.classes.wrapper);

                $wrapper.find('.label').html($elm.attr('placeholder'));
            },
            onBeforeOpen: function (element, data) {
                var $elm = $(element),
                    $wrapper = $elm.closest('.' + data.classes.wrapper);

                $wrapper.find('.label').data('value', $wrapper.find('.label').html()).html($elm.attr('placeholder'));
            },
            onBeforeClose: function (element, data) {
                var $elm = $(element),
                    $wrapper = $elm.closest('.' + data.classes.wrapper);

                $wrapper.find('.label').html($wrapper.find('.label').data('value'));
            }
        });
    }

    function initLazyPicture() {
        $('.lazy').lazy({
            effect: 'fadeIn',
            effectTime: 200,
        });
    }

    function imgToSvg() {
        $('img.svg').each(function () {
            var $img = $(this);
            var imgID = $img.attr('id');
            var imgClass = $img.attr('class');
            var imgURL = $img.attr('src');

            $.get(imgURL, function (data) {
                var $svg = $(data).find('svg');
                if (typeof imgID !== 'undefined') {
                    $svg = $svg.attr('id', imgID);
                }
                if (typeof imgClass !== 'undefined') {
                    $svg = $svg.attr('class', imgClass + ' replaced-svg');
                }
                $svg = $svg.removeAttr('xmlns:a');
                if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
                    $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
                }
                $img.replaceWith($svg);
            }, 'xml');
        });
    }

    function burgerMenu() {

        let burger = $('.burger');
        let menu = $('.nav-header');

        // add arrow for has sub-menu li

        if(_window.width() <= 992) {
            $('.menu-item-has-children > a').after('<span class="arrow-menu"></span>');
            $('.arrow-menu').click(function(){
                $(this).next().slideToggle();
            })

        }

        $(document).mouseup(function (e) {

            if (burger.is(e.target) || burger.has(e.target).length === 1) {
                if (menu.hasClass('active')) {
                    menu.removeClass('active');
                    burger.removeClass('active');
                } else {
                    menu.addClass('active');
                    burger.addClass('active');
                }
            } else if (!menu.is(e.target) && menu.has(e.target).length === 0 && menu.hasClass('active')) {
                menu.removeClass('active');
                burger.removeClass('active');
            }

        });

    }

    function scrollTop() {
        _window.scroll(function () {
            if ($(this).scrollTop() > 250) {
                $('#back-top').fadeIn(300);
            } else {
                $('#back-top').fadeOut(300);
            }
        });

        $('#back-top').click(function () {
            $("html, body").animate({
                scrollTop: 0
            }, 750);
            return false;
        });
    }

    function formSend() {
        document.addEventListener('wpcf7mailsent', function (event) {
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
        }, false);
    }

});