/*
    Инициализация компонента карточки-смартфона
*/
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.card-phone').forEach(el => {

        if (!el.dataset.videoId) {
            el.remove();
            return;
        }

        const btnPlay = el.querySelector('.card-phone__btn-play');
        btnPlay.addEventListener('click', (e) => {
            const iframe = `<iframe class="card-phone__iframe" src="https://www.youtube.com/embed/${el.dataset.videoId}?autoplay=1&si=-dagxo6iS8HLFeB2&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
            
            if (!el.querySelector('.card-phone__iframe')) {
                el.insertAdjacentHTML('beforeend', iframe);
                el.classList.add('card-phone_plays');
            }
        });

        el.addEventListener('click', (e) => {
            if (!e.target.closest('.card-phone__btn-play')) {
                el.classList.remove('card-phone_plays');
                const iframe = el.querySelector('.card-phone__iframe');
                if (iframe) {
                    iframe.remove();
                }
            }
        });
    });
});