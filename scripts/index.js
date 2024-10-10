const count = document.getElementById('count');
const head = document.getElementById('head');
const merrywrap = document.getElementById('merrywrap');

const config = {
  birthdate: 'Oct 10, 2024',
  name: 'SuSu (Nguyễn Quỳnh Anh)'
};

function hideEverything() {
  head.style.display = 'none';
  count.style.display = 'none';
  merrywrap.style.display = 'none';
}

hideEverything();

const confettiSettings = { target: 'confetti' };
const confetti = new window.ConfettiGenerator(confettiSettings);
confetti.render();

const second = 1000,
  minute = second * 60,
  hour = minute * 60,
  day = hour * 24;

let countDown = new Date(`${config.birthdate} 00:00:00`).getTime();

function updateCountdown() {
  let now = new Date().getTime();
  let distance = countDown - now;

  if (distance < 0) {
    // Countdown has finished
    head.style.display = 'none';
    count.style.display = 'none';
    merrywrap.style.display = 'block';
    confetti.render();
    clearInterval(timer);
    return;
  }

  // Countdown is still ongoing
  document.getElementById('day').innerText = Math.floor(distance / day);
  document.getElementById('hour').innerText = Math.floor((distance % day) / hour);
  document.getElementById('minute').innerText = Math.floor((distance % hour) / minute);
  document.getElementById('second').innerText = Math.floor((distance % minute) / second);

  head.style.display = 'block';
  count.style.display = 'block';
  merrywrap.style.display = 'none';

  // Thêm dòng này để hiển thị thời gian còn lại
  head.innerText = `Countdown to ${config.name}'s birthday:`;
}

// Initial call to set up the countdown display
updateCountdown();

// Set up interval to update the countdown every second
const timer = setInterval(updateCountdown, second);

// Đảm bảo rằng countdown hiển thị ngay khi trang được tải
window.onload = function() {
  updateCountdown();
  head.style.display = 'block';
  count.style.display = 'block';
};
