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