import './../scss/style.scss';
import './../font/stylesheet.css';

class SiteMenu {
    postfix = 8;
    menu = document.querySelector('.header-mobile-menu');
    elementTrigger = null;
    resizeObserver = null;

    constructor(elementTrigger = null) {
        if (elementTrigger) {
            this.setMobileElementTrigger(elementTrigger);
        }
    }

    // Метод проверки, является ли элемент узлом DOM
    isDOM(el) { return el instanceof Node };

    // Создание мобильного меню
    createMenu() {
        let mainMenuLinks = document.querySelectorAll(".header-top-menu .header-top-menu__link");
        let mobileMenuEl = document.createElement("div");
        let mobileMenuContainer = document.createElement("div");
        
        mobileMenuEl.classList.add('container');
        mobileMenuEl.classList.add('header-mobile-menu');
        mobileMenuEl.append(mobileMenuContainer);
        mobileMenuEl.style.position = "absolute";
        mobileMenuEl.style.width = "100%";
        mobileMenuEl.style.top = this.elementTrigger.getBoundingClientRect().bottom + this.postfix + 'px';
        
        mobileMenuContainer.style.boxShadow = "0px 0px 15px -8px #9d9d9d";
        mobileMenuContainer.style.borderRadius = "8px";
        mobileMenuContainer.style.overflow = "hidden";
        mobileMenuContainer.style.backgroundColor = "white";
        mobileMenuContainer.style.padding = "10px";
        mobileMenuContainer.style.display = "flex";
        mobileMenuContainer.style.flexDirection = "column";

        mainMenuLinks.forEach((link) => {
            let newLink = document.createElement("a");
            newLink.innerText = link.innerText;
            newLink.href = link.href;
            newLink.classList.add('header-mobile-menu__link');
            newLink.style.textDecoration = "auto";
            newLink.style.color = "#686868";
            mobileMenuContainer.append(newLink);
        });

        return mobileMenuEl;
    }

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

    // Устанавливаем элемент DOM как элемент триггер, клик по которому откроет меню
    setMobileElementTrigger(elementTrigger) {
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
        if (this.elementTrigger.classList.contains('active') && this.menu) {
            this.elementTrigger.classList.remove('active');
            this.menu.classList.remove('active');
        }
    }

    setObserver() {
        this.resizeObserver = new ResizeObserver((entries) => {
            if (this.menu && window.innerWidth < 1440) {
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

window.siteMenu = new SiteMenu();

document.querySelectorAll('[data-mobile-menu-btn]').forEach(elTrigger => {
    window.siteMenu.setMobileElementTrigger(elTrigger);
});