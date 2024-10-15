const count = document.getElementById('count');
const head = document.getElementById('head');
const merrywrap = document.getElementById('merrywrap');

const config = {
  birthdate: 'Oct 12, 2024',
  name: 'SuSu'
};

let timer; // Khai báo biến timer ở đây
let confettiInstance = null; // Thêm biến này ở đầu file để theo dõi trạng thái confetti
let confettiVisible = false;

function hideEverything() {
  head.style.display = 'none';
  count.style.display = 'none';
  merrywrap.style.display = 'none';
}

hideEverything();

// Thay đổi cấu hình confetti
const confettiSettings = {
  target: 'confetti',
  max: 150,
  size: 1,
  animate: true,
  props: ['circle', 'square', 'triangle', 'line'],
  colors: [[165,104,246],[230,61,135],[0,199,228],[253,214,126]],
  clock: 30,
  width: window.innerWidth,
  height: window.innerHeight,
  start_from_edge: true,
  origin: { y: 0 },
  respawn: true,
  spread: 180,
  zIndex: -1
};

// Thêm các hàm này vào đầu file
function showModal() {
  document.getElementById('giftModal').style.display = 'block';
}

function hideModal() {
  document.getElementById('giftModal').style.display = 'none';
}

function handleReadClick() {
  const merrywrap = document.getElementById('merrywrap');
  if (merrywrap) {
    merrywrap.classList.add('hidden');
  }
  hideModal();
  showConfettiAndHideSnow();
  enableDarkMode();
  
  // Thêm đoạn code này để ẩn confetti sau 5 giây
  setTimeout(() => {
    hideConfetti();
  }, 0); // 5000 milliseconds = 5 seconds
}

function hideCard() {
  console.log('Hiding card');
  const merrywrap = document.getElementById('merrywrap');
  console.log('Merrywrap element:', merrywrap);
  if (merrywrap) {
    merrywrap.style.display = 'none';
    merrywrap.classList.add('hidden');
    console.log('Card hidden');
  } else {
    console.log('Merrywrap element not found');
  }
}

function hideCardAndBonusButton() {
  const merrywrap = document.getElementById('merrywrap');
  const bonusGiftBtn = document.getElementById('bonusGiftBtn');
  if (merrywrap) {
    merrywrap.style.display = 'none';
    merrywrap.classList.add('hidden');
  }
  if (bonusGiftBtn) bonusGiftBtn.style.display = 'none';
  // Thêm dòng này để ẩn đồng hồ đếm ngược
  const countElement = document.getElementById('count');
  if (countElement) countElement.style.display = 'none';
}

function enableDarkModeIfNeeded() {
  const darkModeToggle = document.querySelector('.toggle');
  if (darkModeToggle) {
    const isDarkMode = darkModeToggle.getAttribute('aria-pressed') === 'true';
    if (!isDarkMode) {
      TOGGLE(); // Gọi TOGGLE() thay vì click() để tránh gọi nhiều lần
    }
  }
}

function handleNotReadClick() {
  hideModal();
}

function showBonusGift() {
  const merrywrap = document.getElementById('merrywrap');
  if (merrywrap && merrywrap.classList.contains('hidden')) {
    // Nếu thiệp đã bị ẩn, không hiển thị modal
    return;
  }
  showModal();
}

let confetti = new window.ConfettiGenerator(confettiSettings);
confetti.render();

// Thêm đoạn code này
document.getElementById('confetti').style.zIndex = '-1';

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
    showConfettiAndHideSnow();
    adjustFontSize(); // Thêm dòng này
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

  // Cập nht tiêu đề với thời gian còn lại
  if (window.innerWidth <= 480) {
    head.innerText = `${config.name}'s (Nguyen Quynh Anh) Birthday`; // Rút gọn tiêu đề trên điện thoi
    head.style.display = 'block'; // Luôn hiển thị tiêu đề trên điện thoại
  } else {
    head.innerText = `Countdown to ${config.name}'s (Nguyen Quynh Anh) birthday`;
    head.style.display = 'block';
  }

  // Hiển thị đồng hồ đếm ngược
  count.style.display = 'block';
  merrywrap.style.display = 'none';

  requestAnimationFrame(updateCountdown);
}

