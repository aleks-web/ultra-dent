document.addEventListener('DOMContentLoaded', () => {
    /*
        При скоролле страницы добавляем класс header_mini для шапки. Либо удаляем этот класс
    */
    window.addEventListener("scroll", function() {
        const header = document.querySelector('.header');

        if (window.scrollY >= 100 && header && !header.classList.contains('header_mini')) {
            header.classList.add('header_mini');
        } else if (window.scrollY < 100) {
            header.classList.remove('header_mini');
        }
    });
});