let _window = $(window);
let _document = $(document);

$(document).ready(function () {

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
        initLazyPicture();
        // кастомные скрипты
        scrollTop();
        sectionNavigation();
        initDatepicker();
    }

    pageReady();

});
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
function initDatepicker() {
    $('[data-toggle="datepicker"]').datepicker({
        startDate: Date,
        language: 'ru-RU',
        autoHide: true,
        format: 'dd.mm.yyyy',
        weekStart: 1,
        days: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
        daysShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        daysMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        monthsShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
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
function initSliders() {

  new Swiper('.our-project__slider', {
    navigation: {
      nextEl: '.our-project__button-next',
      prevEl: '.our-project__button-prev',
    },
    lazy: true,
    spaceBetween: 20,
    breakpoints: {
      992: {
        slidesPerView: 3,
      },
      568: {
        slidesPerView: 2,
      },
    }
  });

  new Swiper('.review__slider', {
    navigation: {
      nextEl: '.review__button-next',
      prevEl: '.review__button-prev',
    },
    // lazy: true,
    spaceBetween: 20,
  });

}
function legacySupport() {
    svg4everybody();
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImFjdGl2ZUhlYWRlclNjcm9sbC5qcyIsImZvcm1TZW5kLmpzIiwiaW1nVG9TdmcuanMiLCJpbml0RGF0ZXBpY2tlci5qcyIsImluaXRMYXp5UGljdHVyZS5qcyIsImluaXRNYXNrcy5qcyIsImluaXRQb3B1cHMuanMiLCJpbml0U2xpZGVycy5qcyIsImxlZ2FjeVN1cHBvcnQuanMiLCJzY3JvbGxUb3AuanMiLCJzZWN0aW9uTmF2aWdhdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzVCQTtBQUNBO0FBQ0E7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImxldCBfd2luZG93ID0gJCh3aW5kb3cpO1xubGV0IF9kb2N1bWVudCA9ICQoZG9jdW1lbnQpO1xuXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XG5cbiAgICBmdW5jdGlvbiBwYWdlUmVhZHkoKSB7XG4gICAgICAgIC8vINCy0YHQv9C+0LzQvtCz0LDRgtC10LvRjNC90YvQtSDRgdC60YDQuNC/0YLRiywg0LHQuNCx0LvQuNC+0YLQtdC60LhcbiAgICAgICAgbGVnYWN5U3VwcG9ydCgpO1xuICAgICAgICBpbWdUb1N2ZygpO1xuICAgICAgICBmb3JtU2VuZCgpO1xuICAgICAgICBhY3RpdmVIZWFkZXJTY3JvbGwoKTtcbiAgICAgICAgLy8g0LjQvdC40YbQuNCw0LvQuNC30LDRhtC40Y8g0LHQuNCx0LvQuNC+0YLQtdC6XG4gICAgICAgIGluaXRTbGlkZXJzKCk7XG4gICAgICAgIGluaXRQb3B1cHMoKTtcbiAgICAgICAgaW5pdE1hc2tzKCk7XG4gICAgICAgIGluaXRMYXp5UGljdHVyZSgpO1xuICAgICAgICAvLyDQutCw0YHRgtC+0LzQvdGL0LUg0YHQutGA0LjQv9GC0YtcbiAgICAgICAgc2Nyb2xsVG9wKCk7XG4gICAgICAgIHNlY3Rpb25OYXZpZ2F0aW9uKCk7XG4gICAgICAgIGluaXREYXRlcGlja2VyKCk7XG4gICAgfVxuXG4gICAgcGFnZVJlYWR5KCk7XG5cbn0pOyIsImZ1bmN0aW9uIGFjdGl2ZUhlYWRlclNjcm9sbCgpIHtcclxuXHJcbiAgICBsZXQgaGVhZGVyID0gJCgnLmhlYWRlcicpO1xyXG4gICAgX3dpbmRvdy5vbignc2Nyb2xsIGxvYWQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKF93aW5kb3cuc2Nyb2xsVG9wKCkgPj0gMTApIHtcclxuICAgICAgICAgICAgaGVhZGVyLmFkZENsYXNzKCdoZWFkZXJfc2Nyb2xsJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaGVhZGVyLnJlbW92ZUNsYXNzKCdoZWFkZXJfc2Nyb2xsJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG59IiwiZnVuY3Rpb24gZm9ybVNlbmQoKSB7XHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd3cGNmN21haWxzZW50JywgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgbGV0IGVsID0gJCgnI21vZGFsLWZvcm0tdG54Jyk7XHJcbiAgICAgICAgaWYgKGVsLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAkLm1hZ25pZmljUG9wdXAub3Blbih7XHJcbiAgICAgICAgICAgICAgICBpdGVtczoge1xyXG4gICAgICAgICAgICAgICAgICAgIHNyYzogZWxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB0eXBlOiAnaW5saW5lJyxcclxuICAgICAgICAgICAgICAgIGZpeGVkQ29udGVudFBvczogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGZpeGVkQmdQb3M6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBvdmVyZmxvd1k6ICdhdXRvJyxcclxuICAgICAgICAgICAgICAgIGNsb3NlQnRuSW5zaWRlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgcHJlbG9hZGVyOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIG1pZENsaWNrOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgcmVtb3ZhbERlbGF5OiAzMDAsXHJcbiAgICAgICAgICAgICAgICBtYWluQ2xhc3M6ICdwb3B1cC1idWJsZScsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0sIGZhbHNlKTtcclxufSIsImZ1bmN0aW9uIGltZ1RvU3ZnKCkge1xyXG4gICAgJCgnaW1nLnN2ZycpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciAkaW1nID0gJCh0aGlzKTtcclxuICAgICAgICB2YXIgaW1nSUQgPSAkaW1nLmF0dHIoJ2lkJyk7XHJcbiAgICAgICAgdmFyIGltZ0NsYXNzID0gJGltZy5hdHRyKCdjbGFzcycpO1xyXG4gICAgICAgIHZhciBpbWdVUkwgPSAkaW1nLmF0dHIoJ3NyYycpO1xyXG5cclxuICAgICAgICAkLmdldChpbWdVUkwsIGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgIHZhciAkc3ZnID0gJChkYXRhKS5maW5kKCdzdmcnKTtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBpbWdJRCAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgICAgICRzdmcgPSAkc3ZnLmF0dHIoJ2lkJywgaW1nSUQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgaW1nQ2xhc3MgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgICAgICAkc3ZnID0gJHN2Zy5hdHRyKCdjbGFzcycsIGltZ0NsYXNzICsgJyByZXBsYWNlZC1zdmcnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAkc3ZnID0gJHN2Zy5yZW1vdmVBdHRyKCd4bWxuczphJyk7XHJcbiAgICAgICAgICAgIGlmICghJHN2Zy5hdHRyKCd2aWV3Qm94JykgJiYgJHN2Zy5hdHRyKCdoZWlnaHQnKSAmJiAkc3ZnLmF0dHIoJ3dpZHRoJykpIHtcclxuICAgICAgICAgICAgICAgICRzdmcuYXR0cigndmlld0JveCcsICcwIDAgJyArICRzdmcuYXR0cignaGVpZ2h0JykgKyAnICcgKyAkc3ZnLmF0dHIoJ3dpZHRoJykpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgJGltZy5yZXBsYWNlV2l0aCgkc3ZnKTtcclxuICAgICAgICB9LCAneG1sJyk7XHJcbiAgICB9KTtcclxufSIsImZ1bmN0aW9uIGluaXREYXRlcGlja2VyKCkge1xyXG4gICAgJCgnW2RhdGEtdG9nZ2xlPVwiZGF0ZXBpY2tlclwiXScpLmRhdGVwaWNrZXIoe1xyXG4gICAgICAgIHN0YXJ0RGF0ZTogRGF0ZSxcclxuICAgICAgICBsYW5ndWFnZTogJ3J1LVJVJyxcclxuICAgICAgICBhdXRvSGlkZTogdHJ1ZSxcclxuICAgICAgICBmb3JtYXQ6ICdkZC5tbS55eXl5JyxcclxuICAgICAgICB3ZWVrU3RhcnQ6IDEsXHJcbiAgICAgICAgZGF5czogWyfQktC+0YHQutGA0LXRgdC10L3RjNC1JywgJ9Cf0L7QvdC10LTQtdC70YzQvdC40LonLCAn0JLRgtC+0YDQvdC40LonLCAn0KHRgNC10LTQsCcsICfQp9C10YLQstC10YDQsycsICfQn9GP0YLQvdC40YbQsCcsICfQodGD0LHQsdC+0YLQsCddLFxyXG4gICAgICAgIGRheXNTaG9ydDogWyfQktGBJywgJ9Cf0L0nLCAn0JLRgicsICfQodGAJywgJ9Cn0YInLCAn0J/RgicsICfQodCxJ10sXHJcbiAgICAgICAgZGF5c01pbjogWyfQktGBJywgJ9Cf0L0nLCAn0JLRgicsICfQodGAJywgJ9Cn0YInLCAn0J/RgicsICfQodCxJ10sXHJcbiAgICAgICAgbW9udGhzOiBbJ9Cv0L3QstCw0YDRjCcsICfQpNC10LLRgNCw0LvRjCcsICfQnNCw0YDRgicsICfQkNC/0YDQtdC70YwnLCAn0JzQsNC5JywgJ9CY0Y7QvdGMJywgJ9CY0Y7Qu9GMJywgJ9CQ0LLQs9GD0YHRgicsICfQodC10L3RgtGP0LHRgNGMJywgJ9Ce0LrRgtGP0LHRgNGMJywgJ9Cd0L7Rj9Cx0YDRjCcsICfQlNC10LrQsNCx0YDRjCddLFxyXG4gICAgICAgIG1vbnRoc1Nob3J0OiBbJ9Cv0L3QsicsICfQpNC10LInLCAn0JzQsNGAJywgJ9CQ0L/RgCcsICfQnNCw0LknLCAn0JjRjtC9JywgJ9CY0Y7QuycsICfQkNCy0LMnLCAn0KHQtdC9JywgJ9Ce0LrRgicsICfQndC+0Y8nLCAn0JTQtdC6J10sXHJcbiAgICAgIH0pO1xyXG59IiwiZnVuY3Rpb24gaW5pdExhenlQaWN0dXJlKCkge1xyXG4gICAgJCgnLmxhenknKS5sYXp5KHtcclxuICAgICAgICBlZmZlY3Q6ICdmYWRlSW4nLFxyXG4gICAgICAgIGVmZmVjdFRpbWU6IDIwMFxyXG4gICAgfSk7XHJcbn0iLCJmdW5jdGlvbiBpbml0TWFza3MoKSB7XHJcbiAgICAvLyQoXCIuanMtZGF0ZU1hc2tcIikubWFzayhcIjk5Ljk5Ljk5XCIse3BsYWNlaG9sZGVyOlwi0JTQlC7QnNCcLtCT0JNcIn0pO1xyXG4gICAgJChcImlucHV0W3R5cGU9J3RlbCddXCIpLm1hc2soXCIrNyAoMDAwKSAwMDAtMDAwMFwiKTtcclxufSIsImZ1bmN0aW9uIGluaXRQb3B1cHMoKSB7XHJcblxyXG4gICAgLy8gTWFnbmlmaWMgUG9wdXBcclxuICAgIGxldCBzdGFydFdpbmRvd1Njcm9sbCA9IDA7XHJcbiAgICAkKCcuanMtcG9wdXAnKS5tYWduaWZpY1BvcHVwKHtcclxuICAgICAgICB0eXBlOiAnaW5saW5lJyxcclxuICAgICAgICBmaXhlZENvbnRlbnRQb3M6IHRydWUsXHJcbiAgICAgICAgZml4ZWRCZ1BvczogdHJ1ZSxcclxuICAgICAgICBvdmVyZmxvd1k6ICdhdXRvJyxcclxuICAgICAgICBjbG9zZUJ0bkluc2lkZTogdHJ1ZSxcclxuICAgICAgICBwcmVsb2FkZXI6IGZhbHNlLFxyXG4gICAgICAgIG1pZENsaWNrOiB0cnVlLFxyXG4gICAgICAgIHJlbW92YWxEZWxheTogMzAwLFxyXG4gICAgICAgIG1haW5DbGFzczogJ3BvcHVwLWJ1YmxlJyxcclxuICAgICAgICBjYWxsYmFja3M6IHtcclxuICAgICAgICAgICAgYmVmb3JlT3BlbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgc3RhcnRXaW5kb3dTY3JvbGwgPSBfd2luZG93LnNjcm9sbFRvcCgpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBjbG9zZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgX3dpbmRvdy5zY3JvbGxUb3Aoc3RhcnRXaW5kb3dTY3JvbGwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gJC5tYWduaWZpY1BvcHVwLmNsb3NlKCk7XHJcblxyXG59IiwiZnVuY3Rpb24gaW5pdFNsaWRlcnMoKSB7XHJcblxyXG4gIG5ldyBTd2lwZXIoJy5vdXItcHJvamVjdF9fc2xpZGVyJywge1xyXG4gICAgbmF2aWdhdGlvbjoge1xyXG4gICAgICBuZXh0RWw6ICcub3VyLXByb2plY3RfX2J1dHRvbi1uZXh0JyxcclxuICAgICAgcHJldkVsOiAnLm91ci1wcm9qZWN0X19idXR0b24tcHJldicsXHJcbiAgICB9LFxyXG4gICAgbGF6eTogdHJ1ZSxcclxuICAgIHNwYWNlQmV0d2VlbjogMjAsXHJcbiAgICBicmVha3BvaW50czoge1xyXG4gICAgICA5OTI6IHtcclxuICAgICAgICBzbGlkZXNQZXJWaWV3OiAzLFxyXG4gICAgICB9LFxyXG4gICAgICA1Njg6IHtcclxuICAgICAgICBzbGlkZXNQZXJWaWV3OiAyLFxyXG4gICAgICB9LFxyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICBuZXcgU3dpcGVyKCcucmV2aWV3X19zbGlkZXInLCB7XHJcbiAgICBuYXZpZ2F0aW9uOiB7XHJcbiAgICAgIG5leHRFbDogJy5yZXZpZXdfX2J1dHRvbi1uZXh0JyxcclxuICAgICAgcHJldkVsOiAnLnJldmlld19fYnV0dG9uLXByZXYnLFxyXG4gICAgfSxcclxuICAgIC8vIGxhenk6IHRydWUsXHJcbiAgICBzcGFjZUJldHdlZW46IDIwLFxyXG4gIH0pO1xyXG5cclxufSIsImZ1bmN0aW9uIGxlZ2FjeVN1cHBvcnQoKSB7XHJcbiAgICBzdmc0ZXZlcnlib2R5KCk7XHJcbn0iLCJmdW5jdGlvbiBzY3JvbGxUb3AoKSB7XHJcbiAgICBfd2luZG93LnNjcm9sbChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKCQodGhpcykuc2Nyb2xsVG9wKCkgPiAyNTApIHtcclxuICAgICAgICAgICAgJCgnI2JhY2stdG9wJykuZmFkZUluKDMwMCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJCgnI2JhY2stdG9wJykuZmFkZU91dCgzMDApO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgICQoJyNiYWNrLXRvcCcpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkKFwiaHRtbCwgYm9keVwiKS5hbmltYXRlKHtcclxuICAgICAgICAgICAgc2Nyb2xsVG9wOiAwXHJcbiAgICAgICAgfSwgNzUwKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9KTtcclxufSIsImZ1bmN0aW9uIHNlY3Rpb25OYXZpZ2F0aW9uKCkge1xyXG4gICAgX2RvY3VtZW50XHJcbiAgICAgICAgLm9uKCdjbGljaycsICdbaHJlZj1cIiNcIl0nLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAub24oJ2NsaWNrJywgJ2FbaHJlZl49XCIjc2VjdGlvblwiXScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgbGV0IGVsID0gJCh0aGlzKS5hdHRyKCdocmVmJyk7XHJcbiAgICAgICAgICAgICQoJ2JvZHksIGh0bWwnKS5hbmltYXRlKHtcclxuICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogJChlbCkub2Zmc2V0KCkudG9wXHJcbiAgICAgICAgICAgIH0sIDEwMDApO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfSlcclxufSJdfQ==
