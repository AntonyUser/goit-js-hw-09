import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
const inputEl = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const daysEl = document.querySelector('span[data-days]');
const hoursEl = document.querySelector('span[data-hours]');
const minutesEl = document.querySelector('span[data-minutes]');
const secondsEl = document.querySelector('span[data-seconds]');

startBtn.setAttribute('disabled', 'true');

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] - options.defaultDate <= 0) {
            Notiflix.Notify.failure('Please choose a date in the future');
            startBtn.setAttribute('disabled', 'true');
        } else {
            startBtn.removeAttribute('disabled');
        }
    },
};
flatpickr(inputEl, options);
startBtn.addEventListener('click', () => {
    const newDate = new Date(inputEl.value);
    startBtn.setAttribute('disabled', 'true');
    setInterval(() => {
        const date = new Date();
        const dateDif = convertMs(newDate - date);
        daysEl.textContent = addLeadingZero(dateDif.days);
        hoursEl.textContent = addLeadingZero(dateDif.hours);
        minutesEl.textContent = addLeadingZero(dateDif.minutes);
        secondsEl.textContent = addLeadingZero(dateDif.seconds);
    }, 1000);
});

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}