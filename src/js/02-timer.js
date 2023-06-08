import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';

const elements = {
  days: document.querySelector('.value[data-days]'),
  hours: document.querySelector('.value[data-hours]'),
  minutes: document.querySelector('.value[data-minutes]'),
  seconds: document.querySelector('.value[data-seconds]'),
  startBtn: document.querySelector('button[data-start]'),
  myInput: document.querySelector('#datetime-picker'),
};

let timerIsStarted = false;
elements.startBtn.disabled = true;

const fp = flatpickr(elements.myInput, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const dateDiff = selectedDates[0].getTime() - new Date().getTime();
    if (dateDiff > 0 && !timerIsStarted) {
      elements.startBtn.disabled = false;
      elements.startBtn.addEventListener('click', handleStartBtnClick);
    } else {
      elements.startBtn.disabled = true;
      if (timerIsStarted) {
        Notiflix.Notify.failure('Timer is started');
      } else {
        Notiflix.Notify.failure('Please choose a future time');
      }
    }
  },
});

function handleStartBtnClick() {
  const dateDiff = fp.selectedDates[0].getTime() - new Date().getTime();
  startTimer(dateDiff);
  timerIsStarted = true;
  elements.startBtn.disabled = true;
  elements.startBtn.removeEventListener('click', handleStartBtnClick);
}

function startTimer(milliseconds) {
  let previousTime = 0;

  function updateTimer(currentTime) {
    const elapsed = currentTime - previousTime;
    if (elapsed >= 1000) {
      previousTime = currentTime - (elapsed % 1000);
      printTime(convertMs(milliseconds));
      milliseconds -= elapsed;
    }
    if (milliseconds > 0) {
      requestAnimationFrame(updateTimer);
    }
  }

  requestAnimationFrame(updateTimer);
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

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function printTime(t) {
  elements.days.textContent = addLeadingZero(t.days);
  elements.hours.textContent = addLeadingZero(t.hours);
  elements.minutes.textContent = addLeadingZero(t.minutes);
  elements.seconds.textContent = addLeadingZero(t.seconds);
}
