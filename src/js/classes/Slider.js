/*
    Тут особо не запаривался. Не старался сделать класс универсальным. Захардкожен на отзывы)
*/
export default class Slider {
    wrapper;
    paginationElements;

    constructor() {

    }

    init() {
        // Обертка слайдера. Контейнер
        const sliderWrap = document.querySelector('.reviews-section__list');
        const countSlides = sliderWrap.children.length;
        const paginationElements = this.#createPagination(countSlides);
        sliderWrap.after(paginationElements);

        this.wrapper = sliderWrap;
        this.paginationElements = paginationElements;

        paginationElements.querySelector('[data-slide="1"]').classList.add('reviews-section__pagination-btn_active');

        sliderWrap.children[0].classList.add('reviews-section__rev_active');

        Array.from(paginationElements.children).forEach(btn => {
            btn.addEventListener('click', (e) => {
                const isPageBtn = Number.isInteger(Number.parseInt(btn.dataset.slide));

                if (isPageBtn) {
                    const slideNum = e.currentTarget.dataset.slide;
                    this.#toggleSlide(slideNum);
                } else {
                    btn.dataset.slide == 'prev' ? this.#prevSlide() : this.#nextSlide();
                }
            }); 
        });
    }

    #prevSlide() {
        console.log('prev');
    }

    #nextSlide() {
        const nextSlide = null;
        Array.from(this.sliderWrap.children).forEach(slide => {
            if (slide.classList.contains('reviews-section__rev_active')) {
                nextSlide = slide.nextElementSibling;
                slide.classList.remove('reviews-section__rev_active');
            }
            if (nextSlide) {
                nextSlide.classList.add('reviews-section__rev_active');
            }
        });
    }

    #toggleSlide(slideNum) {
        Array.from(this.wrapper.children).forEach(slide => {
            slide.classList.remove('reviews-section__rev_active');
        });

        this.wrapper.querySelector(`.reviews-section__rev:nth-child(${slideNum})`).classList.add('reviews-section__rev_active');

        Array.from(this.paginationElements.children).forEach(btn => {
            btn.classList.remove('reviews-section__pagination-btn_active');

            if (btn.dataset.slide == slideNum) {
                btn.classList.add('reviews-section__pagination-btn_active');
            }
        });
    }

    #createPagination(length) {
        if (!length) {
            throw "Нет слайдов";
        }

        const paginationWrapper = document.createElement('ul');
        paginationWrapper.classList.add('reviews-section__pagination');

        paginationWrapper.insertAdjacentHTML('beforeend', '<li class="reviews-section__pagination-prev" data-slide="prev"><svg viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M7.2925 12.8825C7.6825 12.4925 7.6825 11.8625 7.2925 11.4725L3.4225 7.5825H18.5925C19.1425 7.5825 19.5925 7.1325 19.5925 6.5825C19.5925 6.0325 19.1425 5.5825 18.5925 5.5825H3.4225L7.3025 1.7025C7.6925 1.3125 7.6925 0.6825 7.3025 0.2925C6.9125 -0.0975 6.2825 -0.0975 5.8925 0.2925L0.2925 5.8825C-0.0975 6.2725 -0.0975 6.9025 0.2925 7.2925L5.8825 12.8825C6.2725 13.2625 6.9125 13.2625 7.2925 12.8825Z" fill="currentColor"/></svg></li>');

        for (let i = 0; i < length; i++) {
            paginationWrapper.insertAdjacentHTML('beforeend', '<li class="reviews-section__pagination-btn" data-slide="' + (i + 1) + '">' + (i + 1) + '</li>');
        }

        paginationWrapper.insertAdjacentHTML('beforeend', '<li class="reviews-section__pagination-next" data-slide="next"><svg viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M12.29 0.2925C11.9 0.6825 11.9 1.3125 12.29 1.7025L16.17 5.5825H1C0.45 5.5825 0 6.0325 0 6.5825C0 7.1325 0.45 7.5825 1 7.5825H16.18L12.3 11.4625C11.91 11.8525 11.91 12.4825 12.3 12.8725C12.69 13.2625 13.32 13.2625 13.71 12.8725L19.3 7.2825C19.69 6.8925 19.69 6.2625 19.3 5.8725L13.7 0.2925C13.32 -0.0975 12.68 -0.0975 12.29 0.2925Z" fill="currentColor"/> </svg></li>');

        return paginationWrapper;
    }
}