// Initial call to set up the countdown display
updateCountdown();
timer = setInterval(updateCountdown, second);

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
  // Tạo mới đối tượng confetti với kích thước mới
  confetti = new window.ConfettiGenerator({
    ...confettiSettings,
    width: window.innerWidth,
    height: window.innerHeight
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

// Gọi hàm này khi trang đợc tải
window.onload = function() {
  updateCountdown();
  updateCanvasSize();
  handleResize();
  setupCardInteraction(); // Thêm dòng này
};

function adjustFontSize() {
  const card = document.querySelector('.card');
  if (!card) return; // Nếu không tìm thấy card, thoát khỏi hàm

  const details = card.querySelector('.details');
  if (!details) return; // Nếu không tìm thấy details, thoát khỏi hàm

  const content = details.querySelector('.content');
  if (!content) return; // Nếu không tìm thấy content, thoát khỏi hàm
  
  let fontSize = 12; // Bắt đầu với kích thước chữ 12px
  content.style.fontSize = `${fontSize}px`;
  
  while (content.scrollHeight > details.clientHeight && fontSize > 8) {
    fontSize -= 0.5;
    content.style.fontSize = `${fontSize}px`;
  }
}

// Gọi hàm này sau khi trang đã tải và mỗi khi ca sổ thay đổi kích thước
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
  
  // Khởi tạo lại confetti sau khi cp nhật kích thước canvas
  confetti.clear();
  confetti = new window.ConfettiGenerator({
    target: 'confetti',
    max: 150, // Tng số lượng pháo giy từ 80 lên 150
    size: 1.5, // Tăng kích thước pháo giấy lên một chút
    animate: true,
    props: ['circle', 'square', 'triangle', 'line'],
    colors: [[165,104,246],[230,61,135],[0,199,228],[253,214,126]],
    clock: 30, // Tăng tốc đ rơi
    width: window.innerWidth,
    height: window.innerHeight,
    start_from_edge: true, // Thêm dòng này
    origin: { y: 0 }, // Thêm dng này
    respawn: true, // Thêm option này để pháo giấy liên tục được tạo mới
    spread: 180, // Tăng góc phân tán
    zIndex: -1 // Thêm dòng này để đảm bảo confetti nằm dưới các phần tử khác
  });
  confetti.render();
  
  // Hiển thị tuyết ban đầu
  toggleSnow(true);
  
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
    root.style.setProperty('--background-color', isDarkMode ? '#1a1a1a' : 'hsl(219, 30%, 88%)');
    root.style.setProperty('--text-color', isDarkMode ? '#e0e1dc' : '#013243');
    // Không thay đổi màu của p trong card
    root.style.setProperty('--card-text-color', '#013243');
  });
}

// Xa h m setupDarkModeToggle nếu nó tồn tại

document.addEventListener('DOMContentLoaded', initializePage);

// Xóa h m setupDarkModeToggle và tất cả các đoạn mã liên quan đến dark mode

function disableTextSelection() {
  const cardDetails = document.querySelector('.card .details');
  cardDetails.addEventListener('selectstart', function(e) {
    e.preventDefault();
  });
}

// Thêm hàm này vào danh sách các hàm đưc gọi khi trang được tải
document.addEventListener('DOMContentLoaded', function() {
  // ... các hàm khác ...
  disableTextSelection();
});

function restartCountdown() {
  // Đặt lại thời gian đếm ngưc
  countDown = new Date(`${config.birthdate} 00:00:00`).getTime();
  
  // Ẩn thiệp chúc mừng
  const merrywrap = document.getElementById('merrywrap');
  if (merrywrap) {
    merrywrap.style.display = 'none';
    merrywrap.classList.add('hidden');
  }
  
  // Hiển thị đồng hồ đếm ngược
  const count = document.getElementById('count');
  const head = document.getElementById('head');
  if (count) count.style.display = 'block';
  if (head) head.style.display = 'block';
  
  // Thay vì dừng confetti, chỉ cần ẩn nó
  const confettiCanvas = document.getElementById('confetti');
  if (confettiCanvas) confettiCanvas.style.display = 'none';
  
  // Hiển thị lại tuyết
  toggleSnow(true);
  
  // Khởi động lại đồng hồ đếm ngược
  updateCountdown();
  timer = setInterval(updateCountdown, second);
}

