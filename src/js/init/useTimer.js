/* Import Timer Class */
import Timer from "./../classes/Timer";

document.addEventListener('DOMContentLoaded', () => {
    const timer = new Timer(new Date('2025-12-31T12:46:23')); // Устанавливаем дедлайн
    timer.setElement('#timer-days .card-time__time', "Days");
    timer.setElement('#timer-hours .card-time__time', "Hours");
    timer.setElement('#timer-minutes .card-time__time', "Min");
    timer.setElement('#timer-seconds .card-time__time', "Sec");
    timer.start(timer);
});