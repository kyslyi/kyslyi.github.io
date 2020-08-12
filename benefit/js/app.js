let _window = $(window);
let _document = $(document);

$(document).ready(function () {

    function pageReady() {
        // вспомогательные скрипты, библиотеки
        legacySupport();
        imgToSvg();
        formSend();
        // activeHeaderScroll();
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
        headerHeightFun();
        lazyLoadVideo();
        accordionFun();
        politicFile();
        // vhModule();
        // inputNumber();
    }

    pageReady();

    window.addEventListener('resize', () => {
        headerHeightFun();
    })

});
function accordionFun() {
    if(document.querySelector('.accordion')) {

        let accordionClass = '.accordion';
        let accordion__visibleAreaClass = '.accordion__visible-area';
        let accordion__slideAreaClass = '.accordion__slide-area';
        let accordion__visibleArea = document.querySelectorAll(accordion__visibleAreaClass);
        let accordion__slideArea = document.querySelectorAll(accordion__slideAreaClass);

        document.querySelector('.accordion__slide-area').style.display = 'block';

        accordion__visibleArea.forEach(current => {
            current.addEventListener('click', function(){
                let thisAccordion = this.closest(accordionClass);
                let thisSlideArea = thisAccordion.querySelector(accordion__slideAreaClass);
                thisAccordion.classList.toggle('accordion_active');
                $(thisSlideArea).slideToggle();
            });
        })

    }
}
function activeHeaderScroll() {

    let header = $('.header');
    _window.on('scroll load', function () {
        if (_window.scrollTop() >= 10) {
            header.addClass('header_scroll');
        } else {
            header.removeClass('header_scroll');
        }
    });

}
function burgerMenu() {

    let burger = $('.burger');
    let menu = $('.header__bottom-line');

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
function customFadeIn(elem, displayValue, msEffect) {
    // проверяем значение свойства display
    if(getComputedStyle(elem).display == 'none') {
        
        // проверка переданных значений
        if(!displayValue) displayValue = 'block';
        if(!msEffect) {
            msEffect = 0.4;
        } else {
            msEffect /= 1000;
        }

        // запускаем анимацию
        elem.style.cssText = `
            transition: opacity ${msEffect}s;
            display: ${displayValue};
            opacity: 0;
        `;
        setTimeout(() => elem.style.opacity = 1);

        elem.addEventListener('transitionend', function(){
            elem.setAttribute('style', '');
            elem.style.display = displayValue;
        });

    }

}
function customFadeOut(elem, msEffect) {
    // проверяем значение свойства display
    if(getComputedStyle(elem).display != 'none') {
        // проверка переданных значений
        if(!msEffect) {
            msEffect = 0.4;
        } else {
            msEffect /= 1000;
        }

        // запускаем анимацию
        elem.style.cssText = `
            transition: opacity ${msEffect}s;
            opacity: 1;
        `;
        setTimeout(() => elem.style.opacity = 0);

        elem.addEventListener('transitionend', function(){
            elem.setAttribute('style', '');
            elem.style.display = 'none';
        });
    }

}
function customFadeToggle(elem, displayValue, msEffect) {
    // проверяем значение свойства display на block или flex
    if(getComputedStyle(elem).display == 'block' || getComputedStyle(elem).display == 'flex') {
         customFadeOut(elem, msEffect);
    } // если display: none
    else  { 
        customFadeIn(elem, displayValue, msEffect);
    }
}
function customSlideDown(elem, displayValue, msEffect) {

    // проверяем значение свойства display
    if(getComputedStyle(elem).display == 'block' || getComputedStyle(elem).display == 'flex') {
        return;
    }

    // проверка переданных значений
    if(!displayValue) displayValue = 'block';
    if(!msEffect) {
        msEffect = 0.4;
    } else {
        msEffect /= 1000;
    }


    // узнаем высоту скрытого элемента
    elem.style.cssText = `
        opacity: 0;
        position: absolute;
        z-index: -2;
        display: ${displayValue};
    `;
    let heightElem = getComputedStyle(elem).height
    elem.setAttribute('style', '');

    // запускаем анимацию
    elem.style.cssText = `
        transition: height ${msEffect}s;
        overflow: hidden;
        height: 0;
        display: ${displayValue};
    `;
    setTimeout(() => elem.style.height = heightElem);

    elem.addEventListener('transitionend', function(){
        elem.setAttribute('style', '');
        elem.style.display = displayValue;
    });

}
function customSlideToggle(elem, displayValue, msEffect) {
    // проверяем значение свойства display на block или flex
    if(getComputedStyle(elem).display == 'block' || getComputedStyle(elem).display == 'flex') {
        customSlideUp(elem, msEffect);
    }
    // если display: none
    else {
        customSlideDown(elem, displayValue, msEffect);
    }

}
function customSlideUp(elem, msEffect) {
    // проверяем значение свойства display
    if(getComputedStyle(elem).display == 'block' || getComputedStyle(elem).display == 'flex') {
        // проверка переданных значений
        if(!msEffect) {
            msEffect = 0.4;
        } else {
            msEffect /= 1000;
        }

        let heightElem = getComputedStyle(elem).height

        // запускаем анимацию
        elem.style.cssText = `
            transition: height ${msEffect}s;
            overflow: hidden;
            height: ${heightElem};
            display: ${getComputedStyle(elem).display};
        `;
        setTimeout(() => elem.style.height = 0);

        elem.addEventListener('transitionend', function(){
            elem.setAttribute('style', '');
            elem.style.display = 'none';
        });
    }
}
function formSend() {
    // document.addEventListener('wpcf7mailsent', function (event) {
    //     let el = $('#modal-form-tnx');
    //     if (el.length) {
    //         $.magnificPopup.open({
    //             items: {
    //                 src: el
    //             },
    //             type: 'inline',
    //             fixedContentPos: true,
    //             fixedBgPos: true,
    //             overflowY: 'auto',
    //             closeBtnInside: true,
    //             preloader: false,
    //             midClick: true,
    //             removalDelay: 300,
    //             mainClass: 'popup-buble',
    //         });
    //     }
    // }, false);
    $("form").submit(function () {
        let formNm = $(this);
        $.ajax({
            type: "POST",
            url: 'mail.php',
            data: formNm.serialize(),
            success: function () {
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
            },
            error: function (jqXHR, text, error) {
                // Вывод текста ошибки отправки
                $(formNm).html(error);         
            }
        });
        return false;
    });
}
function getElIndex(el) {
    for (var i = 0; el = el.previousElementSibling; i++);
    return i;
}
function headerHeightFun() {
    let headerHeight = document.querySelector('.header').offsetHeight;
    document.documentElement.style.setProperty('--headerHeight', `${headerHeight}px`);
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
function initLazyPicture() {
    $('.lazy').lazy({
        effect: 'fadeIn',
        effectTime: 200
    });
}
function initMasks() {
    //$(".js-dateMask").mask("99.99.99",{placeholder:"ДД.ММ.ГГ"});
    $("input[type='tel']").mask("+7 (000) 000-0000");
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

    // $.magnificPopup.close();

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
function initSliders() {

    let spotSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="135" height="117" viewBox="0 0 135 117"><defs><mask id="dykyb" width="2.02" height="2.03" x="-1.01" y="-1.01"><path fill="#fff" d="M6.7 3.7h121.6v103.6H6.7z"/><path d="M71.25 12.19c8.911-.95 23.628-10.688 34.65-4.145 5.23 2.729 8.708 8.57 9.84 15.937 1.408 7.234.469 15.991 3.18 21.507 4.974 11.283 13.593 15.141.29 29.067-10.38 11.765-42.684 33.597-52.024 30.974-6.533-.11-10.395-3.457-16.36-7.054-5.666-3.7-13.434-7.648-20.699-11.331C13.707 79.535 5.62 73.39 9.131 59.943c2.126-12.26 8.114-36.175 21.507-43.692 12.46-9.685 32.323-2.972 40.613-4.062z"/></mask><filter id="dykya" width="159" height="144" x="-12" y="-15" filterUnits="userSpaceOnUse"><feOffset dy="3" in="SourceGraphic" result="FeOffset1023Out"/><feGaussianBlur in="FeOffset1023Out" result="FeGaussianBlur1024Out" stdDeviation="3.4799999999999995 3.4799999999999995"/></filter></defs><g><g><g><path fill="none" stroke="#fff" stroke-opacity=".23" stroke-width="2.6" d="M71.25 12.19c8.911-.95 23.628-10.688 34.65-4.145 5.23 2.729 8.708 8.57 9.84 15.937 1.408 7.234.469 15.991 3.18 21.507 4.974 11.283 13.593 15.141.29 29.067-10.38 11.765-42.684 33.597-52.024 30.974-6.533-.11-10.395-3.457-16.36-7.054-5.666-3.7-13.434-7.648-20.699-11.331C13.707 79.535 5.62 73.39 9.131 59.943c2.126-12.26 8.114-36.175 21.507-43.692 12.46-9.685 32.323-2.972 40.613-4.062z" mask="url(&quot;#dykyb&quot;)"/><path fill="#fff" fill-opacity=".23" d="M71.25 12.19c8.911-.95 23.628-10.688 34.65-4.145 5.23 2.729 8.708 8.57 9.84 15.937 1.408 7.234.469 15.991 3.18 21.507 4.974 11.283 13.593 15.141.29 29.067-10.38 11.765-42.684 33.597-52.024 30.974-6.533-.11-10.395-3.457-16.36-7.054-5.666-3.7-13.434-7.648-20.699-11.331C13.707 79.535 5.62 73.39 9.131 59.943c2.126-12.26 8.114-36.175 21.507-43.692 12.46-9.685 32.323-2.972 40.613-4.062z"/></g><path fill="#fff" d="M71.25 12.19c8.911-.95 23.628-10.688 34.65-4.145 5.23 2.729 8.708 8.57 9.84 15.937 1.408 7.234.469 15.991 3.18 21.507 4.974 11.283 13.593 15.141.29 29.067-10.38 11.765-42.684 33.597-52.024 30.974-6.533-.11-10.395-3.457-16.36-7.054-5.666-3.7-13.434-7.648-20.699-11.331C13.707 79.535 5.62 73.39 9.131 59.943c2.126-12.26 8.114-36.175 21.507-43.692 12.46-9.685 32.323-2.972 40.613-4.062z"/></g></g></svg>`;
    let arrowSVG = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" id="Слой_1" data-name="Слой 1" viewBox="0 0 110.68 37.27"><defs><clipPath id="clip-path" transform="translate(0 0)"><rect width="110.68" height="37.27" style="fill:none"/></clipPath></defs><title>Векторный смарт-объект6</title><g style="clip-path:url(#clip-path)"><path d="M108.83,0.29A67.88,67.88,0,0,1,92.11,12.58a1.07,1.07,0,0,0,.82,2l6.17-1.85C92.67,21.82,83,27.78,72.39,31.27c-10.9,3.59-28.12,7.9-37.15-1.56A10.17,10.17,0,0,1,34,28.09c5-.38,10.57-1.78,13.57-5.93,2.45-3.39,2.72-8.61-.87-11.34C37.42,3.76,27.45,17.34,30.51,26.1,18.85,25.93,8,19.73,1.2,10.29a0.64,0.64,0,0,0-1.1.64A36.43,36.43,0,0,0,31.44,28.19c6.09,11.53,22.8,9.67,33.53,7.32C79,32.45,92.46,25.79,100.82,14q0,3.25-.08,6.5c0,1,1.55,1.55,2,.54q4.23-9.73,7.89-19.69a1.08,1.08,0,0,0-1.79-1M41.49,11.38c7.55,0,6.58,8.63,2,11.77-3,2-7,2.7-10.5,2.9-2.35-6.28.67-14.63,8.51-14.67M102.23,10a1,1,0,0,0-.9-0.17l-0.88.26A69.39,69.39,0,0,0,107,4.94q-2,5.11-4.05,10.17,0-2.09.05-4.17a1,1,0,0,0-.75-1" transform="translate(0 0)"/></g></svg>`;
    
    let paginationObjDesktop = {
        el: '.steps__pagination',
        clickable: true,
        bulletClass: 'steps__bullet-wrap',
        bulletActiveClass: 'steps__bullet-wrap_active',
        renderBullet: function (index, className) {
            index++;
            return `
                <span class="${className}">
                    <span class="steps__bullet-icon">
                        ${spotSVG}
                    </span>
                    <span class="steps__bullet-counter">
                        ${index < 10 ? '0' + index : index}
                    </span>
                    <span class="steps__bullet-arrow">
                        ${window.innerWidth <= 992 ? '' : arrowSVG}
                    </span>
                </span>
            `;
        },
    }

    let paginationObjMobile = {
        el: '.steps__pagination-mob',
        clickable: true,
        bulletClass: 'steps__bullet-mob',
        bulletActiveClass: 'steps__bullet-mob_active',
        renderBullet: function (index, className) {
            index++;
            return `
                <span class="${className}">
                    <span class="steps__bullet-mob-counter">
                        ${index < 10 ? '0' + index : index}
                    </span>
                </span>
            `;
        },
    }

    let navigationObjMobile = {
        nextEl: '.steps__slider-btn-next',
        prevEl: '.steps__slider-btn-prev',
        disabledClass: 'slider-btn_disabled'
    }
    
    let steps__slider = new Swiper('.steps__slider', {
        pagination: window.innerWidth <= 768 ? paginationObjMobile : paginationObjDesktop,
        navigation: window.innerWidth <= 768 ? navigationObjMobile : {},
        autoHeight: true,
    });
    
    let steps__bulletWrap = document.querySelectorAll('.steps__bullet-wrap');
    let steps__dot = document.querySelectorAll('.steps__dot');
    steps__bulletWrap.forEach((current, index) => {
        current.addEventListener('click', function(){
            document.querySelector('.steps__dot_active').classList.remove('steps__dot_active');
            steps__dot[index].classList.add('steps__dot_active');
        });
    });

    function togglePaginationOnMobile() {
        
        let pagination = document.querySelector('.steps__pagination-mob');
        let bullets = pagination.querySelectorAll('.steps__bullet-mob');
        let lastIndexElem = bullets.length - 1;
        let isDirectionReverse = false;
        let prevActiveSlide = 0

        function toggleDisplayBullest(arrIndexes) {
            /* скрываем все */
            bullets.forEach(current => {
                current.style.display = 'none';
            });

            /* показываем нужные */
            for(let i = 0; i < arrIndexes.length; i++) {
                bullets[arrIndexes[i]].style.display = 'flex';
            }
        }

        function toggleBullets() {
            let indexActiveSlide = getElIndex(document.querySelector('.steps .swiper-slide-active'));
            document.querySelector('.steps__slider__counter').textContent = indexActiveSlide + 1 < 10 ? '0' + (indexActiveSlide + 1) : indexActiveSlide + 1;
            
            if(!(indexActiveSlide == lastIndexElem || indexActiveSlide == 0)) {
                
                if(indexActiveSlide > prevActiveSlide) {
                    isDirectionReverse = false;  
                } else {
                    isDirectionReverse = true;
                }

            }
            prevActiveSlide = indexActiveSlide;

            /* Когда мы листаем справа налево. Как обычно на слайдерах */
            if(!isDirectionReverse) {

                /* Когда индекс меньше предпоследнего элементом  */
                if(indexActiveSlide < lastIndexElem - 1) {
                    toggleDisplayBullest([indexActiveSlide + 1, indexActiveSlide + 2]);

                } 
                /* Когда индекс равен предпоследнему элементу */ 
                else if(indexActiveSlide == lastIndexElem - 1) {
                    toggleDisplayBullest([indexActiveSlide - 1, indexActiveSlide + 1]);
                } 
                /* Когда индекс равен последнему элементу */
                else if(indexActiveSlide == lastIndexElem) {
                    isDirectionReverse = true;
                    toggleBullets();
                }

            } 
            /* Когда мы листаем слева направо (обратно) */ 
            else {

                /* Когда индекс больше послепервого элемента  */
                if(indexActiveSlide > 1) {
                    toggleDisplayBullest([indexActiveSlide - 1, indexActiveSlide - 2]);
                } 
                /* Когда индекс равен послепервому элементу */ 
                else if(indexActiveSlide == 1) {
                    toggleDisplayBullest([indexActiveSlide - 1, indexActiveSlide + 1]);
                } 
                /* Когда индекс равен первому элементу */
                else if(indexActiveSlide == 0) {
                    isDirectionReverse = false;
                    toggleBullets();
                }

            }
        }

        steps__slider.on('slideChangeTransitionStart', toggleBullets);
        toggleBullets();

    }

    if(window.innerWidth <= 768) togglePaginationOnMobile();


    /* gallery sliders */
    document.querySelectorAll('.gallery__slider').forEach(current => {
        new Swiper(current, {
            navigation: {
              nextEl: current.closest('.gallery__wrap-slider').querySelector('.gallery__slider-btn-next'),
              prevEl: current.closest('.gallery__wrap-slider').querySelector('.gallery__slider-btn-prev'),
            },
            spaceBetween: 20,
        });
    });
    $.fancybox.defaults.backFocus = false;

}
function inputNumber() {

    let plusInputNumber = document.querySelectorAll('.input-counter__plus');
    let minusInputNumber = document.querySelectorAll('.input-counter__minus');

    let classWrapInputNumber = '.input-counter';
    let classInputNumber = '.input-counter__input';

    plusInputNumber.forEach(current => {
        increment_decrement(current, 'plus');
    });

    minusInputNumber.forEach(current => {
        increment_decrement(current, 'minus');
    });

    function increment_decrement(current, sign) {
        current.addEventListener('click', function(){
            
            let thisWrap = current.closest(classWrapInputNumber);
            let thisInput = thisWrap.querySelector(classInputNumber);

            if(sign == 'plus') {
                thisInput.value++;
            }

            if(sign == 'minus' && thisInput.value > 1) {
                thisInput.value--;
            }

        });
    }

}
function lazyLoadVideo() {
    if(document.querySelector('.play-btn')) {
        
        let playBtn = document.querySelectorAll('.play-btn');
        let classWrapVideo = '.gallery__video-slide';

        playBtn.forEach(current => {
            current.addEventListener('click', function(){

                let thisWrap = current.closest(classWrapVideo);
                let thisIframe = thisWrap.dataset.iframeVideo;
                thisWrap.insertAdjacentHTML('beforeend', thisIframe)

            });
        });

    }
}
function legacySupport() {
    svg4everybody();
}
function politicFile() {
    
    

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
function vhModule() {

    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    // We listen to the resize event
    window.addEventListener('resize', () => {
    // We execute the same script as before
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    // headerHeightFun();
    });

}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImFjY29kaW9uLmpzIiwiYWN0aXZlSGVhZGVyU2Nyb2xsLmpzIiwiYnVyZ2VyTWVudS5qcyIsImN1c3RvbUZhZGVJbi5qcyIsImN1c3RvbUZhZGVPdXQuanMiLCJjdXN0b21GYWRlVG9nZ2xlLmpzIiwiY3VzdG9tU2xpZGVEb3duLmpzIiwiY3VzdG9tU2xpZGVUb2dnbGUuanMiLCJjdXN0b21TbGlkZVVwLmpzIiwiZm9ybVNlbmQuanMiLCJnZXRFbEluZGV4LmpzIiwiaGVhZGVySGVpZ2h0RnVuLmpzIiwiaW1nVG9TdmcuanMiLCJpbml0TGF6eVBpY3R1cmUuanMiLCJpbml0TWFza3MuanMiLCJpbml0UG9wdXBzLmpzIiwiaW5pdFNlbGVjdHJpYy5qcyIsImluaXRTbGlkZXJzLmpzIiwiaW5wdXROdW1iZXIuanMiLCJsYXp5TG9hZFZpZGVvLmpzIiwibGVnYWN5U3VwcG9ydC5qcyIsInBvbGl0aWNGaWxlLmpzIiwic2Nyb2xsVG9wLmpzIiwic2VjdGlvbk5hdmlnYXRpb24uanMiLCJ2aE1vZHVsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwREE7QUFDQTtBQUNBO0FBQ0E7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNqQkE7QUFDQTtBQUNBO0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgX3dpbmRvdyA9ICQod2luZG93KTtcbmxldCBfZG9jdW1lbnQgPSAkKGRvY3VtZW50KTtcblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuXG4gICAgZnVuY3Rpb24gcGFnZVJlYWR5KCkge1xuICAgICAgICAvLyDQstGB0L/QvtC80L7Qs9Cw0YLQtdC70YzQvdGL0LUg0YHQutGA0LjQv9GC0YssINCx0LjQsdC70LjQvtGC0LXQutC4XG4gICAgICAgIGxlZ2FjeVN1cHBvcnQoKTtcbiAgICAgICAgaW1nVG9TdmcoKTtcbiAgICAgICAgZm9ybVNlbmQoKTtcbiAgICAgICAgLy8gYWN0aXZlSGVhZGVyU2Nyb2xsKCk7XG4gICAgICAgIC8vINC40L3QuNGG0LjQsNC70LjQt9Cw0YbQuNGPINCx0LjQsdC70LjQvtGC0LXQulxuICAgICAgICBpbml0U2xpZGVycygpO1xuICAgICAgICBpbml0UG9wdXBzKCk7XG4gICAgICAgIGluaXRNYXNrcygpO1xuICAgICAgICAvLyBpbml0U2VsZWN0cmljKCk7XG4gICAgICAgIGluaXRMYXp5UGljdHVyZSgpO1xuICAgICAgICAvLyDQutCw0YHRgtC+0LzQvdGL0LUg0YHQutGA0LjQv9GC0YtcbiAgICAgICAgYnVyZ2VyTWVudSgpO1xuICAgICAgICBzY3JvbGxUb3AoKTtcbiAgICAgICAgc2VjdGlvbk5hdmlnYXRpb24oKTtcbiAgICAgICAgaGVhZGVySGVpZ2h0RnVuKCk7XG4gICAgICAgIGxhenlMb2FkVmlkZW8oKTtcbiAgICAgICAgYWNjb3JkaW9uRnVuKCk7XG4gICAgICAgIHBvbGl0aWNGaWxlKCk7XG4gICAgICAgIC8vIHZoTW9kdWxlKCk7XG4gICAgICAgIC8vIGlucHV0TnVtYmVyKCk7XG4gICAgfVxuXG4gICAgcGFnZVJlYWR5KCk7XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgKCkgPT4ge1xuICAgICAgICBoZWFkZXJIZWlnaHRGdW4oKTtcbiAgICB9KVxuXG59KTsiLCJmdW5jdGlvbiBhY2NvcmRpb25GdW4oKSB7XHJcbiAgICBpZihkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWNjb3JkaW9uJykpIHtcclxuXHJcbiAgICAgICAgbGV0IGFjY29yZGlvbkNsYXNzID0gJy5hY2NvcmRpb24nO1xyXG4gICAgICAgIGxldCBhY2NvcmRpb25fX3Zpc2libGVBcmVhQ2xhc3MgPSAnLmFjY29yZGlvbl9fdmlzaWJsZS1hcmVhJztcclxuICAgICAgICBsZXQgYWNjb3JkaW9uX19zbGlkZUFyZWFDbGFzcyA9ICcuYWNjb3JkaW9uX19zbGlkZS1hcmVhJztcclxuICAgICAgICBsZXQgYWNjb3JkaW9uX192aXNpYmxlQXJlYSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYWNjb3JkaW9uX192aXNpYmxlQXJlYUNsYXNzKTtcclxuICAgICAgICBsZXQgYWNjb3JkaW9uX19zbGlkZUFyZWEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGFjY29yZGlvbl9fc2xpZGVBcmVhQ2xhc3MpO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWNjb3JkaW9uX19zbGlkZS1hcmVhJykuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcblxyXG4gICAgICAgIGFjY29yZGlvbl9fdmlzaWJsZUFyZWEuZm9yRWFjaChjdXJyZW50ID0+IHtcclxuICAgICAgICAgICAgY3VycmVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGhpc0FjY29yZGlvbiA9IHRoaXMuY2xvc2VzdChhY2NvcmRpb25DbGFzcyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGhpc1NsaWRlQXJlYSA9IHRoaXNBY2NvcmRpb24ucXVlcnlTZWxlY3RvcihhY2NvcmRpb25fX3NsaWRlQXJlYUNsYXNzKTtcclxuICAgICAgICAgICAgICAgIHRoaXNBY2NvcmRpb24uY2xhc3NMaXN0LnRvZ2dsZSgnYWNjb3JkaW9uX2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzU2xpZGVBcmVhKS5zbGlkZVRvZ2dsZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KVxyXG5cclxuICAgIH1cclxufSIsImZ1bmN0aW9uIGFjdGl2ZUhlYWRlclNjcm9sbCgpIHtcclxuXHJcbiAgICBsZXQgaGVhZGVyID0gJCgnLmhlYWRlcicpO1xyXG4gICAgX3dpbmRvdy5vbignc2Nyb2xsIGxvYWQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKF93aW5kb3cuc2Nyb2xsVG9wKCkgPj0gMTApIHtcclxuICAgICAgICAgICAgaGVhZGVyLmFkZENsYXNzKCdoZWFkZXJfc2Nyb2xsJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaGVhZGVyLnJlbW92ZUNsYXNzKCdoZWFkZXJfc2Nyb2xsJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG59IiwiZnVuY3Rpb24gYnVyZ2VyTWVudSgpIHtcclxuXHJcbiAgICBsZXQgYnVyZ2VyID0gJCgnLmJ1cmdlcicpO1xyXG4gICAgbGV0IG1lbnUgPSAkKCcuaGVhZGVyX19ib3R0b20tbGluZScpO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLm1vdXNldXAoZnVuY3Rpb24gKGUpIHtcclxuXHJcbiAgICAgICAgaWYgKGJ1cmdlci5pcyhlLnRhcmdldCkgfHwgYnVyZ2VyLmhhcyhlLnRhcmdldCkubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgICAgIGlmIChtZW51Lmhhc0NsYXNzKCdhY3RpdmUnKSkge1xyXG4gICAgICAgICAgICAgICAgbWVudS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICBidXJnZXIucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbWVudS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICBidXJnZXIuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmICghbWVudS5pcyhlLnRhcmdldCkgJiYgbWVudS5oYXMoZS50YXJnZXQpLmxlbmd0aCA9PT0gMCAmJiBtZW51Lmhhc0NsYXNzKCdhY3RpdmUnKSkge1xyXG4gICAgICAgICAgICBtZW51LnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgYnVyZ2VyLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSk7XHJcblxyXG59IiwiZnVuY3Rpb24gY3VzdG9tRmFkZUluKGVsZW0sIGRpc3BsYXlWYWx1ZSwgbXNFZmZlY3QpIHtcclxuICAgIC8vINC/0YDQvtCy0LXRgNGP0LXQvCDQt9C90LDRh9C10L3QuNC1INGB0LLQvtC50YHRgtCy0LAgZGlzcGxheVxyXG4gICAgaWYoZ2V0Q29tcHV0ZWRTdHlsZShlbGVtKS5kaXNwbGF5ID09ICdub25lJykge1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vINC/0YDQvtCy0LXRgNC60LAg0L/QtdGA0LXQtNCw0L3QvdGL0YUg0LfQvdCw0YfQtdC90LjQuVxyXG4gICAgICAgIGlmKCFkaXNwbGF5VmFsdWUpIGRpc3BsYXlWYWx1ZSA9ICdibG9jayc7XHJcbiAgICAgICAgaWYoIW1zRWZmZWN0KSB7XHJcbiAgICAgICAgICAgIG1zRWZmZWN0ID0gMC40O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG1zRWZmZWN0IC89IDEwMDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyDQt9Cw0L/Rg9GB0LrQsNC10Lwg0LDQvdC40LzQsNGG0LjRjlxyXG4gICAgICAgIGVsZW0uc3R5bGUuY3NzVGV4dCA9IGBcclxuICAgICAgICAgICAgdHJhbnNpdGlvbjogb3BhY2l0eSAke21zRWZmZWN0fXM7XHJcbiAgICAgICAgICAgIGRpc3BsYXk6ICR7ZGlzcGxheVZhbHVlfTtcclxuICAgICAgICAgICAgb3BhY2l0eTogMDtcclxuICAgICAgICBgO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gZWxlbS5zdHlsZS5vcGFjaXR5ID0gMSk7XHJcblxyXG4gICAgICAgIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGVsZW0uc2V0QXR0cmlidXRlKCdzdHlsZScsICcnKTtcclxuICAgICAgICAgICAgZWxlbS5zdHlsZS5kaXNwbGF5ID0gZGlzcGxheVZhbHVlO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcbn0iLCJmdW5jdGlvbiBjdXN0b21GYWRlT3V0KGVsZW0sIG1zRWZmZWN0KSB7XHJcbiAgICAvLyDQv9GA0L7QstC10YDRj9C10Lwg0LfQvdCw0YfQtdC90LjQtSDRgdCy0L7QudGB0YLQstCwIGRpc3BsYXlcclxuICAgIGlmKGdldENvbXB1dGVkU3R5bGUoZWxlbSkuZGlzcGxheSAhPSAnbm9uZScpIHtcclxuICAgICAgICAvLyDQv9GA0L7QstC10YDQutCwINC/0LXRgNC10LTQsNC90L3Ri9GFINC30L3QsNGH0LXQvdC40LlcclxuICAgICAgICBpZighbXNFZmZlY3QpIHtcclxuICAgICAgICAgICAgbXNFZmZlY3QgPSAwLjQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbXNFZmZlY3QgLz0gMTAwMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vINC30LDQv9GD0YHQutCw0LXQvCDQsNC90LjQvNCw0YbQuNGOXHJcbiAgICAgICAgZWxlbS5zdHlsZS5jc3NUZXh0ID0gYFxyXG4gICAgICAgICAgICB0cmFuc2l0aW9uOiBvcGFjaXR5ICR7bXNFZmZlY3R9cztcclxuICAgICAgICAgICAgb3BhY2l0eTogMTtcclxuICAgICAgICBgO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gZWxlbS5zdHlsZS5vcGFjaXR5ID0gMCk7XHJcblxyXG4gICAgICAgIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGVsZW0uc2V0QXR0cmlidXRlKCdzdHlsZScsICcnKTtcclxuICAgICAgICAgICAgZWxlbS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxufSIsImZ1bmN0aW9uIGN1c3RvbUZhZGVUb2dnbGUoZWxlbSwgZGlzcGxheVZhbHVlLCBtc0VmZmVjdCkge1xyXG4gICAgLy8g0L/RgNC+0LLQtdGA0Y/QtdC8INC30L3QsNGH0LXQvdC40LUg0YHQstC+0LnRgdGC0LLQsCBkaXNwbGF5INC90LAgYmxvY2sg0LjQu9C4IGZsZXhcclxuICAgIGlmKGdldENvbXB1dGVkU3R5bGUoZWxlbSkuZGlzcGxheSA9PSAnYmxvY2snIHx8IGdldENvbXB1dGVkU3R5bGUoZWxlbSkuZGlzcGxheSA9PSAnZmxleCcpIHtcclxuICAgICAgICAgY3VzdG9tRmFkZU91dChlbGVtLCBtc0VmZmVjdCk7XHJcbiAgICB9IC8vINC10YHQu9C4IGRpc3BsYXk6IG5vbmVcclxuICAgIGVsc2UgIHsgXHJcbiAgICAgICAgY3VzdG9tRmFkZUluKGVsZW0sIGRpc3BsYXlWYWx1ZSwgbXNFZmZlY3QpO1xyXG4gICAgfVxyXG59IiwiZnVuY3Rpb24gY3VzdG9tU2xpZGVEb3duKGVsZW0sIGRpc3BsYXlWYWx1ZSwgbXNFZmZlY3QpIHtcclxuXHJcbiAgICAvLyDQv9GA0L7QstC10YDRj9C10Lwg0LfQvdCw0YfQtdC90LjQtSDRgdCy0L7QudGB0YLQstCwIGRpc3BsYXlcclxuICAgIGlmKGdldENvbXB1dGVkU3R5bGUoZWxlbSkuZGlzcGxheSA9PSAnYmxvY2snIHx8IGdldENvbXB1dGVkU3R5bGUoZWxlbSkuZGlzcGxheSA9PSAnZmxleCcpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgLy8g0L/RgNC+0LLQtdGA0LrQsCDQv9C10YDQtdC00LDQvdC90YvRhSDQt9C90LDRh9C10L3QuNC5XHJcbiAgICBpZighZGlzcGxheVZhbHVlKSBkaXNwbGF5VmFsdWUgPSAnYmxvY2snO1xyXG4gICAgaWYoIW1zRWZmZWN0KSB7XHJcbiAgICAgICAgbXNFZmZlY3QgPSAwLjQ7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIG1zRWZmZWN0IC89IDEwMDA7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vINGD0LfQvdCw0LXQvCDQstGL0YHQvtGC0YMg0YHQutGA0YvRgtC+0LPQviDRjdC70LXQvNC10L3RgtCwXHJcbiAgICBlbGVtLnN0eWxlLmNzc1RleHQgPSBgXHJcbiAgICAgICAgb3BhY2l0eTogMDtcclxuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgICAgei1pbmRleDogLTI7XHJcbiAgICAgICAgZGlzcGxheTogJHtkaXNwbGF5VmFsdWV9O1xyXG4gICAgYDtcclxuICAgIGxldCBoZWlnaHRFbGVtID0gZ2V0Q29tcHV0ZWRTdHlsZShlbGVtKS5oZWlnaHRcclxuICAgIGVsZW0uc2V0QXR0cmlidXRlKCdzdHlsZScsICcnKTtcclxuXHJcbiAgICAvLyDQt9Cw0L/Rg9GB0LrQsNC10Lwg0LDQvdC40LzQsNGG0LjRjlxyXG4gICAgZWxlbS5zdHlsZS5jc3NUZXh0ID0gYFxyXG4gICAgICAgIHRyYW5zaXRpb246IGhlaWdodCAke21zRWZmZWN0fXM7XHJcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICAgICAgICBoZWlnaHQ6IDA7XHJcbiAgICAgICAgZGlzcGxheTogJHtkaXNwbGF5VmFsdWV9O1xyXG4gICAgYDtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4gZWxlbS5zdHlsZS5oZWlnaHQgPSBoZWlnaHRFbGVtKTtcclxuXHJcbiAgICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCBmdW5jdGlvbigpe1xyXG4gICAgICAgIGVsZW0uc2V0QXR0cmlidXRlKCdzdHlsZScsICcnKTtcclxuICAgICAgICBlbGVtLnN0eWxlLmRpc3BsYXkgPSBkaXNwbGF5VmFsdWU7XHJcbiAgICB9KTtcclxuXHJcbn0iLCJmdW5jdGlvbiBjdXN0b21TbGlkZVRvZ2dsZShlbGVtLCBkaXNwbGF5VmFsdWUsIG1zRWZmZWN0KSB7XHJcbiAgICAvLyDQv9GA0L7QstC10YDRj9C10Lwg0LfQvdCw0YfQtdC90LjQtSDRgdCy0L7QudGB0YLQstCwIGRpc3BsYXkg0L3QsCBibG9jayDQuNC70LggZmxleFxyXG4gICAgaWYoZ2V0Q29tcHV0ZWRTdHlsZShlbGVtKS5kaXNwbGF5ID09ICdibG9jaycgfHwgZ2V0Q29tcHV0ZWRTdHlsZShlbGVtKS5kaXNwbGF5ID09ICdmbGV4Jykge1xyXG4gICAgICAgIGN1c3RvbVNsaWRlVXAoZWxlbSwgbXNFZmZlY3QpO1xyXG4gICAgfVxyXG4gICAgLy8g0LXRgdC70LggZGlzcGxheTogbm9uZVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgY3VzdG9tU2xpZGVEb3duKGVsZW0sIGRpc3BsYXlWYWx1ZSwgbXNFZmZlY3QpO1xyXG4gICAgfVxyXG5cclxufSIsImZ1bmN0aW9uIGN1c3RvbVNsaWRlVXAoZWxlbSwgbXNFZmZlY3QpIHtcclxuICAgIC8vINC/0YDQvtCy0LXRgNGP0LXQvCDQt9C90LDRh9C10L3QuNC1INGB0LLQvtC50YHRgtCy0LAgZGlzcGxheVxyXG4gICAgaWYoZ2V0Q29tcHV0ZWRTdHlsZShlbGVtKS5kaXNwbGF5ID09ICdibG9jaycgfHwgZ2V0Q29tcHV0ZWRTdHlsZShlbGVtKS5kaXNwbGF5ID09ICdmbGV4Jykge1xyXG4gICAgICAgIC8vINC/0YDQvtCy0LXRgNC60LAg0L/QtdGA0LXQtNCw0L3QvdGL0YUg0LfQvdCw0YfQtdC90LjQuVxyXG4gICAgICAgIGlmKCFtc0VmZmVjdCkge1xyXG4gICAgICAgICAgICBtc0VmZmVjdCA9IDAuNDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBtc0VmZmVjdCAvPSAxMDAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGhlaWdodEVsZW0gPSBnZXRDb21wdXRlZFN0eWxlKGVsZW0pLmhlaWdodFxyXG5cclxuICAgICAgICAvLyDQt9Cw0L/Rg9GB0LrQsNC10Lwg0LDQvdC40LzQsNGG0LjRjlxyXG4gICAgICAgIGVsZW0uc3R5bGUuY3NzVGV4dCA9IGBcclxuICAgICAgICAgICAgdHJhbnNpdGlvbjogaGVpZ2h0ICR7bXNFZmZlY3R9cztcclxuICAgICAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICAgICAgICAgICAgaGVpZ2h0OiAke2hlaWdodEVsZW19O1xyXG4gICAgICAgICAgICBkaXNwbGF5OiAke2dldENvbXB1dGVkU3R5bGUoZWxlbSkuZGlzcGxheX07XHJcbiAgICAgICAgYDtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IGVsZW0uc3R5bGUuaGVpZ2h0ID0gMCk7XHJcblxyXG4gICAgICAgIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGVsZW0uc2V0QXR0cmlidXRlKCdzdHlsZScsICcnKTtcclxuICAgICAgICAgICAgZWxlbS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59IiwiZnVuY3Rpb24gZm9ybVNlbmQoKSB7XHJcbiAgICAvLyBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd3cGNmN21haWxzZW50JywgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAvLyAgICAgbGV0IGVsID0gJCgnI21vZGFsLWZvcm0tdG54Jyk7XHJcbiAgICAvLyAgICAgaWYgKGVsLmxlbmd0aCkge1xyXG4gICAgLy8gICAgICAgICAkLm1hZ25pZmljUG9wdXAub3Blbih7XHJcbiAgICAvLyAgICAgICAgICAgICBpdGVtczoge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIHNyYzogZWxcclxuICAgIC8vICAgICAgICAgICAgIH0sXHJcbiAgICAvLyAgICAgICAgICAgICB0eXBlOiAnaW5saW5lJyxcclxuICAgIC8vICAgICAgICAgICAgIGZpeGVkQ29udGVudFBvczogdHJ1ZSxcclxuICAgIC8vICAgICAgICAgICAgIGZpeGVkQmdQb3M6IHRydWUsXHJcbiAgICAvLyAgICAgICAgICAgICBvdmVyZmxvd1k6ICdhdXRvJyxcclxuICAgIC8vICAgICAgICAgICAgIGNsb3NlQnRuSW5zaWRlOiB0cnVlLFxyXG4gICAgLy8gICAgICAgICAgICAgcHJlbG9hZGVyOiBmYWxzZSxcclxuICAgIC8vICAgICAgICAgICAgIG1pZENsaWNrOiB0cnVlLFxyXG4gICAgLy8gICAgICAgICAgICAgcmVtb3ZhbERlbGF5OiAzMDAsXHJcbiAgICAvLyAgICAgICAgICAgICBtYWluQ2xhc3M6ICdwb3B1cC1idWJsZScsXHJcbiAgICAvLyAgICAgICAgIH0pO1xyXG4gICAgLy8gICAgIH1cclxuICAgIC8vIH0sIGZhbHNlKTtcclxuICAgICQoXCJmb3JtXCIpLnN1Ym1pdChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbGV0IGZvcm1ObSA9ICQodGhpcyk7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIHVybDogJ21haWwucGhwJyxcclxuICAgICAgICAgICAgZGF0YTogZm9ybU5tLnNlcmlhbGl6ZSgpLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZWwgPSAkKCcjbW9kYWwtZm9ybS10bngnKTtcclxuICAgICAgICAgICAgICAgIGlmIChlbC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAkLm1hZ25pZmljUG9wdXAub3Blbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcmM6IGVsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdpbmxpbmUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaXhlZENvbnRlbnRQb3M6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpeGVkQmdQb3M6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG92ZXJmbG93WTogJ2F1dG8nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbG9zZUJ0bkluc2lkZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJlbG9hZGVyOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWlkQ2xpY2s6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbW92YWxEZWxheTogMzAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYWluQ2xhc3M6ICdwb3B1cC1idWJsZScsXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiAoanFYSFIsIHRleHQsIGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAvLyDQktGL0LLQvtC0INGC0LXQutGB0YLQsCDQvtGI0LjQsdC60Lgg0L7RgtC/0YDQsNCy0LrQuFxyXG4gICAgICAgICAgICAgICAgJChmb3JtTm0pLmh0bWwoZXJyb3IpOyAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSk7XHJcbn0iLCJmdW5jdGlvbiBnZXRFbEluZGV4KGVsKSB7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgZWwgPSBlbC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nOyBpKyspO1xyXG4gICAgcmV0dXJuIGk7XHJcbn0iLCJmdW5jdGlvbiBoZWFkZXJIZWlnaHRGdW4oKSB7XHJcbiAgICBsZXQgaGVhZGVySGVpZ2h0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcicpLm9mZnNldEhlaWdodDtcclxuICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1oZWFkZXJIZWlnaHQnLCBgJHtoZWFkZXJIZWlnaHR9cHhgKTtcclxufSIsImZ1bmN0aW9uIGltZ1RvU3ZnKCkge1xyXG4gICAgJCgnaW1nLnN2ZycpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciAkaW1nID0gJCh0aGlzKTtcclxuICAgICAgICB2YXIgaW1nSUQgPSAkaW1nLmF0dHIoJ2lkJyk7XHJcbiAgICAgICAgdmFyIGltZ0NsYXNzID0gJGltZy5hdHRyKCdjbGFzcycpO1xyXG4gICAgICAgIHZhciBpbWdVUkwgPSAkaW1nLmF0dHIoJ3NyYycpO1xyXG5cclxuICAgICAgICAkLmdldChpbWdVUkwsIGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgIHZhciAkc3ZnID0gJChkYXRhKS5maW5kKCdzdmcnKTtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBpbWdJRCAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgICAgICRzdmcgPSAkc3ZnLmF0dHIoJ2lkJywgaW1nSUQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgaW1nQ2xhc3MgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgICAgICAkc3ZnID0gJHN2Zy5hdHRyKCdjbGFzcycsIGltZ0NsYXNzICsgJyByZXBsYWNlZC1zdmcnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAkc3ZnID0gJHN2Zy5yZW1vdmVBdHRyKCd4bWxuczphJyk7XHJcbiAgICAgICAgICAgIGlmICghJHN2Zy5hdHRyKCd2aWV3Qm94JykgJiYgJHN2Zy5hdHRyKCdoZWlnaHQnKSAmJiAkc3ZnLmF0dHIoJ3dpZHRoJykpIHtcclxuICAgICAgICAgICAgICAgICRzdmcuYXR0cigndmlld0JveCcsICcwIDAgJyArICRzdmcuYXR0cignaGVpZ2h0JykgKyAnICcgKyAkc3ZnLmF0dHIoJ3dpZHRoJykpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgJGltZy5yZXBsYWNlV2l0aCgkc3ZnKTtcclxuICAgICAgICB9LCAneG1sJyk7XHJcbiAgICB9KTtcclxufSIsImZ1bmN0aW9uIGluaXRMYXp5UGljdHVyZSgpIHtcclxuICAgICQoJy5sYXp5JykubGF6eSh7XHJcbiAgICAgICAgZWZmZWN0OiAnZmFkZUluJyxcclxuICAgICAgICBlZmZlY3RUaW1lOiAyMDBcclxuICAgIH0pO1xyXG59IiwiZnVuY3Rpb24gaW5pdE1hc2tzKCkge1xyXG4gICAgLy8kKFwiLmpzLWRhdGVNYXNrXCIpLm1hc2soXCI5OS45OS45OVwiLHtwbGFjZWhvbGRlcjpcItCU0JQu0JzQnC7Qk9CTXCJ9KTtcclxuICAgICQoXCJpbnB1dFt0eXBlPSd0ZWwnXVwiKS5tYXNrKFwiKzcgKDAwMCkgMDAwLTAwMDBcIik7XHJcbn0iLCJmdW5jdGlvbiBpbml0UG9wdXBzKCkge1xyXG5cclxuICAgIC8vIE1hZ25pZmljIFBvcHVwXHJcbiAgICBsZXQgc3RhcnRXaW5kb3dTY3JvbGwgPSAwO1xyXG4gICAgJCgnLmpzLXBvcHVwJykubWFnbmlmaWNQb3B1cCh7XHJcbiAgICAgICAgdHlwZTogJ2lubGluZScsXHJcbiAgICAgICAgZml4ZWRDb250ZW50UG9zOiB0cnVlLFxyXG4gICAgICAgIGZpeGVkQmdQb3M6IHRydWUsXHJcbiAgICAgICAgb3ZlcmZsb3dZOiAnYXV0bycsXHJcbiAgICAgICAgY2xvc2VCdG5JbnNpZGU6IHRydWUsXHJcbiAgICAgICAgcHJlbG9hZGVyOiBmYWxzZSxcclxuICAgICAgICBtaWRDbGljazogdHJ1ZSxcclxuICAgICAgICByZW1vdmFsRGVsYXk6IDMwMCxcclxuICAgICAgICBtYWluQ2xhc3M6ICdwb3B1cC1idWJsZScsXHJcbiAgICAgICAgY2FsbGJhY2tzOiB7XHJcbiAgICAgICAgICAgIGJlZm9yZU9wZW46IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHN0YXJ0V2luZG93U2Nyb2xsID0gX3dpbmRvdy5zY3JvbGxUb3AoKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgY2xvc2U6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIF93aW5kb3cuc2Nyb2xsVG9wKHN0YXJ0V2luZG93U2Nyb2xsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vICQubWFnbmlmaWNQb3B1cC5jbG9zZSgpO1xyXG5cclxufSIsImZ1bmN0aW9uIGluaXRTZWxlY3RyaWMoKSB7XHJcbiAgICAkKCdzZWxlY3QnKS5zZWxlY3RyaWMoe1xyXG4gICAgICAgIG1heEhlaWdodDogMzAwLFxyXG4gICAgICAgIGFycm93QnV0dG9uTWFya3VwOiAnPGIgY2xhc3M9XCJidXR0b25cIj48L2I+JyxcclxuXHJcbiAgICAgICAgb25Jbml0OiBmdW5jdGlvbiAoZWxlbWVudCwgZGF0YSkge1xyXG4gICAgICAgICAgICB2YXIgJGVsbSA9ICQoZWxlbWVudCksXHJcbiAgICAgICAgICAgICAgICAkd3JhcHBlciA9ICRlbG0uY2xvc2VzdCgnLicgKyBkYXRhLmNsYXNzZXMud3JhcHBlcik7XHJcblxyXG4gICAgICAgICAgICAkd3JhcHBlci5maW5kKCcubGFiZWwnKS5odG1sKCRlbG0uYXR0cigncGxhY2Vob2xkZXInKSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBvbkJlZm9yZU9wZW46IGZ1bmN0aW9uIChlbGVtZW50LCBkYXRhKSB7XHJcbiAgICAgICAgICAgIHZhciAkZWxtID0gJChlbGVtZW50KSxcclxuICAgICAgICAgICAgICAgICR3cmFwcGVyID0gJGVsbS5jbG9zZXN0KCcuJyArIGRhdGEuY2xhc3Nlcy53cmFwcGVyKTtcclxuXHJcbiAgICAgICAgICAgICR3cmFwcGVyLmZpbmQoJy5sYWJlbCcpLmRhdGEoJ3ZhbHVlJywgJHdyYXBwZXIuZmluZCgnLmxhYmVsJykuaHRtbCgpKS5odG1sKCRlbG0uYXR0cigncGxhY2Vob2xkZXInKSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBvbkJlZm9yZUNsb3NlOiBmdW5jdGlvbiAoZWxlbWVudCwgZGF0YSkge1xyXG4gICAgICAgICAgICB2YXIgJGVsbSA9ICQoZWxlbWVudCksXHJcbiAgICAgICAgICAgICAgICAkd3JhcHBlciA9ICRlbG0uY2xvc2VzdCgnLicgKyBkYXRhLmNsYXNzZXMud3JhcHBlcik7XHJcblxyXG4gICAgICAgICAgICAkd3JhcHBlci5maW5kKCcubGFiZWwnKS5odG1sKCR3cmFwcGVyLmZpbmQoJy5sYWJlbCcpLmRhdGEoJ3ZhbHVlJykpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59IiwiZnVuY3Rpb24gaW5pdFNsaWRlcnMoKSB7XHJcblxyXG4gICAgbGV0IHNwb3RTVkcgPSBgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIxMzVcIiBoZWlnaHQ9XCIxMTdcIiB2aWV3Qm94PVwiMCAwIDEzNSAxMTdcIj48ZGVmcz48bWFzayBpZD1cImR5a3liXCIgd2lkdGg9XCIyLjAyXCIgaGVpZ2h0PVwiMi4wM1wiIHg9XCItMS4wMVwiIHk9XCItMS4wMVwiPjxwYXRoIGZpbGw9XCIjZmZmXCIgZD1cIk02LjcgMy43aDEyMS42djEwMy42SDYuN3pcIi8+PHBhdGggZD1cIk03MS4yNSAxMi4xOWM4LjkxMS0uOTUgMjMuNjI4LTEwLjY4OCAzNC42NS00LjE0NSA1LjIzIDIuNzI5IDguNzA4IDguNTcgOS44NCAxNS45MzcgMS40MDggNy4yMzQuNDY5IDE1Ljk5MSAzLjE4IDIxLjUwNyA0Ljk3NCAxMS4yODMgMTMuNTkzIDE1LjE0MS4yOSAyOS4wNjctMTAuMzggMTEuNzY1LTQyLjY4NCAzMy41OTctNTIuMDI0IDMwLjk3NC02LjUzMy0uMTEtMTAuMzk1LTMuNDU3LTE2LjM2LTcuMDU0LTUuNjY2LTMuNy0xMy40MzQtNy42NDgtMjAuNjk5LTExLjMzMUMxMy43MDcgNzkuNTM1IDUuNjIgNzMuMzkgOS4xMzEgNTkuOTQzYzIuMTI2LTEyLjI2IDguMTE0LTM2LjE3NSAyMS41MDctNDMuNjkyIDEyLjQ2LTkuNjg1IDMyLjMyMy0yLjk3MiA0MC42MTMtNC4wNjJ6XCIvPjwvbWFzaz48ZmlsdGVyIGlkPVwiZHlreWFcIiB3aWR0aD1cIjE1OVwiIGhlaWdodD1cIjE0NFwiIHg9XCItMTJcIiB5PVwiLTE1XCIgZmlsdGVyVW5pdHM9XCJ1c2VyU3BhY2VPblVzZVwiPjxmZU9mZnNldCBkeT1cIjNcIiBpbj1cIlNvdXJjZUdyYXBoaWNcIiByZXN1bHQ9XCJGZU9mZnNldDEwMjNPdXRcIi8+PGZlR2F1c3NpYW5CbHVyIGluPVwiRmVPZmZzZXQxMDIzT3V0XCIgcmVzdWx0PVwiRmVHYXVzc2lhbkJsdXIxMDI0T3V0XCIgc3RkRGV2aWF0aW9uPVwiMy40Nzk5OTk5OTk5OTk5OTk1IDMuNDc5OTk5OTk5OTk5OTk5NVwiLz48L2ZpbHRlcj48L2RlZnM+PGc+PGc+PGc+PHBhdGggZmlsbD1cIm5vbmVcIiBzdHJva2U9XCIjZmZmXCIgc3Ryb2tlLW9wYWNpdHk9XCIuMjNcIiBzdHJva2Utd2lkdGg9XCIyLjZcIiBkPVwiTTcxLjI1IDEyLjE5YzguOTExLS45NSAyMy42MjgtMTAuNjg4IDM0LjY1LTQuMTQ1IDUuMjMgMi43MjkgOC43MDggOC41NyA5Ljg0IDE1LjkzNyAxLjQwOCA3LjIzNC40NjkgMTUuOTkxIDMuMTggMjEuNTA3IDQuOTc0IDExLjI4MyAxMy41OTMgMTUuMTQxLjI5IDI5LjA2Ny0xMC4zOCAxMS43NjUtNDIuNjg0IDMzLjU5Ny01Mi4wMjQgMzAuOTc0LTYuNTMzLS4xMS0xMC4zOTUtMy40NTctMTYuMzYtNy4wNTQtNS42NjYtMy43LTEzLjQzNC03LjY0OC0yMC42OTktMTEuMzMxQzEzLjcwNyA3OS41MzUgNS42MiA3My4zOSA5LjEzMSA1OS45NDNjMi4xMjYtMTIuMjYgOC4xMTQtMzYuMTc1IDIxLjUwNy00My42OTIgMTIuNDYtOS42ODUgMzIuMzIzLTIuOTcyIDQwLjYxMy00LjA2MnpcIiBtYXNrPVwidXJsKCZxdW90OyNkeWt5YiZxdW90OylcIi8+PHBhdGggZmlsbD1cIiNmZmZcIiBmaWxsLW9wYWNpdHk9XCIuMjNcIiBkPVwiTTcxLjI1IDEyLjE5YzguOTExLS45NSAyMy42MjgtMTAuNjg4IDM0LjY1LTQuMTQ1IDUuMjMgMi43MjkgOC43MDggOC41NyA5Ljg0IDE1LjkzNyAxLjQwOCA3LjIzNC40NjkgMTUuOTkxIDMuMTggMjEuNTA3IDQuOTc0IDExLjI4MyAxMy41OTMgMTUuMTQxLjI5IDI5LjA2Ny0xMC4zOCAxMS43NjUtNDIuNjg0IDMzLjU5Ny01Mi4wMjQgMzAuOTc0LTYuNTMzLS4xMS0xMC4zOTUtMy40NTctMTYuMzYtNy4wNTQtNS42NjYtMy43LTEzLjQzNC03LjY0OC0yMC42OTktMTEuMzMxQzEzLjcwNyA3OS41MzUgNS42MiA3My4zOSA5LjEzMSA1OS45NDNjMi4xMjYtMTIuMjYgOC4xMTQtMzYuMTc1IDIxLjUwNy00My42OTIgMTIuNDYtOS42ODUgMzIuMzIzLTIuOTcyIDQwLjYxMy00LjA2MnpcIi8+PC9nPjxwYXRoIGZpbGw9XCIjZmZmXCIgZD1cIk03MS4yNSAxMi4xOWM4LjkxMS0uOTUgMjMuNjI4LTEwLjY4OCAzNC42NS00LjE0NSA1LjIzIDIuNzI5IDguNzA4IDguNTcgOS44NCAxNS45MzcgMS40MDggNy4yMzQuNDY5IDE1Ljk5MSAzLjE4IDIxLjUwNyA0Ljk3NCAxMS4yODMgMTMuNTkzIDE1LjE0MS4yOSAyOS4wNjctMTAuMzggMTEuNzY1LTQyLjY4NCAzMy41OTctNTIuMDI0IDMwLjk3NC02LjUzMy0uMTEtMTAuMzk1LTMuNDU3LTE2LjM2LTcuMDU0LTUuNjY2LTMuNy0xMy40MzQtNy42NDgtMjAuNjk5LTExLjMzMUMxMy43MDcgNzkuNTM1IDUuNjIgNzMuMzkgOS4xMzEgNTkuOTQzYzIuMTI2LTEyLjI2IDguMTE0LTM2LjE3NSAyMS41MDctNDMuNjkyIDEyLjQ2LTkuNjg1IDMyLjMyMy0yLjk3MiA0MC42MTMtNC4wNjJ6XCIvPjwvZz48L2c+PC9zdmc+YDtcclxuICAgIGxldCBhcnJvd1NWRyA9IGA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIiBpZD1cItCh0LvQvtC5XzFcIiBkYXRhLW5hbWU9XCLQodC70L7QuSAxXCIgdmlld0JveD1cIjAgMCAxMTAuNjggMzcuMjdcIj48ZGVmcz48Y2xpcFBhdGggaWQ9XCJjbGlwLXBhdGhcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoMCAwKVwiPjxyZWN0IHdpZHRoPVwiMTEwLjY4XCIgaGVpZ2h0PVwiMzcuMjdcIiBzdHlsZT1cImZpbGw6bm9uZVwiLz48L2NsaXBQYXRoPjwvZGVmcz48dGl0bGU+0JLQtdC60YLQvtGA0L3Ri9C5INGB0LzQsNGA0YIt0L7QsdGK0LXQutGCNjwvdGl0bGU+PGcgc3R5bGU9XCJjbGlwLXBhdGg6dXJsKCNjbGlwLXBhdGgpXCI+PHBhdGggZD1cIk0xMDguODMsMC4yOUE2Ny44OCw2Ny44OCwwLDAsMSw5Mi4xMSwxMi41OGExLjA3LDEuMDcsMCwwLDAsLjgyLDJsNi4xNy0xLjg1QzkyLjY3LDIxLjgyLDgzLDI3Ljc4LDcyLjM5LDMxLjI3Yy0xMC45LDMuNTktMjguMTIsNy45LTM3LjE1LTEuNTZBMTAuMTcsMTAuMTcsMCwwLDEsMzQsMjguMDljNS0uMzgsMTAuNTctMS43OCwxMy41Ny01LjkzLDIuNDUtMy4zOSwyLjcyLTguNjEtLjg3LTExLjM0QzM3LjQyLDMuNzYsMjcuNDUsMTcuMzQsMzAuNTEsMjYuMSwxOC44NSwyNS45Myw4LDE5LjczLDEuMiwxMC4yOWEwLjY0LDAuNjQsMCwwLDAtMS4xLjY0QTM2LjQzLDM2LjQzLDAsMCwwLDMxLjQ0LDI4LjE5YzYuMDksMTEuNTMsMjIuOCw5LjY3LDMzLjUzLDcuMzJDNzksMzIuNDUsOTIuNDYsMjUuNzksMTAwLjgyLDE0cTAsMy4yNS0uMDgsNi41YzAsMSwxLjU1LDEuNTUsMiwuNTRxNC4yMy05LjczLDcuODktMTkuNjlhMS4wOCwxLjA4LDAsMCwwLTEuNzktMU00MS40OSwxMS4zOGM3LjU1LDAsNi41OCw4LjYzLDIsMTEuNzctMywyLTcsMi43LTEwLjUsMi45LTIuMzUtNi4yOC42Ny0xNC42Myw4LjUxLTE0LjY3TTEwMi4yMywxMGExLDEsMCwwLDAtLjktMC4xN2wtMC44OC4yNkE2OS4zOSw2OS4zOSwwLDAsMCwxMDcsNC45NHEtMiw1LjExLTQuMDUsMTAuMTcsMC0yLjA5LjA1LTQuMTdhMSwxLDAsMCwwLS43NS0xXCIgdHJhbnNmb3JtPVwidHJhbnNsYXRlKDAgMClcIi8+PC9nPjwvc3ZnPmA7XHJcbiAgICBcclxuICAgIGxldCBwYWdpbmF0aW9uT2JqRGVza3RvcCA9IHtcclxuICAgICAgICBlbDogJy5zdGVwc19fcGFnaW5hdGlvbicsXHJcbiAgICAgICAgY2xpY2thYmxlOiB0cnVlLFxyXG4gICAgICAgIGJ1bGxldENsYXNzOiAnc3RlcHNfX2J1bGxldC13cmFwJyxcclxuICAgICAgICBidWxsZXRBY3RpdmVDbGFzczogJ3N0ZXBzX19idWxsZXQtd3JhcF9hY3RpdmUnLFxyXG4gICAgICAgIHJlbmRlckJ1bGxldDogZnVuY3Rpb24gKGluZGV4LCBjbGFzc05hbWUpIHtcclxuICAgICAgICAgICAgaW5kZXgrKztcclxuICAgICAgICAgICAgcmV0dXJuIGBcclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiJHtjbGFzc05hbWV9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJzdGVwc19fYnVsbGV0LWljb25cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJHtzcG90U1ZHfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInN0ZXBzX19idWxsZXQtY291bnRlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAke2luZGV4IDwgMTAgPyAnMCcgKyBpbmRleCA6IGluZGV4fVxyXG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInN0ZXBzX19idWxsZXQtYXJyb3dcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJHt3aW5kb3cuaW5uZXJXaWR0aCA8PSA5OTIgPyAnJyA6IGFycm93U1ZHfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgYDtcclxuICAgICAgICB9LFxyXG4gICAgfVxyXG5cclxuICAgIGxldCBwYWdpbmF0aW9uT2JqTW9iaWxlID0ge1xyXG4gICAgICAgIGVsOiAnLnN0ZXBzX19wYWdpbmF0aW9uLW1vYicsXHJcbiAgICAgICAgY2xpY2thYmxlOiB0cnVlLFxyXG4gICAgICAgIGJ1bGxldENsYXNzOiAnc3RlcHNfX2J1bGxldC1tb2InLFxyXG4gICAgICAgIGJ1bGxldEFjdGl2ZUNsYXNzOiAnc3RlcHNfX2J1bGxldC1tb2JfYWN0aXZlJyxcclxuICAgICAgICByZW5kZXJCdWxsZXQ6IGZ1bmN0aW9uIChpbmRleCwgY2xhc3NOYW1lKSB7XHJcbiAgICAgICAgICAgIGluZGV4Kys7XHJcbiAgICAgICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cIiR7Y2xhc3NOYW1lfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwic3RlcHNfX2J1bGxldC1tb2ItY291bnRlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAke2luZGV4IDwgMTAgPyAnMCcgKyBpbmRleCA6IGluZGV4fVxyXG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgYDtcclxuICAgICAgICB9LFxyXG4gICAgfVxyXG5cclxuICAgIGxldCBuYXZpZ2F0aW9uT2JqTW9iaWxlID0ge1xyXG4gICAgICAgIG5leHRFbDogJy5zdGVwc19fc2xpZGVyLWJ0bi1uZXh0JyxcclxuICAgICAgICBwcmV2RWw6ICcuc3RlcHNfX3NsaWRlci1idG4tcHJldicsXHJcbiAgICAgICAgZGlzYWJsZWRDbGFzczogJ3NsaWRlci1idG5fZGlzYWJsZWQnXHJcbiAgICB9XHJcbiAgICBcclxuICAgIGxldCBzdGVwc19fc2xpZGVyID0gbmV3IFN3aXBlcignLnN0ZXBzX19zbGlkZXInLCB7XHJcbiAgICAgICAgcGFnaW5hdGlvbjogd2luZG93LmlubmVyV2lkdGggPD0gNzY4ID8gcGFnaW5hdGlvbk9iak1vYmlsZSA6IHBhZ2luYXRpb25PYmpEZXNrdG9wLFxyXG4gICAgICAgIG5hdmlnYXRpb246IHdpbmRvdy5pbm5lcldpZHRoIDw9IDc2OCA/IG5hdmlnYXRpb25PYmpNb2JpbGUgOiB7fSxcclxuICAgICAgICBhdXRvSGVpZ2h0OiB0cnVlLFxyXG4gICAgfSk7XHJcbiAgICBcclxuICAgIGxldCBzdGVwc19fYnVsbGV0V3JhcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zdGVwc19fYnVsbGV0LXdyYXAnKTtcclxuICAgIGxldCBzdGVwc19fZG90ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnN0ZXBzX19kb3QnKTtcclxuICAgIHN0ZXBzX19idWxsZXRXcmFwLmZvckVhY2goKGN1cnJlbnQsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgY3VycmVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdGVwc19fZG90X2FjdGl2ZScpLmNsYXNzTGlzdC5yZW1vdmUoJ3N0ZXBzX19kb3RfYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIHN0ZXBzX19kb3RbaW5kZXhdLmNsYXNzTGlzdC5hZGQoJ3N0ZXBzX19kb3RfYWN0aXZlJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBmdW5jdGlvbiB0b2dnbGVQYWdpbmF0aW9uT25Nb2JpbGUoKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IHBhZ2luYXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3RlcHNfX3BhZ2luYXRpb24tbW9iJyk7XHJcbiAgICAgICAgbGV0IGJ1bGxldHMgPSBwYWdpbmF0aW9uLnF1ZXJ5U2VsZWN0b3JBbGwoJy5zdGVwc19fYnVsbGV0LW1vYicpO1xyXG4gICAgICAgIGxldCBsYXN0SW5kZXhFbGVtID0gYnVsbGV0cy5sZW5ndGggLSAxO1xyXG4gICAgICAgIGxldCBpc0RpcmVjdGlvblJldmVyc2UgPSBmYWxzZTtcclxuICAgICAgICBsZXQgcHJldkFjdGl2ZVNsaWRlID0gMFxyXG5cclxuICAgICAgICBmdW5jdGlvbiB0b2dnbGVEaXNwbGF5QnVsbGVzdChhcnJJbmRleGVzKSB7XHJcbiAgICAgICAgICAgIC8qINGB0LrRgNGL0LLQsNC10Lwg0LLRgdC1ICovXHJcbiAgICAgICAgICAgIGJ1bGxldHMuZm9yRWFjaChjdXJyZW50ID0+IHtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvKiDQv9C+0LrQsNC30YvQstCw0LXQvCDQvdGD0LbQvdGL0LUgKi9cclxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGFyckluZGV4ZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGJ1bGxldHNbYXJySW5kZXhlc1tpXV0uc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gdG9nZ2xlQnVsbGV0cygpIHtcclxuICAgICAgICAgICAgbGV0IGluZGV4QWN0aXZlU2xpZGUgPSBnZXRFbEluZGV4KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdGVwcyAuc3dpcGVyLXNsaWRlLWFjdGl2ZScpKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0ZXBzX19zbGlkZXJfX2NvdW50ZXInKS50ZXh0Q29udGVudCA9IGluZGV4QWN0aXZlU2xpZGUgKyAxIDwgMTAgPyAnMCcgKyAoaW5kZXhBY3RpdmVTbGlkZSArIDEpIDogaW5kZXhBY3RpdmVTbGlkZSArIDE7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZighKGluZGV4QWN0aXZlU2xpZGUgPT0gbGFzdEluZGV4RWxlbSB8fCBpbmRleEFjdGl2ZVNsaWRlID09IDApKSB7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmKGluZGV4QWN0aXZlU2xpZGUgPiBwcmV2QWN0aXZlU2xpZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBpc0RpcmVjdGlvblJldmVyc2UgPSBmYWxzZTsgIFxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpc0RpcmVjdGlvblJldmVyc2UgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBwcmV2QWN0aXZlU2xpZGUgPSBpbmRleEFjdGl2ZVNsaWRlO1xyXG5cclxuICAgICAgICAgICAgLyog0JrQvtCz0LTQsCDQvNGLINC70LjRgdGC0LDQtdC8INGB0L/RgNCw0LLQsCDQvdCw0LvQtdCy0L4uINCa0LDQuiDQvtCx0YvRh9C90L4g0L3QsCDRgdC70LDQudC00LXRgNCw0YUgKi9cclxuICAgICAgICAgICAgaWYoIWlzRGlyZWN0aW9uUmV2ZXJzZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIC8qINCa0L7Qs9C00LAg0LjQvdC00LXQutGBINC80LXQvdGM0YjQtSDQv9GA0LXQtNC/0L7RgdC70LXQtNC90LXQs9C+INGN0LvQtdC80LXQvdGC0L7QvCAgKi9cclxuICAgICAgICAgICAgICAgIGlmKGluZGV4QWN0aXZlU2xpZGUgPCBsYXN0SW5kZXhFbGVtIC0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRvZ2dsZURpc3BsYXlCdWxsZXN0KFtpbmRleEFjdGl2ZVNsaWRlICsgMSwgaW5kZXhBY3RpdmVTbGlkZSArIDJdKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICAgICAgLyog0JrQvtCz0LTQsCDQuNC90LTQtdC60YEg0YDQsNCy0LXQvSDQv9GA0LXQtNC/0L7RgdC70LXQtNC90LXQvNGDINGN0LvQtdC80LXQvdGC0YMgKi8gXHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmKGluZGV4QWN0aXZlU2xpZGUgPT0gbGFzdEluZGV4RWxlbSAtIDEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0b2dnbGVEaXNwbGF5QnVsbGVzdChbaW5kZXhBY3RpdmVTbGlkZSAtIDEsIGluZGV4QWN0aXZlU2xpZGUgKyAxXSk7XHJcbiAgICAgICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICAgICAgLyog0JrQvtCz0LTQsCDQuNC90LTQtdC60YEg0YDQsNCy0LXQvSDQv9C+0YHQu9C10LTQvdC10LzRgyDRjdC70LXQvNC10L3RgtGDICovXHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmKGluZGV4QWN0aXZlU2xpZGUgPT0gbGFzdEluZGV4RWxlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlzRGlyZWN0aW9uUmV2ZXJzZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9nZ2xlQnVsbGV0cygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgLyog0JrQvtCz0LTQsCDQvNGLINC70LjRgdGC0LDQtdC8INGB0LvQtdCy0LAg0L3QsNC/0YDQsNCy0L4gKNC+0LHRgNCw0YLQvdC+KSAqLyBcclxuICAgICAgICAgICAgZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgLyog0JrQvtCz0LTQsCDQuNC90LTQtdC60YEg0LHQvtC70YzRiNC1INC/0L7RgdC70LXQv9C10YDQstC+0LPQviDRjdC70LXQvNC10L3RgtCwICAqL1xyXG4gICAgICAgICAgICAgICAgaWYoaW5kZXhBY3RpdmVTbGlkZSA+IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0b2dnbGVEaXNwbGF5QnVsbGVzdChbaW5kZXhBY3RpdmVTbGlkZSAtIDEsIGluZGV4QWN0aXZlU2xpZGUgLSAyXSk7XHJcbiAgICAgICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICAgICAgLyog0JrQvtCz0LTQsCDQuNC90LTQtdC60YEg0YDQsNCy0LXQvSDQv9C+0YHQu9C10L/QtdGA0LLQvtC80YMg0Y3Qu9C10LzQtdC90YLRgyAqLyBcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYoaW5kZXhBY3RpdmVTbGlkZSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9nZ2xlRGlzcGxheUJ1bGxlc3QoW2luZGV4QWN0aXZlU2xpZGUgLSAxLCBpbmRleEFjdGl2ZVNsaWRlICsgMV0pO1xyXG4gICAgICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgICAgIC8qINCa0L7Qs9C00LAg0LjQvdC00LXQutGBINGA0LDQstC10L0g0L/QtdGA0LLQvtC80YMg0Y3Qu9C10LzQtdC90YLRgyAqL1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZihpbmRleEFjdGl2ZVNsaWRlID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBpc0RpcmVjdGlvblJldmVyc2UgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0b2dnbGVCdWxsZXRzKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGVwc19fc2xpZGVyLm9uKCdzbGlkZUNoYW5nZVRyYW5zaXRpb25TdGFydCcsIHRvZ2dsZUJ1bGxldHMpO1xyXG4gICAgICAgIHRvZ2dsZUJ1bGxldHMoKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgaWYod2luZG93LmlubmVyV2lkdGggPD0gNzY4KSB0b2dnbGVQYWdpbmF0aW9uT25Nb2JpbGUoKTtcclxuXHJcblxyXG4gICAgLyogZ2FsbGVyeSBzbGlkZXJzICovXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZ2FsbGVyeV9fc2xpZGVyJykuZm9yRWFjaChjdXJyZW50ID0+IHtcclxuICAgICAgICBuZXcgU3dpcGVyKGN1cnJlbnQsIHtcclxuICAgICAgICAgICAgbmF2aWdhdGlvbjoge1xyXG4gICAgICAgICAgICAgIG5leHRFbDogY3VycmVudC5jbG9zZXN0KCcuZ2FsbGVyeV9fd3JhcC1zbGlkZXInKS5xdWVyeVNlbGVjdG9yKCcuZ2FsbGVyeV9fc2xpZGVyLWJ0bi1uZXh0JyksXHJcbiAgICAgICAgICAgICAgcHJldkVsOiBjdXJyZW50LmNsb3Nlc3QoJy5nYWxsZXJ5X193cmFwLXNsaWRlcicpLnF1ZXJ5U2VsZWN0b3IoJy5nYWxsZXJ5X19zbGlkZXItYnRuLXByZXYnKSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAyMCxcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG4gICAgJC5mYW5jeWJveC5kZWZhdWx0cy5iYWNrRm9jdXMgPSBmYWxzZTtcclxuXHJcbn0iLCJmdW5jdGlvbiBpbnB1dE51bWJlcigpIHtcclxuXHJcbiAgICBsZXQgcGx1c0lucHV0TnVtYmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmlucHV0LWNvdW50ZXJfX3BsdXMnKTtcclxuICAgIGxldCBtaW51c0lucHV0TnVtYmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmlucHV0LWNvdW50ZXJfX21pbnVzJyk7XHJcblxyXG4gICAgbGV0IGNsYXNzV3JhcElucHV0TnVtYmVyID0gJy5pbnB1dC1jb3VudGVyJztcclxuICAgIGxldCBjbGFzc0lucHV0TnVtYmVyID0gJy5pbnB1dC1jb3VudGVyX19pbnB1dCc7XHJcblxyXG4gICAgcGx1c0lucHV0TnVtYmVyLmZvckVhY2goY3VycmVudCA9PiB7XHJcbiAgICAgICAgaW5jcmVtZW50X2RlY3JlbWVudChjdXJyZW50LCAncGx1cycpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgbWludXNJbnB1dE51bWJlci5mb3JFYWNoKGN1cnJlbnQgPT4ge1xyXG4gICAgICAgIGluY3JlbWVudF9kZWNyZW1lbnQoY3VycmVudCwgJ21pbnVzJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBmdW5jdGlvbiBpbmNyZW1lbnRfZGVjcmVtZW50KGN1cnJlbnQsIHNpZ24pIHtcclxuICAgICAgICBjdXJyZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCB0aGlzV3JhcCA9IGN1cnJlbnQuY2xvc2VzdChjbGFzc1dyYXBJbnB1dE51bWJlcik7XHJcbiAgICAgICAgICAgIGxldCB0aGlzSW5wdXQgPSB0aGlzV3JhcC5xdWVyeVNlbGVjdG9yKGNsYXNzSW5wdXROdW1iZXIpO1xyXG5cclxuICAgICAgICAgICAgaWYoc2lnbiA9PSAncGx1cycpIHtcclxuICAgICAgICAgICAgICAgIHRoaXNJbnB1dC52YWx1ZSsrO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZihzaWduID09ICdtaW51cycgJiYgdGhpc0lucHV0LnZhbHVlID4gMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpc0lucHV0LnZhbHVlLS07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG59IiwiZnVuY3Rpb24gbGF6eUxvYWRWaWRlbygpIHtcclxuICAgIGlmKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5LWJ0bicpKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IHBsYXlCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucGxheS1idG4nKTtcclxuICAgICAgICBsZXQgY2xhc3NXcmFwVmlkZW8gPSAnLmdhbGxlcnlfX3ZpZGVvLXNsaWRlJztcclxuXHJcbiAgICAgICAgcGxheUJ0bi5mb3JFYWNoKGN1cnJlbnQgPT4ge1xyXG4gICAgICAgICAgICBjdXJyZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgdGhpc1dyYXAgPSBjdXJyZW50LmNsb3Nlc3QoY2xhc3NXcmFwVmlkZW8pO1xyXG4gICAgICAgICAgICAgICAgbGV0IHRoaXNJZnJhbWUgPSB0aGlzV3JhcC5kYXRhc2V0LmlmcmFtZVZpZGVvO1xyXG4gICAgICAgICAgICAgICAgdGhpc1dyYXAuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCB0aGlzSWZyYW1lKVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG59IiwiZnVuY3Rpb24gbGVnYWN5U3VwcG9ydCgpIHtcclxuICAgIHN2ZzRldmVyeWJvZHkoKTtcclxufSIsImZ1bmN0aW9uIHBvbGl0aWNGaWxlKCkge1xyXG4gICAgXHJcbiAgICBcclxuXHJcbn0iLCJmdW5jdGlvbiBzY3JvbGxUb3AoKSB7XHJcbiAgICBfd2luZG93LnNjcm9sbChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKCQodGhpcykuc2Nyb2xsVG9wKCkgPiAyNTApIHtcclxuICAgICAgICAgICAgJCgnI2JhY2stdG9wJykuZmFkZUluKDMwMCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJCgnI2JhY2stdG9wJykuZmFkZU91dCgzMDApO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgICQoJyNiYWNrLXRvcCcpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkKFwiaHRtbCwgYm9keVwiKS5hbmltYXRlKHtcclxuICAgICAgICAgICAgc2Nyb2xsVG9wOiAwXHJcbiAgICAgICAgfSwgNzUwKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9KTtcclxufSIsImZ1bmN0aW9uIHNlY3Rpb25OYXZpZ2F0aW9uKCkge1xyXG4gICAgX2RvY3VtZW50XHJcbiAgICAgICAgLm9uKCdjbGljaycsICdbaHJlZj1cIiNcIl0nLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAub24oJ2NsaWNrJywgJ2FbaHJlZl49XCIjc2VjdGlvblwiXScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgbGV0IGVsID0gJCh0aGlzKS5hdHRyKCdocmVmJyk7XHJcbiAgICAgICAgICAgICQoJ2JvZHksIGh0bWwnKS5hbmltYXRlKHtcclxuICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogJChlbCkub2Zmc2V0KCkudG9wXHJcbiAgICAgICAgICAgIH0sIDEwMDApO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfSlcclxufSIsImZ1bmN0aW9uIHZoTW9kdWxlKCkge1xyXG5cclxuICAgIC8vIEZpcnN0IHdlIGdldCB0aGUgdmlld3BvcnQgaGVpZ2h0IGFuZCB3ZSBtdWx0aXBsZSBpdCBieSAxJSB0byBnZXQgYSB2YWx1ZSBmb3IgYSB2aCB1bml0XHJcbiAgICBsZXQgdmggPSB3aW5kb3cuaW5uZXJIZWlnaHQgKiAwLjAxO1xyXG4gICAgLy8gVGhlbiB3ZSBzZXQgdGhlIHZhbHVlIGluIHRoZSAtLXZoIGN1c3RvbSBwcm9wZXJ0eSB0byB0aGUgcm9vdCBvZiB0aGUgZG9jdW1lbnRcclxuICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS12aCcsIGAke3ZofXB4YCk7XHJcblxyXG4gICAgLy8gV2UgbGlzdGVuIHRvIHRoZSByZXNpemUgZXZlbnRcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCAoKSA9PiB7XHJcbiAgICAvLyBXZSBleGVjdXRlIHRoZSBzYW1lIHNjcmlwdCBhcyBiZWZvcmVcclxuICAgIGxldCB2aCA9IHdpbmRvdy5pbm5lckhlaWdodCAqIDAuMDE7XHJcbiAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoJy0tdmgnLCBgJHt2aH1weGApO1xyXG4gICAgLy8gaGVhZGVySGVpZ2h0RnVuKCk7XHJcbiAgICB9KTtcclxuXHJcbn0iXX0=
