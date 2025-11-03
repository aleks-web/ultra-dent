/* Import SiteMenu Class */
import SiteMenu from "./../classes/SiteMenu";

/* Инициализация скриптов после того, как DOM готов к работе */
document.addEventListener('DOMContentLoaded', () => {
    /*
        Деламе экземпляр класса, который отвечает за управление мобильным меню "глобальным".
        Это нужно для того, чтобы можно было им пользоваться в других областях/скриптах сайта
    */
    window.siteMenu = new SiteMenu(); 

    /*
        Ищем элементы с атрибутом data-mobile-menu-btn.
        Проходимся циклом и пробрасываем элемент в метод setElementTrigger экземпляра класса SiteMenu
        (Метод setElementTrigger установит прослушивателя события по клику на элементе)
    */
    document.querySelectorAll('[data-mobile-menu-btn]').forEach(elTrigger => {
        window.siteMenu.setElementTrigger(elTrigger);
    });
});