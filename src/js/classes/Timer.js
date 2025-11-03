export default class Timer {
    #deadline = null;
    timerId = null;
    
    /* Elements */
    elDays = null;
    elHours = null;
    elMin = null;
    elSec = null;

    isDate(date) { return date instanceof Date }

    constructor(deadline) {
        this.setDeadline(deadline);
    }

    setDeadline(date) {
        if (this.isDate(date)) {
            this.#deadline = date;
            return;
        }

        throw "Аргумент не является объектом Date";
    }

    getDeadline() {
        return this.#deadline;
    }

    setElement(selector, type = null) {
        const types = ["Days", "Hours", "Min", "Sec"];

        if (!types.includes(type)) {
            throw "Не верный тип. Доступные типы: " + types.join(", ");
        }

        if (typeof selector === 'string' && types.includes(type)) {
            this['el' + type] = document.querySelector(selector);
        }

        if (!this['el' + type]) {
            throw "Невозможно установить элемент";
        }
    }

    // Получить все эелементы таймера
    getElements() {
        return [this.elDays, this.elHours, this.elMin, this.elSec];
    }

    // Проверить готовность элементов
    isElementsReady() {
        for (let el of this.getElements()) {
            if (!el || el === null) {
                console.log(false);
                return false;
            }
        }
        return true;
    }

    // Склонения числительных
    declensionNum (num, words) {
        return words[(num % 100 > 4 && num % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][num % 10 < 5 ? num % 10 : 5]];
    };

    // Обновление таймера
    updateTimer(timer) {
        const nowDate = new Date();
        const diff = Math.max(0, timer.getDeadline() - nowDate);

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        timer.elDays.textContent = String(days).padStart(2, '0');
        timer.elHours.textContent = String(hours).padStart(2, '0');
        timer.elMin.textContent = String(minutes).padStart(2, '0');
        timer.elSec.textContent = String(seconds).padStart(2, '0');

        timer.elDays.dataset.title = timer.declensionNum(days, ['день', 'дня', 'дней']);
        timer.elHours.dataset.title = timer.declensionNum(hours, ['час', 'часа', 'часов']);
        timer.elMin.dataset.title = timer.declensionNum(minutes, ['минута', 'минуты', 'минут']);
        timer.elSec.dataset.title = timer.declensionNum(seconds, ['секунда', 'секунды', 'секунд']);

        timer.elDays.nextElementSibling.textContent = timer.elDays.dataset.title;
        timer.elHours.nextElementSibling.textContent = timer.elHours.dataset.title;
        timer.elMin.nextElementSibling.textContent = timer.elMin.dataset.title;
        timer.elSec.nextElementSibling.textContent = timer.elSec.dataset.title;

        if (diff === 0) {
          clearInterval(timer.timerId);
        }
    };


    // Запуск таймера
    start(timer) {
        timer.updateTimer(timer);
        timer.timerId = setInterval(() => { timer.updateTimer(timer) }, 1000);
    };
}