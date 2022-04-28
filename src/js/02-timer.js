import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const inputEl = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('[data-start]');
const dateToday = Date.now();
let daysTime = document.querySelector('[data-days]');
let hoursTime = document.querySelector('[data-hours]');
let minutesTime = document.querySelector('[data-minutes]');
let secondsTime = document.querySelector('[data-seconds]');

btnStart.setAttribute('disabled', 'disabled');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    onBtnStart(selectedDates[0]);
  },
};

flatpickr(inputEl, options);

function onBtnStart(selectedDate) {
  const chooseDate = selectedDate.getTime();
  if (dateToday > chooseDate) {
    Notify.failure('Please choose a date in the future');
  } else {
    btnStart.removeAttribute('disabled', 'disabled');
    onBtnAfterStart(chooseDate);
  }
}

function onBtnAfterStart(chooseDate) {
  btnStart.addEventListener('click', () => {
    btnStart.setAttribute('disabled', 'disabled');
    let timerId = setInterval(() => {
      const currentTime = Date.now();
      const restTime = convertMs(chooseDate - currentTime);
      getTimeComponents(restTime);
      if (currentTime >= chooseDate) {
        clearInterval(timerId);
        getTimeComponents({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);
  });
}

function getTimeComponents({ days, hours, minutes, seconds }) {
  daysTime.textContent = addLeadingZero(days);
  hoursTime.textContent = addLeadingZero(hours);
  minutesTime.textContent = addLeadingZero(minutes);
  secondsTime.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

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