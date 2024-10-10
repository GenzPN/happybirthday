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
  let days = Math.floor(distance / day);
  let hours = Math.floor((distance % day) / hour);
  let minutes = Math.floor((distance % hour) / minute);
  let seconds = Math.floor((distance % minute) / second);

  document.getElementById('day').innerText = days;
  document.getElementById('hour').innerText = hours.toString().padStart(2, '0');
  document.getElementById('minute').innerText = minutes.toString().padStart(2, '0');
  document.getElementById('second').innerText = seconds.toString().padStart(2, '0');

  head.style.display = 'block';
  count.style.display = 'block';
  merrywrap.style.display = 'none';

  // Cập nhật tiêu đề với thời gian còn lại
  head.innerText = `Còn ${days} ngày ${hours} giờ ${minutes} phút ${seconds} giây đến sinh nhật của ${config.name}`;
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