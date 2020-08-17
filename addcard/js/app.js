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

    function Moon(card_number) {

        let arr = [];
        card_number = card_number.toString();
        for (let i = 0; i < card_number.length; i++) {
            if (i % 2 === 0) {
                let m = parseInt(card_number[i]) * 2;
                if (m > 9) {
                    arr.push(m - 9);
                } else {
                    arr.push(m);
                }
            } else {
                let n = parseInt(card_number[i]);
                arr.push(n)
            }
        }
        let summ = arr.reduce(function (a, b) {
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

        // убрать фокус
        document.activeElement.blur();

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
                        let currentMonth = d.getMonth()+1;
                        let currentYear = +d.getFullYear().toString().slice(-2);
                        // проверка срока действия 
                        if(!(+fieldValidity.value.slice(0,2) >= currentMonth && +fieldValidity.value.slice(-2) >= currentYear)) {
                            fieldValidity.classList.add('add-card__field_invalid');
                            fieldValidity.nextElementSibling.textContent = `*Срок действия истёк`;
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImluaXRNYXNrcy5qcyIsInZhbGlkRmllbGRzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsibGV0IF93aW5kb3cgPSAkKHdpbmRvdyk7XG5sZXQgX2RvY3VtZW50ID0gJChkb2N1bWVudCk7XG5cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcblxuICAgIGZ1bmN0aW9uIHBhZ2VSZWFkeSgpIHtcbiAgICAgICAgaW5pdE1hc2tzKCk7XG4gICAgICAgIHZhbGlkRmllbGRzKCk7XG4gICAgfVxuXG4gICAgcGFnZVJlYWR5KCk7XG5cbn0pOyIsImZ1bmN0aW9uIGluaXRNYXNrcygpIHtcclxuICAgICQoXCIuYWRkLWNhcmRfX2ZpZWxkLWNhcmRcIikubWFzayhcIjAwMDAgMDAwMCAwMDAwIDAwMDBcIik7XHJcbiAgICAkKFwiLmFkZC1jYXJkX19maWVsZC12YWxpZGl0eVwiKS5tYXNrKFwiMDAvMDBcIik7XHJcbiAgICAkKFwiLmFkZC1jYXJkX19maWVsZC1jdmMtY29kZVwiKS5tYXNrKFwiMDAwXCIpO1xyXG59IiwiZnVuY3Rpb24gdmFsaWRGaWVsZHMoKSB7XHJcblxyXG4gICAgbGV0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkLWNhcmRfX2Zvcm0nKTtcclxuICAgIGxldCBmaWVsZENhcmQgPSBmb3JtLnF1ZXJ5U2VsZWN0b3IoJy5hZGQtY2FyZF9fZmllbGQtY2FyZCcpO1xyXG4gICAgbGV0IGZpZWxkVmFsaWRpdHkgPSBmb3JtLnF1ZXJ5U2VsZWN0b3IoJy5hZGQtY2FyZF9fZmllbGQtdmFsaWRpdHknKTtcclxuICAgIGxldCBmaWVsZEN2Y0NvZGUgPSBmb3JtLnF1ZXJ5U2VsZWN0b3IoJy5hZGQtY2FyZF9fZmllbGQtY3ZjLWNvZGUnKTtcclxuICAgIGxldCBpc1ZhbGlkID0gdHJ1ZTtcclxuXHJcbiAgICBmdW5jdGlvbiBNb29uKGNhcmRfbnVtYmVyKSB7XHJcblxyXG4gICAgICAgIGxldCBhcnIgPSBbXTtcclxuICAgICAgICBjYXJkX251bWJlciA9IGNhcmRfbnVtYmVyLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjYXJkX251bWJlci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoaSAlIDIgPT09IDApIHtcclxuICAgICAgICAgICAgICAgIGxldCBtID0gcGFyc2VJbnQoY2FyZF9udW1iZXJbaV0pICogMjtcclxuICAgICAgICAgICAgICAgIGlmIChtID4gOSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFyci5wdXNoKG0gLSA5KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXJyLnB1c2gobSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbiA9IHBhcnNlSW50KGNhcmRfbnVtYmVyW2ldKTtcclxuICAgICAgICAgICAgICAgIGFyci5wdXNoKG4pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHN1bW0gPSBhcnIucmVkdWNlKGZ1bmN0aW9uIChhLCBiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBhICsgYjtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gQm9vbGVhbighKHN1bW0gJSAxMCkpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvLyDRgNCw0YHQv9C+0LfQvdC+0LLQsNC90LjQtSDQutCw0YDRgtGLXHJcbiAgICBmaWVsZENhcmQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZnVuY3Rpb24oKXtcclxuICAgICAgICBpZihmaWVsZENhcmQudmFsdWVbMF0gPT0gJzQnKSB7XHJcbiAgICAgICAgICAgIGZpZWxkQ2FyZC5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBgdXJsKCR7ZmllbGRDYXJkLmRhdGFzZXQuaW1nVmlzYX0pYDtcclxuICAgICAgICB9IGVsc2UgaWYoZmllbGRDYXJkLnZhbHVlWzBdID09ICc1Jykge1xyXG4gICAgICAgICAgICBmaWVsZENhcmQuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gYHVybCgke2ZpZWxkQ2FyZC5kYXRhc2V0LmltZ01hc3RlckNhcmR9KWA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBmaWVsZENhcmQuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gYGA7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8g0LLQsNC70LjQtNCw0YbQuNGPINGE0L7RgNC80YtcclxuICAgIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgLy8g0YPQsdGA0LDRgtGMINGE0L7QutGD0YFcclxuICAgICAgICBkb2N1bWVudC5hY3RpdmVFbGVtZW50LmJsdXIoKTtcclxuXHJcbiAgICAgICAgZm9ybS5jbGFzc0xpc3QuYWRkKCdmb3JtX2xvYWQnKTtcclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIC8vINC/0YDQvtCy0LXRgNGP0LXQvCDQutCw0YDRgtGDINC90LAg0L/Rg9GB0YLQvtGC0YNcclxuICAgICAgICAgICAgaWYoZmllbGRDYXJkLnZhbHVlLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgLy8g0L/RgNC+0LLQtdGA0Y/QtdC8INC60L7Qu9C40YfQtdGB0YLQstC+INGB0LjQvNCy0L7Qu9C+0LJcclxuICAgICAgICAgICAgICAgIGlmKGZpZWxkQ2FyZC52YWx1ZS5sZW5ndGggPT0gMTkpIHsgLy8gMTYg0YbQuNGE0YAgKyAzINC/0YDQvtCx0LXQu9CwXHJcbiAgICAgICAgICAgICAgICAgICAgLy8g0L/RgNC+0LLQtdGA0Y/QtdC8INGBINC/0L7QvNC+0YnRjNGOINCw0LvQs9C+0YDQuNGC0LzQsCDQm9GD0L3QsFxyXG4gICAgICAgICAgICAgICAgICAgIGxldCB2YWx1ZSA9IGZpZWxkQ2FyZC52YWx1ZS5yZXBsYWNlKC9cXHMrL2csICcnKVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKCFNb29uKHZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWVsZENhcmQuY2xhc3NMaXN0LmFkZCgnYWRkLWNhcmRfX2ZpZWxkX2ludmFsaWQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmllbGRDYXJkLm5leHRFbGVtZW50U2libGluZy50ZXh0Q29udGVudCA9IFwiKtCa0LDRgNGC0LAg0L3QtdCy0LDQu9C40LTQvdCw0Y9cIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNWYWxpZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGRDYXJkLmNsYXNzTGlzdC5hZGQoJ2FkZC1jYXJkX19maWVsZF9pbnZhbGlkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGRDYXJkLm5leHRFbGVtZW50U2libGluZy50ZXh0Q29udGVudCA9IFwiKtCd0LXQv9C+0LvQvdGL0Lkg0L3QvtC80LXRgFwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGlzVmFsaWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBmaWVsZENhcmQuY2xhc3NMaXN0LmFkZCgnYWRkLWNhcmRfX2ZpZWxkX2ludmFsaWQnKTtcclxuICAgICAgICAgICAgICAgIGZpZWxkQ2FyZC5uZXh0RWxlbWVudFNpYmxpbmcudGV4dENvbnRlbnQgPSBcIirQntCx0Y/Qt9Cw0YLQtdC70YzQvdC+0LUg0L/QvtC70LVcIjtcclxuICAgICAgICAgICAgICAgIGlzVmFsaWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIC8vINC/0YDQvtCy0LXRgNGP0LXQvCDRgdGA0L7QuiDQtNC10LnRgdGC0LLQuNGPINC90LAg0L/Rg9GB0YLQvtGC0YNcclxuICAgICAgICAgICAgaWYoZmllbGRWYWxpZGl0eS52YWx1ZS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIC8vINC/0YDQvtCy0LXRgNGP0LXQvCDRhNC+0YDQvNCwINC00LDRgtGLXHJcbiAgICAgICAgICAgICAgICBpZihmaWVsZFZhbGlkaXR5LnZhbHVlLmxlbmd0aCA9PSA1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g0L/RgNC+0LLQtdGA0Y/QtdC8INC80LXRgdGP0YZcclxuICAgICAgICAgICAgICAgICAgICBpZigrZmllbGRWYWxpZGl0eS52YWx1ZS5zbGljZSgwLDIpIDw9IDEyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkID0gbmV3IERhdGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGN1cnJlbnRNb250aCA9IGQuZ2V0TW9udGgoKSsxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY3VycmVudFllYXIgPSArZC5nZXRGdWxsWWVhcigpLnRvU3RyaW5nKCkuc2xpY2UoLTIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDQv9GA0L7QstC10YDQutCwINGB0YDQvtC60LAg0LTQtdC50YHRgtCy0LjRjyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoISgrZmllbGRWYWxpZGl0eS52YWx1ZS5zbGljZSgwLDIpID49IGN1cnJlbnRNb250aCAmJiArZmllbGRWYWxpZGl0eS52YWx1ZS5zbGljZSgtMikgPj0gY3VycmVudFllYXIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWVsZFZhbGlkaXR5LmNsYXNzTGlzdC5hZGQoJ2FkZC1jYXJkX19maWVsZF9pbnZhbGlkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWVsZFZhbGlkaXR5Lm5leHRFbGVtZW50U2libGluZy50ZXh0Q29udGVudCA9IGAq0KHRgNC+0Log0LTQtdC50YHRgtCy0LjRjyDQuNGB0YLRkdC6YDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzVmFsaWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkVmFsaWRpdHkuY2xhc3NMaXN0LmFkZCgnYWRkLWNhcmRfX2ZpZWxkX2ludmFsaWQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmllbGRWYWxpZGl0eS5uZXh0RWxlbWVudFNpYmxpbmcudGV4dENvbnRlbnQgPSBcIirQndC1INCx0L7Qu9GM0YjQtSAxMiDQvNC10YHRj9GG0LXQslwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc1ZhbGlkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBmaWVsZFZhbGlkaXR5LmNsYXNzTGlzdC5hZGQoJ2FkZC1jYXJkX19maWVsZF9pbnZhbGlkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGRWYWxpZGl0eS5uZXh0RWxlbWVudFNpYmxpbmcudGV4dENvbnRlbnQgPSBcIirQpNC+0YDQvNCw0YIg0LTQsNGC0Ysg0LzQvC/QtNC0XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNWYWxpZCA9IGZhbHNlOyBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGZpZWxkVmFsaWRpdHkuY2xhc3NMaXN0LmFkZCgnYWRkLWNhcmRfX2ZpZWxkX2ludmFsaWQnKTtcclxuICAgICAgICAgICAgICAgIGZpZWxkVmFsaWRpdHkubmV4dEVsZW1lbnRTaWJsaW5nLnRleHRDb250ZW50ID0gXCIq0J7QsdGP0LfQsNGC0LXQu9GM0L3QvtC1INC/0L7Qu9C1XCI7XHJcbiAgICAgICAgICAgICAgICBpc1ZhbGlkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICAvLyDQv9GA0L7QstC10YDRj9C10Lwg0YHRgNC+0Log0LrQvtC0IENWQyDQvdCwINC/0YPRgdGC0L7RgtGDXHJcbiAgICAgICAgICAgIGlmKGZpZWxkQ3ZjQ29kZS52YWx1ZS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIC8vINC/0YDQvtCy0LXRgNGP0LXQvCDQutC+0LvQuNGH0LXRgdGC0LLQviDRgdC40LzQstC+0LvQvtCyXHJcbiAgICAgICAgICAgICAgICBpZihmaWVsZEN2Y0NvZGUudmFsdWUubGVuZ3RoID09IDMpIHsgLy8gMTYg0YbQuNGE0YAgKyAzINC/0YDQvtCx0LXQu9CwXHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkQ3ZjQ29kZS5jbGFzc0xpc3QuYWRkKCdhZGQtY2FyZF9fZmllbGRfaW52YWxpZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkQ3ZjQ29kZS5uZXh0RWxlbWVudFNpYmxpbmcudGV4dENvbnRlbnQgPSBcIirQndC10L/QvtC70L3Ri9C5INC60L7QtFwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGlzVmFsaWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBmaWVsZEN2Y0NvZGUuY2xhc3NMaXN0LmFkZCgnYWRkLWNhcmRfX2ZpZWxkX2ludmFsaWQnKTtcclxuICAgICAgICAgICAgICAgIGZpZWxkQ3ZjQ29kZS5uZXh0RWxlbWVudFNpYmxpbmcudGV4dENvbnRlbnQgPSBcIirQntCx0Y/Qt9Cw0YLQtdC70YzQvdC+0LUg0L/QvtC70LVcIjtcclxuICAgICAgICAgICAgICAgIGlzVmFsaWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZm9ybS5jbGFzc0xpc3QucmVtb3ZlKCdmb3JtX2xvYWQnKTtcclxuICAgICAgICAgICAgaWYoaXNWYWxpZCkgYWxlcnQoJ9CS0LDRiNCwINC60LDRgNGC0LAg0YPRgdC/0LXRiNC90L4g0LTQvtCx0LDQstC70LXQvdCwIScpO1xyXG4gICAgICAgIH0sIDEwMDApO1xyXG5cclxuICAgIH0pO1xyXG5cclxuXHJcbiAgICAvLyDRgdCx0YDQvtGBINC/0L7Qu9C10Lkg0LTQu9GPINC/0L7QstGC0L7RgNC90L7Qs9C+INC30LDQv9C+0LvQvdC10L3QuNGPXHJcbiAgICBmaWVsZENhcmQuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCByZXNldEZpZWxkKTtcclxuICAgIGZpZWxkVmFsaWRpdHkuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCByZXNldEZpZWxkKTtcclxuICAgIGZpZWxkQ3ZjQ29kZS5hZGRFdmVudExpc3RlbmVyKCdmb2N1cycsIHJlc2V0RmllbGQpO1xyXG5cclxuICAgIGZ1bmN0aW9uIHJlc2V0RmllbGQoZSkge1xyXG4gICAgICAgIGlzVmFsaWQgPSB0cnVlO1xyXG4gICAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ2FkZC1jYXJkX19maWVsZF9pbnZhbGlkJyk7XHJcbiAgICAgICAgZS50YXJnZXQubmV4dEVsZW1lbnRTaWJsaW5nLnRleHRDb250ZW50ID0gXCJcIjtcclxuICAgIH1cclxuXHJcbn0iXX0=