// Thêm sự kiện click để khởi động lại đồng hồ đếm ngược
document.addEventListener('click', function(event) {
  if (event.target.closest('#merrywrap')) {
    restartCountdown();
  }
});

function showConfettiAndHideSnow() {
  document.getElementById('confetti').style.display = 'block';
  toggleSnow(false);
  // Nếu bạn muốn tạo lại confetti mỗi lần hiển thị, bạn có thể thêm dòng sau:
  // confetti.clear();
  // confetti.render();
  confettiVisible = true;
}

document.addEventListener('click', function(event) {
  console.log("Clicked element:", event.target);
});

// Thêm event listener này vào cuối file
document.addEventListener('DOMContentLoaded', function() {
  const bonusGiftBtn = document.getElementById('bonusGiftBtn');
  const readBtn = document.getElementById('readBtn');
  const notReadBtn = document.getElementById('notReadBtn');

  if (bonusGiftBtn) {
    bonusGiftBtn.addEventListener('click', showBonusGift);
  }

  if (readBtn) {
    readBtn.addEventListener('click', handleReadClick);
  }

  if (notReadBtn) {
    notReadBtn.addEventListener('click', handleNotReadClick);
  }

  // Đóng modal khi click bên ngoài
  window.onclick = function(event) {
    const modal = document.getElementById('giftModal');
    if (event.target == modal) {
      hideModal();
    }
  }
});

document.addEventListener('DOMContentLoaded', function() {
  // Các hàm khởi tạo khác
  initializePage();
  adjustFontSize();

  // Thêm event listener cho sự kiện resize để điều chỉnh kích thước chữ khi cửa s thay đổi kích thước
  window.addEventListener('resize', adjustFontSize);
});

function enableDarkMode() {
  const darkModeToggle = document.getElementById('dark-mode-toggle-1');
  if (darkModeToggle) {
    darkModeToggle.mode = 'dark';
    document.body.classList.add('dark');
    updateCardColors();
  }
}

// Thêm hàm mới này
function enableDarkModeIfNeeded() {
  const darkModeToggle = document.querySelector('.toggle');
  if (darkModeToggle) {
    const isDarkMode = darkModeToggle.getAttribute('aria-pressed') === 'true';
    if (!isDarkMode) {
      TOGGLE(); // Gọi TOGGLE() thay vì click() để tránh gọi nhiều lần
    }
  }
}

// Sửa đổi hàm showBonusGift
function showBonusGift() {
  const merrywrap = document.getElementById('merrywrap');
  if (merrywrap && merrywrap.classList.contains('hidden')) {
    // Nếu thiệp đã bị ẩn, không hiển thị modal
    return;
  }
  showModal();
}

// Đảm bo rằng bạn đã có hàm showModal() được định nghĩa
function showModal() {
  const modal = document.getElementById('giftModal');
  if (modal) {
    modal.style.display = 'block';
  }
}

// Thêm hàm mới này để dừng confetti
function stopConfetti() {
  if (confetti) {
    confetti.clear();
  }
  const confettiCanvas = document.getElementById('confetti');
  if (confettiCanvas) {
    confettiCanvas.style.display = 'none';
  }
}

// Thêm hàm mới này
function showCard() {
  const merrywrap = document.getElementById('merrywrap');
  if (merrywrap) {
    merrywrap.style.display = 'block';
    merrywrap.classList.remove('hidden');
  }
}

