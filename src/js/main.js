/* Import scss */
import './../scss/style.scss';

/* Import Fonts */
import './../font/stylesheet.css';


/*
    В этих файлах, находится js, который нужен для работы некоторых элементов на сайте.
    Разбил для удобства
*/
/* Import useTimer */
import "./init/useTimer"; // Инициализация таймера на первом экране

/* Import useCardPhone */
import "./init/useCardPhone"; // Инициализация карточек с видеороликами

/* Import useHeader */
import "./init/useHeader"; // Для работы шапки сайта

/* Import useMobileMenu */
import "./init/useMobileMenu"; // Для мобильного меню

import Slider3 from "./classes/Slider3";

document.addEventListener('DOMContentLoaded', () => {

    const slider = new Slider3('.slider', {
        breakpoints: [
            {
                point: 0,
                countSlides: 1
            },
            {
                point: 600,
                countSlides: 2
            }
        ]
    });



});