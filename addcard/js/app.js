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
  
    let form = document.querySelector('.add-card__form');
    let fieldCard = form.querySelector('.add-card__field-card');
    let fieldValidity = form.querySelector('.add-card__field-validity');
    let fieldCvcCode = form.querySelector('.add-card__field-cvc-code');
    let isValid = true;

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

        if(isValid) alert('Ваша карта успешно добавлена!');
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImluaXRNYXNrcy5qcyIsInZhbGlkRmllbGRzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgX3dpbmRvdyA9ICQod2luZG93KTtcbmxldCBfZG9jdW1lbnQgPSAkKGRvY3VtZW50KTtcblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuXG4gICAgZnVuY3Rpb24gcGFnZVJlYWR5KCkge1xuICAgICAgICBpbml0TWFza3MoKTtcbiAgICAgICAgdmFsaWRGaWVsZHMoKTtcbiAgICB9XG5cbiAgICBwYWdlUmVhZHkoKTtcblxufSk7IiwiZnVuY3Rpb24gaW5pdE1hc2tzKCkge1xyXG4gICAgJChcIi5hZGQtY2FyZF9fZmllbGQtY2FyZFwiKS5tYXNrKFwiMDAwMCAwMDAwIDAwMDAgMDAwMFwiKTtcclxuICAgICQoXCIuYWRkLWNhcmRfX2ZpZWxkLXZhbGlkaXR5XCIpLm1hc2soXCIwMC8wMFwiKTtcclxuICAgICQoXCIuYWRkLWNhcmRfX2ZpZWxkLWN2Yy1jb2RlXCIpLm1hc2soXCIwMDBcIik7XHJcbn0iLCJmdW5jdGlvbiB2YWxpZEZpZWxkcygpIHtcclxuXHJcbiAgICBEYXRlLnByb3RvdHlwZS5kYXlzSW5Nb250aCA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0cmV0dXJuIDMzIC0gbmV3IERhdGUodGhpcy5nZXRGdWxsWWVhcigpLCB0aGlzLmdldE1vbnRoKCksIDMzKS5nZXREYXRlKCk7XHJcblx0fTtcclxuXHJcbiAgICBmdW5jdGlvbiBNb29uKGNhcmRfbnVtYmVyKSB7XHJcblxyXG4gICAgICAgIHZhciBhcnIgPSBbXSxcclxuICAgICAgICAgICAgY2FyZF9udW1iZXIgPSBjYXJkX251bWJlci50b1N0cmluZygpO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2FyZF9udW1iZXIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGkgJSAyID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbSA9IHBhcnNlSW50KGNhcmRfbnVtYmVyW2ldKSAqIDI7XHJcbiAgICAgICAgICAgICAgICBpZiAobSA+IDkpIHtcclxuICAgICAgICAgICAgICAgICAgICBhcnIucHVzaChtIC0gOSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGFyci5wdXNoKG0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdmFyIG4gPSBwYXJzZUludChjYXJkX251bWJlcltpXSk7XHJcbiAgICAgICAgICAgICAgICBhcnIucHVzaChuKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBzdW1tID0gYXJyLnJlZHVjZShmdW5jdGlvbiAoYSwgYikge1xyXG4gICAgICAgICAgICByZXR1cm4gYSArIGI7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIEJvb2xlYW4oIShzdW1tICUgMTApKTtcclxuXHJcbiAgICB9XHJcbiAgXHJcbiAgICBsZXQgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGQtY2FyZF9fZm9ybScpO1xyXG4gICAgbGV0IGZpZWxkQ2FyZCA9IGZvcm0ucXVlcnlTZWxlY3RvcignLmFkZC1jYXJkX19maWVsZC1jYXJkJyk7XHJcbiAgICBsZXQgZmllbGRWYWxpZGl0eSA9IGZvcm0ucXVlcnlTZWxlY3RvcignLmFkZC1jYXJkX19maWVsZC12YWxpZGl0eScpO1xyXG4gICAgbGV0IGZpZWxkQ3ZjQ29kZSA9IGZvcm0ucXVlcnlTZWxlY3RvcignLmFkZC1jYXJkX19maWVsZC1jdmMtY29kZScpO1xyXG4gICAgbGV0IGlzVmFsaWQgPSB0cnVlO1xyXG5cclxuICAgIC8vINGA0LDRgdC/0L7Qt9C90L7QstCw0L3QuNC1INC60LDRgNGC0YtcclxuICAgIGZpZWxkQ2FyZC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xyXG4gICAgICAgIGlmKGZpZWxkQ2FyZC52YWx1ZVswXSA9PSAnNCcpIHtcclxuICAgICAgICAgICAgZmllbGRDYXJkLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoJHtmaWVsZENhcmQuZGF0YXNldC5pbWdWaXNhfSlgO1xyXG4gICAgICAgIH0gZWxzZSBpZihmaWVsZENhcmQudmFsdWVbMF0gPT0gJzUnKSB7XHJcbiAgICAgICAgICAgIGZpZWxkQ2FyZC5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBgdXJsKCR7ZmllbGRDYXJkLmRhdGFzZXQuaW1nTWFzdGVyQ2FyZH0pYDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGZpZWxkQ2FyZC5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBgYDtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyDQstCw0LvQuNC00LDRhtC40Y8g0YTQvtGA0LzRi1xyXG4gICAgZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAvLyDQv9GA0L7QstC10YDRj9C10Lwg0LrQsNGA0YLRgyDQvdCwINC/0YPRgdGC0L7RgtGDXHJcbiAgICAgICAgaWYoZmllbGRDYXJkLnZhbHVlLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAvLyDQv9GA0L7QstC10YDRj9C10Lwg0LrQvtC70LjRh9C10YHRgtCy0L4g0YHQuNC80LLQvtC70L7QslxyXG4gICAgICAgICAgICBpZihmaWVsZENhcmQudmFsdWUubGVuZ3RoID09IDE5KSB7IC8vIDE2INGG0LjRhNGAICsgMyDQv9GA0L7QsdC10LvQsFxyXG4gICAgICAgICAgICAgICAgLy8g0L/RgNC+0LLQtdGA0Y/QtdC8INGBINC/0L7QvNC+0YnRjNGOINCw0LvQs9C+0YDQuNGC0LzQsCDQm9GD0L3QsFxyXG4gICAgICAgICAgICAgICAgbGV0IHZhbHVlID0gZmllbGRDYXJkLnZhbHVlLnJlcGxhY2UoL1xccysvZywgJycpXHJcbiAgICAgICAgICAgICAgICBpZighTW9vbih2YWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBmaWVsZENhcmQuY2xhc3NMaXN0LmFkZCgnYWRkLWNhcmRfX2ZpZWxkX2ludmFsaWQnKTtcclxuICAgICAgICAgICAgICAgICAgICBmaWVsZENhcmQubmV4dEVsZW1lbnRTaWJsaW5nLnRleHRDb250ZW50ID0gXCIq0JrQsNGA0YLQsCDQvdC10LLQsNC70LjQtNC90LDRj1wiO1xyXG4gICAgICAgICAgICAgICAgICAgIGlzVmFsaWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGZpZWxkQ2FyZC5jbGFzc0xpc3QuYWRkKCdhZGQtY2FyZF9fZmllbGRfaW52YWxpZCcpO1xyXG4gICAgICAgICAgICAgICAgZmllbGRDYXJkLm5leHRFbGVtZW50U2libGluZy50ZXh0Q29udGVudCA9IFwiKtCd0LXQv9C+0LvQvdGL0Lkg0L3QvtC80LXRgFwiO1xyXG4gICAgICAgICAgICAgICAgaXNWYWxpZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGZpZWxkQ2FyZC5jbGFzc0xpc3QuYWRkKCdhZGQtY2FyZF9fZmllbGRfaW52YWxpZCcpO1xyXG4gICAgICAgICAgICBmaWVsZENhcmQubmV4dEVsZW1lbnRTaWJsaW5nLnRleHRDb250ZW50ID0gXCIq0J7QsdGP0LfQsNGC0LXQu9GM0L3QvtC1INC/0L7Qu9C1XCI7XHJcbiAgICAgICAgICAgIGlzVmFsaWQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAvLyDQv9GA0L7QstC10YDRj9C10Lwg0YHRgNC+0Log0LTQtdC50YHRgtCy0LjRjyDQvdCwINC/0YPRgdGC0L7RgtGDXHJcbiAgICAgICAgaWYoZmllbGRWYWxpZGl0eS52YWx1ZS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgLy8g0L/RgNC+0LLQtdGA0Y/QtdC8INGE0L7RgNC80LAg0LTQsNGC0YtcclxuICAgICAgICAgICAgaWYoZmllbGRWYWxpZGl0eS52YWx1ZS5sZW5ndGggPT0gNSkge1xyXG4gICAgICAgICAgICAgICAgLy8g0L/RgNC+0LLQtdGA0Y/QtdC8INC80LXRgdGP0YZcclxuICAgICAgICAgICAgICAgIGlmKCtmaWVsZFZhbGlkaXR5LnZhbHVlLnNsaWNlKDAsMikgPD0gMTIpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZCA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZC5zZXRNb250aCgrZmllbGRWYWxpZGl0eS52YWx1ZS5zbGljZSgwLDIpIC0gMSlcclxuICAgICAgICAgICAgICAgICAgICAvLyDQv9GA0L7QstC10YDQutCwINC60L7Qu9C40YfQtdGB0YLQstCwINC00L3QtdC5INCyINC80LXRgdGP0YbQtSBcclxuICAgICAgICAgICAgICAgICAgICBpZigrZmllbGRWYWxpZGl0eS52YWx1ZS5zbGljZSgtMikgPiBkLmRheXNJbk1vbnRoKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmllbGRWYWxpZGl0eS5jbGFzc0xpc3QuYWRkKCdhZGQtY2FyZF9fZmllbGRfaW52YWxpZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWVsZFZhbGlkaXR5Lm5leHRFbGVtZW50U2libGluZy50ZXh0Q29udGVudCA9IGAq0JIg0Y3RgtC+0Lwg0LzQtdGB0Y/RhtC1ICR7ZC5kYXlzSW5Nb250aCgpfSDRgdGD0YLQvtC6YDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNWYWxpZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGRWYWxpZGl0eS5jbGFzc0xpc3QuYWRkKCdhZGQtY2FyZF9fZmllbGRfaW52YWxpZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkVmFsaWRpdHkubmV4dEVsZW1lbnRTaWJsaW5nLnRleHRDb250ZW50ID0gXCIq0J3QtSDQsdC+0LvRjNGI0LUgMTIg0LzQtdGB0Y/RhtC10LJcIjtcclxuICAgICAgICAgICAgICAgICAgICBpc1ZhbGlkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBmaWVsZFZhbGlkaXR5LmNsYXNzTGlzdC5hZGQoJ2FkZC1jYXJkX19maWVsZF9pbnZhbGlkJyk7XHJcbiAgICAgICAgICAgICAgICBmaWVsZFZhbGlkaXR5Lm5leHRFbGVtZW50U2libGluZy50ZXh0Q29udGVudCA9IFwiKtCk0L7RgNC80LDRgiDQtNCw0YLRiyDQvNC8L9C00LRcIjtcclxuICAgICAgICAgICAgICAgIGlzVmFsaWQgPSBmYWxzZTsgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBmaWVsZFZhbGlkaXR5LmNsYXNzTGlzdC5hZGQoJ2FkZC1jYXJkX19maWVsZF9pbnZhbGlkJyk7XHJcbiAgICAgICAgICAgIGZpZWxkVmFsaWRpdHkubmV4dEVsZW1lbnRTaWJsaW5nLnRleHRDb250ZW50ID0gXCIq0J7QsdGP0LfQsNGC0LXQu9GM0L3QvtC1INC/0L7Qu9C1XCI7XHJcbiAgICAgICAgICAgIGlzVmFsaWQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAvLyDQv9GA0L7QstC10YDRj9C10Lwg0YHRgNC+0Log0LrQvtC0IENWQyDQvdCwINC/0YPRgdGC0L7RgtGDXHJcbiAgICAgICAgaWYoZmllbGRDdmNDb2RlLnZhbHVlLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAvLyDQv9GA0L7QstC10YDRj9C10Lwg0LrQvtC70LjRh9C10YHRgtCy0L4g0YHQuNC80LLQvtC70L7QslxyXG4gICAgICAgICAgICBpZihmaWVsZEN2Y0NvZGUudmFsdWUubGVuZ3RoID09IDMpIHsgLy8gMTYg0YbQuNGE0YAgKyAzINC/0YDQvtCx0LXQu9CwXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGZpZWxkQ3ZjQ29kZS5jbGFzc0xpc3QuYWRkKCdhZGQtY2FyZF9fZmllbGRfaW52YWxpZCcpO1xyXG4gICAgICAgICAgICAgICAgZmllbGRDdmNDb2RlLm5leHRFbGVtZW50U2libGluZy50ZXh0Q29udGVudCA9IFwiKtCd0LXQv9C+0LvQvdGL0Lkg0LrQvtC0XCI7XHJcbiAgICAgICAgICAgICAgICBpc1ZhbGlkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZmllbGRDdmNDb2RlLmNsYXNzTGlzdC5hZGQoJ2FkZC1jYXJkX19maWVsZF9pbnZhbGlkJyk7XHJcbiAgICAgICAgICAgIGZpZWxkQ3ZjQ29kZS5uZXh0RWxlbWVudFNpYmxpbmcudGV4dENvbnRlbnQgPSBcIirQntCx0Y/Qt9Cw0YLQtdC70YzQvdC+0LUg0L/QvtC70LVcIjtcclxuICAgICAgICAgICAgaXNWYWxpZCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoaXNWYWxpZCkgYWxlcnQoJ9CS0LDRiNCwINC60LDRgNGC0LAg0YPRgdC/0LXRiNC90L4g0LTQvtCx0LDQstC70LXQvdCwIScpO1xyXG4gICAgfSk7XHJcblxyXG5cclxuICAgIC8vINGB0LHRgNC+0YEg0L/QvtC70LXQuSDQtNC70Y8g0L/QvtCy0YLQvtGA0L3QvtCz0L4g0LfQsNC/0L7Qu9C90LXQvdC40Y9cclxuICAgIGZpZWxkQ2FyZC5hZGRFdmVudExpc3RlbmVyKCdmb2N1cycsIHJlc2V0RmllbGQpO1xyXG4gICAgZmllbGRWYWxpZGl0eS5hZGRFdmVudExpc3RlbmVyKCdmb2N1cycsIHJlc2V0RmllbGQpO1xyXG4gICAgZmllbGRDdmNDb2RlLmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgcmVzZXRGaWVsZCk7XHJcblxyXG4gICAgZnVuY3Rpb24gcmVzZXRGaWVsZChlKSB7XHJcbiAgICAgICAgaXNWYWxpZCA9IHRydWU7XHJcbiAgICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnYWRkLWNhcmRfX2ZpZWxkX2ludmFsaWQnKTtcclxuICAgICAgICBlLnRhcmdldC5uZXh0RWxlbWVudFNpYmxpbmcudGV4dENvbnRlbnQgPSBcIlwiO1xyXG4gICAgfVxyXG5cclxufSJdfQ==
