const BUTTON = document.querySelector("button");

// Sửa đổi hàm TOGGLE trong file scripts/main.js
const TOGGLE = () => {
  const IS_PRESSED = BUTTON.matches("[aria-pressed=true]");
  const NEW_PRESSED_STATE = !IS_PRESSED;
  
  document.body.setAttribute("data-dark-mode", NEW_PRESSED_STATE);
  document.body.classList.toggle('dark', NEW_PRESSED_STATE);
  BUTTON.setAttribute("aria-pressed", NEW_PRESSED_STATE);
  
  // Thêm dòng này để cập nhật màu nền
  updateBackgroundColor(NEW_PRESSED_STATE);
};

BUTTON.addEventListener("click", TOGGLE);

// Thêm đoạn này để đồng bộ trạng thái ban đầu
document.addEventListener("DOMContentLoaded", () => {
  const IS_PRESSED = BUTTON.matches("[aria-pressed=true]");
  document.body.setAttribute("data-dark-mode", IS_PRESSED);
  document.body.classList.toggle('dark', IS_PRESSED);
  updateBackgroundColor(IS_PRESSED);
});

// Thêm hàm mới này để cập nhật màu nền
function updateBackgroundColor(isDarkMode) {
  document.body.style.backgroundColor = isDarkMode ? '#1a1a1a' : 'hsl(219, 30%, 88%)';
}

const toggleButton = document.querySelector('.toggle');
const body = document.body;

function toggleDarkMode() {
  const isDarkMode = document.body.classList.contains('dark-mode');
  const modalContent = document.querySelector('.modal-content');
  if (isDarkMode) {
    document.body.classList.remove('dark-mode');
    if (modalContent) modalContent.classList.remove('dark-mode');
    toggleButton.setAttribute('aria-pressed', 'false');
    localStorage.setItem('darkMode', 'false');
  } else {
    enableDarkMode();
  }
}

// Kiểm tra trạng thái dark mode đã lưu
const savedDarkMode = localStorage.getItem('darkMode');

if (savedDarkMode === 'true') {
  body.classList.add('dark-mode');
  toggleButton.setAttribute('aria-pressed', 'true');
}

toggleButton.addEventListener('click', toggleDarkMode);

// Thêm hàm này vào đầu file hoặc nơi phù hợp
function enableDarkMode() {
  document.body.classList.add('dark-mode');
  const toggleButton = document.querySelector('.toggle');
  const modalContent = document.querySelector('.modal-content');
  if (toggleButton) {
    toggleButton.setAttribute('aria-pressed', 'true');
  }
  if (modalContent) {
    modalContent.classList.add('dark-mode');
  }
  localStorage.setItem('darkMode', 'true');
}

// Thêm đoạn code này vào cuối file
document.addEventListener('DOMContentLoaded', () => {
  const readBtn = document.getElementById('readBtn');
  if (readBtn) {
    readBtn.addEventListener('click', () => {
      enableDarkMode();
      // Thêm bất kỳ logic nào khác bạn muốn thực hiện khi nút được nhấn
      // Ví dụ: đóng modal
      const giftModal = document.getElementById('giftModal');
      if (giftModal) {
        giftModal.style.display = 'none';
      }
    });
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const bonusGiftBtn = document.getElementById('bonusGiftBtn');
  const giftModal = document.getElementById('giftModal');
  const notReadBtn = document.getElementById('notReadBtn');

  if (bonusGiftBtn && giftModal) {
    bonusGiftBtn.addEventListener('click', () => {
      giftModal.style.display = 'block';
    });
  }

  if (notReadBtn && giftModal) {
    notReadBtn.addEventListener('click', () => {
      giftModal.style.display = 'none';
    });
  }

  // Đóng modal khi click bên ngoài
  window.addEventListener('click', (event) => {
    if (event.target === giftModal) {
      giftModal.style.display = 'none';
    }
  });
});
