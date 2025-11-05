export default class SiteMenu {
    static instance;
    postfix = 8;
    menu = document.querySelector('.header-mobile-menu');
    elementTrigger = null;
    resizeObserver = null;

    /**
     * @param {HTMLElement|null} elementTrigger
     */
    constructor(elementTrigger = null) {
        if (elementTrigger) {
            this.setElementTrigger(elementTrigger);
        }

        if (SiteMenu.instance) {
            return SiteMenu.instance;
          }
        SiteMenu.instance = this;
    }

    /**
     * Метод проверки, является ли элемент узлом DOM
     * @param {any} el
     */
    isDOM(el) { return el instanceof Node };

    /**
     * @param {HTMLElement} element
     * @param {Number} duration
     */
    fadeUp(element, duration = 300) {
        let opacity = 0;
        let translateY = 30;
      
        element.style.opacity = 0;
        element.style.transform = `translateY(${translateY}px)`;
      
        const startTime = performance.now();
      
        function step(currentTime) {
          const elapsedTime = currentTime - startTime;
          const progress = Math.min(elapsedTime / duration, 1);
      
          opacity = progress;
          translateY = 20 * (1 - progress);
      
          element.style.opacity = opacity;
          element.style.transform = `translateY(${translateY}px)`;
      
          if (progress < 1) {
            requestAnimationFrame(step);
          }
        }
      
        requestAnimationFrame(step);
    }

    // Открытие меню
    openMenu() {
        if (window.innerWidth >= 1440) {
            return;
        }
        
        this.fadeUp(this.menu);

        this.elementTrigger.classList.add('active');
        this.menu.classList.add('active');
        this.setObserver();
    }

    /**
     * Устанавливаем элемент DOM как элемент триггер, клик по которому откроет меню
     * @param {HTMLElement} elementTrigger
     */
    setElementTrigger(elementTrigger) {
        if (this.isDOM(elementTrigger)) {

            const handlerClick = (event) => {
                this.elementTrigger = elementTrigger;

                if (elementTrigger.classList.contains('active')) {
                    this.closeMenu();
                } else {
                    this.openMenu();
                }
            }

            elementTrigger.addEventListener('click', handlerClick);

            return true;
        } else {
            throw "Невозможно инициализировать меню сайта. Класс SiteMenu";
        }
    }

    // Метод закрытия меню
    closeMenu() {
        if (this.elementTrigger) {
            this.elementTrigger.classList.remove('active');
        }
        
        if (this.menu) {
            this.menu.classList.remove('active');
            this.menu.style.height = 0;
            this.menu.style.opacity = 0;
        }
    }

    setObserver() {
        this.resizeObserver = new ResizeObserver((entries) => {
            if (this.menu && window.innerWidth < 1440 && this.menu.classList.contains('active')) {
                this.menu.style.top = this.elementTrigger.getBoundingClientRect().bottom + this.postfix + 'px';
                this.menu.style.height = 'calc(100dvh - ' + (this.elementTrigger.getBoundingClientRect().bottom + this.postfix * 2) + 'px)';
            } else {
                this.closeMenu();
            }
        }).observe(this.menu);
    }

    destroyObserver() {
        if (this.resizeObserver) {
            this.resizeObserver.unobserve();
            this.resizeObserver = null;
        }
    }
}