// Sửa đổi hàm restartCountdown
function restartCountdown() {
  // Đặt lại thời gian đếm ngược
  countDown = new Date(`${config.birthdate} 00:00:00`).getTime();
  
  // Hiển thị lại tấm thiệp
  showCard();
  
  // Hin thị đồng hồ đếm ngược
  const count = document.getElementById('count');
  const head = document.getElementById('head');
  if (count) count.style.display = 'block';
  if (head) head.style.display = 'block';
  
  // Ẩn confetti
  const confettiCanvas = document.getElementById('confetti');
  if (confettiCanvas) confettiCanvas.style.display = 'none';
  
  // Hiển thị lại tuyết
  toggleSnow(true);
  
  // Khởi động lại đồng hồ đếm ngược
  updateCountdown();
  timer = setInterval(updateCountdown, second);
}

// Thêm hàm mới này để xử lý sự kiện click vào tấm thiệp
function handleCardClick(event) {
  if (event.target.closest('#merrywrap')) {
    restartCountdown();
  }
}

// Thay đổi cách thêm sự kin click
document.addEventListener('DOMContentLoaded', function() {
  const bonusGiftBtn = document.getElementById('bonusGiftBtn');
  const readBtn = document.getElementById('readBtn');
  const notReadBtn = document.getElementById('notReadBtn');

  if (bonusGiftBtn) {
    bonusGiftBtn.addEventListener('click', showBonusGift);
  }

  if (readBtn) {
    readBtn.addEventListener('click', handleReadClick);
  }

  if (notReadBtn) {
    notReadBtn.addEventListener('click', handleNotReadClick);
  }

  // Thêm sự kiện click cho tấm thiệp
  document.addEventListener('click', handleCardClick);

  // Đóng modal khi click bên ngoài
  window.onclick = function(event) {
    const modal = document.getElementById('giftModal');
    if (event.target == modal) {
      hideModal();
    }
  }
});

// ... rest of the existing code ...

// Thêm hàm mới này
function enableDarkMode() {
  const darkModeToggle = document.getElementById('dark-mode-toggle-1');
  if (darkModeToggle) {
    darkModeToggle.mode = 'dark';
    document.body.classList.add('dark');
    updateCardColors();
  }
}

// ... rest of the existing code ...

document.addEventListener('DOMContentLoaded', function() {
  // ... existing code ...

  // Thêm đoạn này để đồng bộ trạng thái ban đầu của dark mode
  const darkModeToggle = document.querySelector('.toggle');
  if (darkModeToggle) {
    const isDarkMode = darkModeToggle.getAttribute('aria-pressed') === 'true';
    document.body.setAttribute("data-dark-mode", isDarkMode);
    document.body.classList.toggle('dark', isDarkMode);
    updateBackgroundColor(isDarkMode);
  }
});

// Thêm hàm mới này để cập nhật màu nền
function updateBackgroundColor(isDarkMode) {
  document.body.style.backgroundColor = isDarkMode ? '#1a1a1a' : 'hsl(219, 30%, 88%)';
}

// Thêm đoạn này để đồng bộ trạng thái ban đầu của dark mode
document.addEventListener('DOMContentLoaded', function() {
  const darkModeToggle = document.querySelector('.toggle');
  if (darkModeToggle) {
    const isDarkMode = darkModeToggle.getAttribute('aria-pressed') === 'true';
    document.body.setAttribute("data-dark-mode", isDarkMode);
    document.body.classList.toggle('dark', isDarkMode);
    updateBackgroundColor(isDarkMode);
  }
});

// Thêm hàm mới này
function enableDarkMode() {
  const darkModeToggle = document.getElementById('dark-mode-toggle-1');
  if (darkModeToggle) {
    TOGGLE(); // Gọi hàm TOGGLE() từ file main.js
    updateCardColors(); // Cập nhật màu sắc của card nếu cần
  }
}

// Thêm hàm mới này để ẩn confetti
function hideConfetti() {
  if (!confettiVisible) return;
  const confettiCanvas = document.getElementById('confetti');
  if (confettiCanvas) {
    confettiCanvas.style.display = 'none';
  }
  if (confetti && typeof confetti.clear === 'function') {
    confetti.clear();
  }
  confettiVisible = false;
}

// Thêm một event listener cho sự kiện resize
window.addEventListener('resize', () => {
  if (!confettiVisible) {
    hideConfetti();
  }
});