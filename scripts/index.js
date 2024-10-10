const count = document.getElementById('count');
const head = document.getElementById('head');
const merrywrap = document.getElementById('merrywrap');

const config = {
  birthdate: 'Oct 10, 2024',
  name: 'SuSu'
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

  // Cập nhật tiêu đề với thời gian còn lại
  if (window.innerWidth <= 480) {
    head.innerText = `${config.name}'s (Nguyen Quynh Anh) Birthday`; // Rút gọn tiêu đề trên điện thoại
    head.style.display = 'block'; // Luôn hiển thị tiêu đề trên điện thoại
  } else {
    head.innerText = `Countdown to ${config.name}'s (Nguyen Quynh Anh) birthday`;
    head.style.display = 'block';
  }

  // Hiển thị đồng hồ đếm ngược
  count.style.display = 'block';
  merrywrap.style.display = 'none';
}

// Initial call to set up the countdown display
updateCountdown();

// Set up interval to update the countdown every second
const timer = setInterval(updateCountdown, second);

function updateCanvasSize() {
  const canvas = document.getElementById('confetti');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.zIndex = '1000';
  canvas.style.pointerEvents = 'none';
}

function handleResize() {
  updateCanvasSize();
  updateCountdown();
  confetti.clear();
  confetti = new window.ConfettiGenerator({
    target: 'confetti',
    max: 150, // Tăng số lượng pháo giấy từ 80 lên 150
    size: 1.5, // Tăng kích thước pháo giấy lên một chút
    animate: true,
    props: ['circle', 'square', 'triangle', 'line'],
    colors: [[165,104,246],[230,61,135],[0,199,228],[253,214,126]],
    clock: 30, // Tăng tốc độ rơi
    width: window.innerWidth,
    height: window.innerHeight,
    start_from_edge: true, // Thêm dòng này
    origin: { y: 0 }, // Thêm dòng này
    respawn: true, // Thêm option này để pháo giấy liên tục được tạo mới
    spread: 180, // Tăng góc phân tán
  });
  confetti.render();
}

window.addEventListener('resize', handleResize);

// Đảm bảo rằng countdown hiển thị ngay khi trang được tải
window.onload = function() {
  updateCountdown();
  updateCanvasSize();
  handleResize(); // Gọi hàm này để đảm bảo mọi thứ được cập nhật đúng
  setupCardInteraction(); // Thêm dòng này
};

function setupCardInteraction() {
  const card = document.querySelector('.card');
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  if (isMobile) {
    // Xử lý cho thiết bị di động
    let isOpen = false;
    card.addEventListener('click', () => {
      isOpen = !isOpen;
      if (isOpen) {
        card.classList.add('open');
      } else {
        card.classList.remove('open');
      }
    });
  } else {
    // Xử lý cho máy tính (giữ nguyên hành vi hiện tại)
    card.addEventListener('mouseenter', () => {
      card.classList.add('open');
    });
    card.addEventListener('mouseleave', () => {
      card.classList.remove('open');
    });
  }
}

// Gọi hàm này khi trang được tải
window.onload = function() {
  updateCountdown();
  updateCanvasSize();
  handleResize();
  setupCardInteraction(); // Thêm dòng này
};

function adjustFontSize() {
  const card = document.querySelector('.card');
  const details = card.querySelector('.details');
  const content = details.querySelector('.content');
  
  let fontSize = 12; // Bắt đầu với kích thước chữ 12px
  content.style.fontSize = `${fontSize}px`;
  
  while (content.scrollHeight > details.clientHeight && fontSize > 8) {
    fontSize -= 0.5;
    content.style.fontSize = `${fontSize}px`;
  }
}

// Gọi hàm này sau khi trang đã tải và mỗi khi cửa sổ thay đổi kích thước
window.addEventListener('load', adjustFontSize);
window.addEventListener('resize', adjustFontSize);

// Xóa tất cả các hàm liên quan đến dark mode

// Sử dụng DOMContentLoaded thay vì window.onload
document.addEventListener('DOMContentLoaded', initializePage);

function initializePage() {
  updateCountdown();
  updateCanvasSize();
  handleResize();
  setupCardInteraction();
  adjustFontSize();
  
  // Khởi tạo lại confetti sau khi cập nhật kích thước canvas
  confetti.clear();
  confetti = new window.ConfettiGenerator({
    target: 'confetti',
    max: 150, // Tăng số lượng pháo giấy từ 80 lên 150
    size: 1.5, // Tăng kích thước pháo giấy lên một chút
    animate: true,
    props: ['circle', 'square', 'triangle', 'line'],
    colors: [[165,104,246],[230,61,135],[0,199,228],[253,214,126]],
    clock: 30, // Tăng tốc độ rơi
    width: window.innerWidth,
    height: window.innerHeight,
    start_from_edge: true, // Thêm dòng này
    origin: { y: 0 }, // Thêm dòng này
    respawn: true, // Thêm option này để pháo giấy liên tục được tạo mới
    spread: 180, // Tăng góc phân tán
  });
  confetti.render();
  
  // Khởi tạo dark mode toggle
  const darkModeToggle = document.getElementById('dark-mode-toggle-1');
  darkModeToggle.addEventListener('colorschemechange', () => {
    document.body.classList.toggle('dark', darkModeToggle.mode === 'dark');
    updateCardColors();
  });

  // Gọi hàm này để đặt màu sắc ban đầu
  updateCardColors();
}

function updateCardColors() {
  const isDarkMode = document.body.classList.contains('dark');
  const root = document.documentElement;

  requestAnimationFrame(() => {
    root.style.setProperty('--background-color', isDarkMode ? '#1a1a1a' : '#FFFFFF');
    root.style.setProperty('--text-color', isDarkMode ? '#ffffff' : '#013243');
    // Không thay đổi màu của p trong card
    root.style.setProperty('--card-text-color', '#013243');
  });
}

// Xóa hàm setupDarkModeToggle nếu nó tồn tại

document.addEventListener('DOMContentLoaded', initializePage);

// Xóa hàm setupDarkModeToggle và tất cả các đoạn mã liên quan đến dark mode

function disableTextSelection() {
  const cardDetails = document.querySelector('.card .details');
  cardDetails.addEventListener('selectstart', function(e) {
    e.preventDefault();
  });
}

// Thêm hàm này vào danh sách các hàm được gọi khi trang được tải
document.addEventListener('DOMContentLoaded', function() {
  // ... các hàm khác ...
  disableTextSelection();
});
