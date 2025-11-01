import './../scss/style.scss';
import './../font/stylesheet.css';

class SiteMenu {
    mobileElementTrigger = [];
    postfix = 8;
    mobileMenu = document.querySelector('.header-mobile-menu');

    constructor(elementTrigger) {
        this.setMobileElementTrigger(elementTrigger);
    }

    isDOM = el => el instanceof Node;

    // Создание мобильного меню
    createMobileMenu() {
        let mainMenuLinks = document.querySelectorAll(".header-top-menu .header-top-menu__link");
        let mobileMenuEl = document.createElement("div");
        let mobileMenuContainer = document.createElement("div");
        
        mobileMenuEl.classList.add('container');
        mobileMenuEl.classList.add('header-mobile-menu');
        mobileMenuEl.append(mobileMenuContainer);
        mobileMenuEl.style.position = "absolute";
        mobileMenuEl.style.width = "100%";

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

    openMobileMenu(topPosition, element) {

        if (!Number.isInteger(Number.parseInt(topPosition))) {
            throw "Невозможно открыть мобильное меню";
        }

        if (this.mobileMenu) {
            return;
        }

        if (window.innerWidth < 1440) {
            let mobileMenu = this.createMobileMenu();
            mobileMenu.style.top = topPosition + 'px';
            document.body.append(mobileMenu);
            this.mobileMenu = mobileMenu;
            this.fadeUp(this.mobileMenu);
            element.classList.add('active');
            this.setObserver(element);
        }
    }

    setMobileElementTrigger(elementTrigger) {
        if (this.isDOM(elementTrigger)) {

            const handlerClick = (event) => {
                if (!elementTrigger.classList.contains('active')) {
                    let menuBtnRec = elementTrigger.getBoundingClientRect();
                    this.openMobileMenu(menuBtnRec.bottom + this.postfix, elementTrigger);
                } else {
                    this.closeMobileMenu();
                }
                
            }

            elementTrigger.addEventListener('click', handlerClick);

            this.mobileElementTrigger.push({
                elementTrigger: elementTrigger,
                handlerClick: handlerClick 
            });

            return true;
        } else {
            throw "Невозможно инициализировать меню сайта. Класс SiteMenu";
        }
    }

    closeMobileMenu() {
        this.mobileElementTrigger.forEach(el => {
            if (this.isDOM(el.elementTrigger)) {
                let isActive = el.elementTrigger.classList.contains('active');

                if (isActive) {
                    el.elementTrigger.classList.remove('active');
                    document.querySelector(".header-mobile-menu").remove();
                    this.mobileMenu = null;
                }
            }
        });
    }

    setObserver(elTrigger, menu = this.mobileMenu) {
        const resizeObserver = new ResizeObserver((entries) => {
            if (window.innerWidth < 1440) {
                menu.style.top = elTrigger.getBoundingClientRect().bottom + this.postfix + 'px';
            } else {
                this.closeMobileMenu();
            }
        });

        resizeObserver.observe(this.mobileMenu);
    }
}

window.siteMenu = new SiteMenu(document.querySelector('[data-menu-btn]'));