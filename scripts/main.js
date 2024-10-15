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