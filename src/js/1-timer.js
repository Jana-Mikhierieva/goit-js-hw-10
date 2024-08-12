import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let userSelectedDate = null;
const calendarField = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('[data-start]');
btnStart.disabled = true;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (!selectedDate) {
        return;
    }
    const currentDate = new Date();
    if (selectedDate <= currentDate) {
      iziToast.info({
        title: 'Info',
        message: 'Please choose a date in the future!'
      });
        btnStart.disabled = true;
        updateButtonState();
    } else {
      userSelectedDate = selectedDate;
        btnStart.disabled = false;
        updateButtonState();
    }
  },
};

flatpickr("#datetime-picker", options);

btnStart.addEventListener('click', onBtnClick);

function onBtnClick () {
    if (!userSelectedDate) {
        return;
    }
    btnStart.disabled = true;
    updateButtonState();
    calendarField.disabled = true;
    startCountdown(userSelectedDate);
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
    return String(value).padStart(2, '0');
}

function updateTimeInterface({ days, hours, minutes, seconds }) {
    document.querySelector('[data-days]').textContent = addLeadingZero(days);
    document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
    document.querySelector('[data-minutes]').textContent = addLeadingZero(minutes);
    document.querySelector('[data-seconds]').textContent = addLeadingZero(seconds);
}
function updateButtonState() {
    if (!btnStart.disabled) {
        btnStart.classList.add('is-active');
    } else {
        btnStart.classList.remove('is-active');
    }
}
function startCountdown(targetDate) {
    const timerInterval = setInterval(() => {
        const currentTime = new Date();
        const timeDifference = targetDate - currentTime;

        if (timeDifference <= 0) {
            clearInterval(timerInterval);
            calendarField.disabled = false;
            return;
        }

        updateTimeInterface(convertMs(timeDifference));
    }, 1000);
}

