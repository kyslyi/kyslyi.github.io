let _window = $(window);
let _document = $(document);

$(document).ready(function () {

    function pageReady() {
        initMasks();
        validFields();
    }

    pageReady();

});
function initMasks() {
    $(".add-card__field-card").mask("0000 0000 0000 0000");
    $(".add-card__field-validity").mask("00/00");
    $(".add-card__field-cvc-code").mask("000");
}
function validFields() {

    let form = document.querySelector('.add-card__form');
    let fieldCard = form.querySelector('.add-card__field-card');
    let fieldValidity = form.querySelector('.add-card__field-validity');
    let fieldCvcCode = form.querySelector('.add-card__field-cvc-code');
    let isValid = true;

    Date.prototype.daysInMonth = function() {
		return 33 - new Date(this.getFullYear(), this.getMonth(), 33).getDate();
	};

    function Moon(card_number) {

        var arr = [],
            card_number = card_number.toString();
        for (var i = 0; i < card_number.length; i++) {
            if (i % 2 === 0) {
                var m = parseInt(card_number[i]) * 2;
                if (m > 9) {
                    arr.push(m - 9);
                } else {
                    arr.push(m);
                }
            } else {
                var n = parseInt(card_number[i]);
                arr.push(n)
            }
        }
        var summ = arr.reduce(function (a, b) {
            return a + b;
        });
        return Boolean(!(summ % 10));

    }

    // распознование карты
    fieldCard.addEventListener('change', function(){
        if(fieldCard.value[0] == '4') {
            fieldCard.style.backgroundImage = `url(${fieldCard.dataset.imgVisa})`;
        } else if(fieldCard.value[0] == '5') {
            fieldCard.style.backgroundImage = `url(${fieldCard.dataset.imgMasterCard})`;
        }
        else {
            fieldCard.style.backgroundImage = ``;
        }
    });

    // валидация формы
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        form.classList.add('form_load');
        setTimeout(function(){
            // проверяем карту на пустоту
            if(fieldCard.value.length) {
                // проверяем количество символов
                if(fieldCard.value.length == 19) { // 16 цифр + 3 пробела
                    // проверяем с помощью алгоритма Луна
                    let value = fieldCard.value.replace(/\s+/g, '')
                    if(!Moon(value)) {
                        fieldCard.classList.add('add-card__field_invalid');
                        fieldCard.nextElementSibling.textContent = "*Карта невалидная";
                        isValid = false;
                    }
                } else {
                    fieldCard.classList.add('add-card__field_invalid');
                    fieldCard.nextElementSibling.textContent = "*Неполный номер";
                    isValid = false;
                } 
            } else {
                fieldCard.classList.add('add-card__field_invalid');
                fieldCard.nextElementSibling.textContent = "*Обязательное поле";
                isValid = false;
            }


            // проверяем срок действия на пустоту
            if(fieldValidity.value.length) {
                // проверяем форма даты
                if(fieldValidity.value.length == 5) {
                    // проверяем месяц
                    if(+fieldValidity.value.slice(0,2) <= 12) {
                        let d = new Date();
                        d.setMonth(+fieldValidity.value.slice(0,2) - 1)
                        // проверка количества дней в месяце 
                        if(+fieldValidity.value.slice(-2) > d.daysInMonth()) {
                            fieldValidity.classList.add('add-card__field_invalid');
                            fieldValidity.nextElementSibling.textContent = `*В этом месяце ${d.daysInMonth()} суток`;
                            isValid = false;
                        }
                    } else {
                        fieldValidity.classList.add('add-card__field_invalid');
                        fieldValidity.nextElementSibling.textContent = "*Не больше 12 месяцев";
                        isValid = false;
                    }
                } else {
                    fieldValidity.classList.add('add-card__field_invalid');
                    fieldValidity.nextElementSibling.textContent = "*Формат даты мм/дд";
                    isValid = false; 
                }
            } else {
                fieldValidity.classList.add('add-card__field_invalid');
                fieldValidity.nextElementSibling.textContent = "*Обязательное поле";
                isValid = false;
            }


            // проверяем срок код CVC на пустоту
            if(fieldCvcCode.value.length) {
                // проверяем количество символов
                if(fieldCvcCode.value.length == 3) { // 16 цифр + 3 пробела
                    
                } else {
                    fieldCvcCode.classList.add('add-card__field_invalid');
                    fieldCvcCode.nextElementSibling.textContent = "*Неполный код";
                    isValid = false;
                } 
            } else {
                fieldCvcCode.classList.add('add-card__field_invalid');
                fieldCvcCode.nextElementSibling.textContent = "*Обязательное поле";
                isValid = false;
            }

            form.classList.remove('form_load');
            if(isValid) alert('Ваша карта успешно добавлена!');
        }, 1000);

    });


    // сброс полей для повторного заполнения
    fieldCard.addEventListener('focus', resetField);
    fieldValidity.addEventListener('focus', resetField);
    fieldCvcCode.addEventListener('focus', resetField);

    function resetField(e) {
        isValid = true;
        e.target.classList.remove('add-card__field_invalid');
        e.target.nextElementSibling.textContent = "";
    }

}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImluaXRNYXNrcy5qcyIsInZhbGlkRmllbGRzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsibGV0IF93aW5kb3cgPSAkKHdpbmRvdyk7XG5sZXQgX2RvY3VtZW50ID0gJChkb2N1bWVudCk7XG5cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcblxuICAgIGZ1bmN0aW9uIHBhZ2VSZWFkeSgpIHtcbiAgICAgICAgaW5pdE1hc2tzKCk7XG4gICAgICAgIHZhbGlkRmllbGRzKCk7XG4gICAgfVxuXG4gICAgcGFnZVJlYWR5KCk7XG5cbn0pOyIsImZ1bmN0aW9uIGluaXRNYXNrcygpIHtcclxuICAgICQoXCIuYWRkLWNhcmRfX2ZpZWxkLWNhcmRcIikubWFzayhcIjAwMDAgMDAwMCAwMDAwIDAwMDBcIik7XHJcbiAgICAkKFwiLmFkZC1jYXJkX19maWVsZC12YWxpZGl0eVwiKS5tYXNrKFwiMDAvMDBcIik7XHJcbiAgICAkKFwiLmFkZC1jYXJkX19maWVsZC1jdmMtY29kZVwiKS5tYXNrKFwiMDAwXCIpO1xyXG59IiwiZnVuY3Rpb24gdmFsaWRGaWVsZHMoKSB7XHJcblxyXG4gICAgbGV0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkLWNhcmRfX2Zvcm0nKTtcclxuICAgIGxldCBmaWVsZENhcmQgPSBmb3JtLnF1ZXJ5U2VsZWN0b3IoJy5hZGQtY2FyZF9fZmllbGQtY2FyZCcpO1xyXG4gICAgbGV0IGZpZWxkVmFsaWRpdHkgPSBmb3JtLnF1ZXJ5U2VsZWN0b3IoJy5hZGQtY2FyZF9fZmllbGQtdmFsaWRpdHknKTtcclxuICAgIGxldCBmaWVsZEN2Y0NvZGUgPSBmb3JtLnF1ZXJ5U2VsZWN0b3IoJy5hZGQtY2FyZF9fZmllbGQtY3ZjLWNvZGUnKTtcclxuICAgIGxldCBpc1ZhbGlkID0gdHJ1ZTtcclxuXHJcbiAgICBEYXRlLnByb3RvdHlwZS5kYXlzSW5Nb250aCA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0cmV0dXJuIDMzIC0gbmV3IERhdGUodGhpcy5nZXRGdWxsWWVhcigpLCB0aGlzLmdldE1vbnRoKCksIDMzKS5nZXREYXRlKCk7XHJcblx0fTtcclxuXHJcbiAgICBmdW5jdGlvbiBNb29uKGNhcmRfbnVtYmVyKSB7XHJcblxyXG4gICAgICAgIHZhciBhcnIgPSBbXSxcclxuICAgICAgICAgICAgY2FyZF9udW1iZXIgPSBjYXJkX251bWJlci50b1N0cmluZygpO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2FyZF9udW1iZXIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGkgJSAyID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbSA9IHBhcnNlSW50KGNhcmRfbnVtYmVyW2ldKSAqIDI7XHJcbiAgICAgICAgICAgICAgICBpZiAobSA+IDkpIHtcclxuICAgICAgICAgICAgICAgICAgICBhcnIucHVzaChtIC0gOSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGFyci5wdXNoKG0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdmFyIG4gPSBwYXJzZUludChjYXJkX251bWJlcltpXSk7XHJcbiAgICAgICAgICAgICAgICBhcnIucHVzaChuKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBzdW1tID0gYXJyLnJlZHVjZShmdW5jdGlvbiAoYSwgYikge1xyXG4gICAgICAgICAgICByZXR1cm4gYSArIGI7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIEJvb2xlYW4oIShzdW1tICUgMTApKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLy8g0YDQsNGB0L/QvtC30L3QvtCy0LDQvdC40LUg0LrQsNGA0YLRi1xyXG4gICAgZmllbGRDYXJkLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgaWYoZmllbGRDYXJkLnZhbHVlWzBdID09ICc0Jykge1xyXG4gICAgICAgICAgICBmaWVsZENhcmQuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gYHVybCgke2ZpZWxkQ2FyZC5kYXRhc2V0LmltZ1Zpc2F9KWA7XHJcbiAgICAgICAgfSBlbHNlIGlmKGZpZWxkQ2FyZC52YWx1ZVswXSA9PSAnNScpIHtcclxuICAgICAgICAgICAgZmllbGRDYXJkLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoJHtmaWVsZENhcmQuZGF0YXNldC5pbWdNYXN0ZXJDYXJkfSlgO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgZmllbGRDYXJkLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGBgO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vINCy0LDQu9C40LTQsNGG0LjRjyDRhNC+0YDQvNGLXHJcbiAgICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgIGZvcm0uY2xhc3NMaXN0LmFkZCgnZm9ybV9sb2FkJyk7XHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAvLyDQv9GA0L7QstC10YDRj9C10Lwg0LrQsNGA0YLRgyDQvdCwINC/0YPRgdGC0L7RgtGDXHJcbiAgICAgICAgICAgIGlmKGZpZWxkQ2FyZC52YWx1ZS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIC8vINC/0YDQvtCy0LXRgNGP0LXQvCDQutC+0LvQuNGH0LXRgdGC0LLQviDRgdC40LzQstC+0LvQvtCyXHJcbiAgICAgICAgICAgICAgICBpZihmaWVsZENhcmQudmFsdWUubGVuZ3RoID09IDE5KSB7IC8vIDE2INGG0LjRhNGAICsgMyDQv9GA0L7QsdC10LvQsFxyXG4gICAgICAgICAgICAgICAgICAgIC8vINC/0YDQvtCy0LXRgNGP0LXQvCDRgSDQv9C+0LzQvtGJ0YzRjiDQsNC70LPQvtGA0LjRgtC80LAg0JvRg9C90LBcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdmFsdWUgPSBmaWVsZENhcmQudmFsdWUucmVwbGFjZSgvXFxzKy9nLCAnJylcclxuICAgICAgICAgICAgICAgICAgICBpZighTW9vbih2YWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmllbGRDYXJkLmNsYXNzTGlzdC5hZGQoJ2FkZC1jYXJkX19maWVsZF9pbnZhbGlkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkQ2FyZC5uZXh0RWxlbWVudFNpYmxpbmcudGV4dENvbnRlbnQgPSBcIirQmtCw0YDRgtCwINC90LXQstCw0LvQuNC00L3QsNGPXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzVmFsaWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkQ2FyZC5jbGFzc0xpc3QuYWRkKCdhZGQtY2FyZF9fZmllbGRfaW52YWxpZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkQ2FyZC5uZXh0RWxlbWVudFNpYmxpbmcudGV4dENvbnRlbnQgPSBcIirQndC10L/QvtC70L3Ri9C5INC90L7QvNC10YBcIjtcclxuICAgICAgICAgICAgICAgICAgICBpc1ZhbGlkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZmllbGRDYXJkLmNsYXNzTGlzdC5hZGQoJ2FkZC1jYXJkX19maWVsZF9pbnZhbGlkJyk7XHJcbiAgICAgICAgICAgICAgICBmaWVsZENhcmQubmV4dEVsZW1lbnRTaWJsaW5nLnRleHRDb250ZW50ID0gXCIq0J7QsdGP0LfQsNGC0LXQu9GM0L3QvtC1INC/0L7Qu9C1XCI7XHJcbiAgICAgICAgICAgICAgICBpc1ZhbGlkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICAvLyDQv9GA0L7QstC10YDRj9C10Lwg0YHRgNC+0Log0LTQtdC50YHRgtCy0LjRjyDQvdCwINC/0YPRgdGC0L7RgtGDXHJcbiAgICAgICAgICAgIGlmKGZpZWxkVmFsaWRpdHkudmFsdWUubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAvLyDQv9GA0L7QstC10YDRj9C10Lwg0YTQvtGA0LzQsCDQtNCw0YLRi1xyXG4gICAgICAgICAgICAgICAgaWYoZmllbGRWYWxpZGl0eS52YWx1ZS5sZW5ndGggPT0gNSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vINC/0YDQvtCy0LXRgNGP0LXQvCDQvNC10YHRj9GGXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoK2ZpZWxkVmFsaWRpdHkudmFsdWUuc2xpY2UoMCwyKSA8PSAxMikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZCA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGQuc2V0TW9udGgoK2ZpZWxkVmFsaWRpdHkudmFsdWUuc2xpY2UoMCwyKSAtIDEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vINC/0YDQvtCy0LXRgNC60LAg0LrQvtC70LjRh9C10YHRgtCy0LAg0LTQvdC10Lkg0LIg0LzQtdGB0Y/RhtC1IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZigrZmllbGRWYWxpZGl0eS52YWx1ZS5zbGljZSgtMikgPiBkLmRheXNJbk1vbnRoKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkVmFsaWRpdHkuY2xhc3NMaXN0LmFkZCgnYWRkLWNhcmRfX2ZpZWxkX2ludmFsaWQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkVmFsaWRpdHkubmV4dEVsZW1lbnRTaWJsaW5nLnRleHRDb250ZW50ID0gYCrQkiDRjdGC0L7QvCDQvNC10YHRj9GG0LUgJHtkLmRheXNJbk1vbnRoKCl9INGB0YPRgtC+0LpgO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNWYWxpZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmllbGRWYWxpZGl0eS5jbGFzc0xpc3QuYWRkKCdhZGQtY2FyZF9fZmllbGRfaW52YWxpZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWVsZFZhbGlkaXR5Lm5leHRFbGVtZW50U2libGluZy50ZXh0Q29udGVudCA9IFwiKtCd0LUg0LHQvtC70YzRiNC1IDEyINC80LXRgdGP0YbQtdCyXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzVmFsaWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkVmFsaWRpdHkuY2xhc3NMaXN0LmFkZCgnYWRkLWNhcmRfX2ZpZWxkX2ludmFsaWQnKTtcclxuICAgICAgICAgICAgICAgICAgICBmaWVsZFZhbGlkaXR5Lm5leHRFbGVtZW50U2libGluZy50ZXh0Q29udGVudCA9IFwiKtCk0L7RgNC80LDRgiDQtNCw0YLRiyDQvNC8L9C00LRcIjtcclxuICAgICAgICAgICAgICAgICAgICBpc1ZhbGlkID0gZmFsc2U7IFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZmllbGRWYWxpZGl0eS5jbGFzc0xpc3QuYWRkKCdhZGQtY2FyZF9fZmllbGRfaW52YWxpZCcpO1xyXG4gICAgICAgICAgICAgICAgZmllbGRWYWxpZGl0eS5uZXh0RWxlbWVudFNpYmxpbmcudGV4dENvbnRlbnQgPSBcIirQntCx0Y/Qt9Cw0YLQtdC70YzQvdC+0LUg0L/QvtC70LVcIjtcclxuICAgICAgICAgICAgICAgIGlzVmFsaWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIC8vINC/0YDQvtCy0LXRgNGP0LXQvCDRgdGA0L7QuiDQutC+0LQgQ1ZDINC90LAg0L/Rg9GB0YLQvtGC0YNcclxuICAgICAgICAgICAgaWYoZmllbGRDdmNDb2RlLnZhbHVlLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgLy8g0L/RgNC+0LLQtdGA0Y/QtdC8INC60L7Qu9C40YfQtdGB0YLQstC+INGB0LjQvNCy0L7Qu9C+0LJcclxuICAgICAgICAgICAgICAgIGlmKGZpZWxkQ3ZjQ29kZS52YWx1ZS5sZW5ndGggPT0gMykgeyAvLyAxNiDRhtC40YTRgCArIDMg0L/RgNC+0LHQtdC70LBcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGRDdmNDb2RlLmNsYXNzTGlzdC5hZGQoJ2FkZC1jYXJkX19maWVsZF9pbnZhbGlkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGRDdmNDb2RlLm5leHRFbGVtZW50U2libGluZy50ZXh0Q29udGVudCA9IFwiKtCd0LXQv9C+0LvQvdGL0Lkg0LrQvtC0XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNWYWxpZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGZpZWxkQ3ZjQ29kZS5jbGFzc0xpc3QuYWRkKCdhZGQtY2FyZF9fZmllbGRfaW52YWxpZCcpO1xyXG4gICAgICAgICAgICAgICAgZmllbGRDdmNDb2RlLm5leHRFbGVtZW50U2libGluZy50ZXh0Q29udGVudCA9IFwiKtCe0LHRj9C30LDRgtC10LvRjNC90L7QtSDQv9C+0LvQtVwiO1xyXG4gICAgICAgICAgICAgICAgaXNWYWxpZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmb3JtLmNsYXNzTGlzdC5yZW1vdmUoJ2Zvcm1fbG9hZCcpO1xyXG4gICAgICAgICAgICBpZihpc1ZhbGlkKSBhbGVydCgn0JLQsNGI0LAg0LrQsNGA0YLQsCDRg9GB0L/QtdGI0L3QviDQtNC+0LHQsNCy0LvQtdC90LAhJyk7XHJcbiAgICAgICAgfSwgMTAwMCk7XHJcblxyXG4gICAgfSk7XHJcblxyXG5cclxuICAgIC8vINGB0LHRgNC+0YEg0L/QvtC70LXQuSDQtNC70Y8g0L/QvtCy0YLQvtGA0L3QvtCz0L4g0LfQsNC/0L7Qu9C90LXQvdC40Y9cclxuICAgIGZpZWxkQ2FyZC5hZGRFdmVudExpc3RlbmVyKCdmb2N1cycsIHJlc2V0RmllbGQpO1xyXG4gICAgZmllbGRWYWxpZGl0eS5hZGRFdmVudExpc3RlbmVyKCdmb2N1cycsIHJlc2V0RmllbGQpO1xyXG4gICAgZmllbGRDdmNDb2RlLmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgcmVzZXRGaWVsZCk7XHJcblxyXG4gICAgZnVuY3Rpb24gcmVzZXRGaWVsZChlKSB7XHJcbiAgICAgICAgaXNWYWxpZCA9IHRydWU7XHJcbiAgICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnYWRkLWNhcmRfX2ZpZWxkX2ludmFsaWQnKTtcclxuICAgICAgICBlLnRhcmdldC5uZXh0RWxlbWVudFNpYmxpbmcudGV4dENvbnRlbnQgPSBcIlwiO1xyXG4gICAgfVxyXG5cclxufSJdfQ==
