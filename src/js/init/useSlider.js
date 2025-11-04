/* Import Slider Class */
import Slider from "./../classes/Slider";

document.addEventListener('DOMContentLoaded', () => {

    new Slider('.slider', {
        breakpoints: [
            {
                point: 0,
                countSlides: 1,
                gap: 15
            },
            {
                point: 600,
                countSlides: 2,
                gap: 15
            },
            {
                point: 1440,
                countSlides: 3,
                gap: 20
            }, {
                point: 1600,
                countSlides: 4,
                gap: 20
            }
        ]
    });

});