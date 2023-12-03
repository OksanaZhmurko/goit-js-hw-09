

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const selectors = {
  button: document.querySelector("[data-start]"),
  timerDays: document.querySelector("[data-days]"),
  timerHours: document.querySelector("[data-hours]"),
  timerMinutes: document.querySelector("[data-minutes]"),
  timerSeconds: document.querySelector("[data-seconds]"),
};

let selectedDate = new Date();

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: selectedDate,
  minuteIncrement: 1,
  onClose: function(selectedDates) {
    selectedDate = selectedDates[0];
    const currentDate = new Date();
    if (selectedDate - currentDate <= 0) {
      Notiflix.Notify.failure('Please choose a date in the future');
      selectors.button.disabled = true;
      return;
    } else {
      selectors.button.disabled = false;
    }
  },
};

flatpickr("#datetime-picker", options);

selectors.button.addEventListener("click", () => {
  selectors.button.disabled = true;
  const id = setInterval(() => {
    timer(selectedDate, id);
  }, 1000);
});

function timer(selectedDate, id) {
  const currentDate = new Date();
  const deltaTime = selectedDate - currentDate;

  if (deltaTime <= 0) {
    clearInterval(id);
    return;
  }

  createTimer(convertMs(deltaTime));
}

function createTimer({ days, hours, minutes, seconds }) {
  selectors.timerDays.textContent = addLeadingZero(days);
  selectors.timerHours.textContent = addLeadingZero(hours);
  selectors.timerMinutes.textContent = addLeadingZero(minutes);
  selectors.timerSeconds.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
