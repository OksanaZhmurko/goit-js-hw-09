

import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

import { Report } from 'notiflix/build/notiflix-report-aio';




const dateTimePicker = document.getElementById('datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate < new Date()) {
      Notiflix.Report.Failure('Error', 'Please choose a date in the future', 'OK');
    } else {
      startButton.disabled = false;
    }
  },
};


  flatpickr(dateTimePicker, options);
  
  startButton.addEventListener('click', () => {
    const selectedDate = new Date(dateTimePicker.value);
    const currentDate = new Date();
    
    if (selectedDate <= currentDate) {
     
      Notiflix.Report.Failure('Error', 'Please choose a date in the future', 'OK');
      
      return;
    }
  
    //startButton.disabled = true;

    const countdownInterval = setInterval(() => {
      const now = new Date();
      const difference = selectedDate - now;
  
      if (difference <= 0) {
        clearInterval(countdownInterval);
   
        daysElement.textContent = '00';
        hoursElement.textContent = '00';
        minutesElement.textContent = '00';
        secondsElement.textContent = '00';
        startButton.disabled = false;
        return;
      }
  
      const { days, hours, minutes, seconds } = convertMs(difference);
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
  
      daysElement.textContent = addLeadingZero(days);
      hoursElement.textContent = addLeadingZero(hours);
      minutesElement.textContent = addLeadingZero(minutes);
      secondsElement.textContent = addLeadingZero(seconds);
    }, 1000);
  });

  function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
  }