import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';


refs = {
  input: document.getElementById('datetime-picker'),
  startBtn: document.querySelector('button'),
  day: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
}

refs.startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure('Ти не можеж змінити минуле, вибери дату з мабутнього!')
    } else {
      refs.startBtn.disabled = false;
    };
  },
};

flatpickr(refs.input, options);

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


refs.startBtn.addEventListener('click', onClickOnActiveStartBnt);

function onClickOnActiveStartBnt () {
  let timerId = setInterval(() => {
    let count = new Date(refs.input.value) - new Date();
    refs.startBtn.disabled = true;
  
    if (count >= 0) {
      let diff= convertMs(count);
      refs.day.textContent = addLeadingZero(diff.days);
      refs.hours.textContent = addLeadingZero(diff.hours);
      refs.minutes.textContent = addLeadingZero(diff.minutes);
      refs.seconds.textContent = addLeadingZero(diff.seconds);
    } else {
      clearInterval(timerId);
      Notiflix.Notify.success('Майбутнє настало!');

    }

  }, 1000);
  
}