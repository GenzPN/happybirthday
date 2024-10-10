const BUTTON = document.querySelector("button");

const TOGGLE = () => {
  const IS_PRESSED = BUTTON.matches("[aria-pressed=true]");
  document.body.setAttribute("data-dark-mode", IS_PRESSED ? false : true);
  document.body.classList.toggle('dark', !IS_PRESSED); // Đảm bảo dòng này tồn tại
  BUTTON.setAttribute("aria-pressed", IS_PRESSED ? false : true);
  updateCardColors();
};

BUTTON.addEventListener("click", TOGGLE);

// Thêm đoạn này để đồng bộ trạng thái ban đầu
document.addEventListener("DOMContentLoaded", () => {
  const IS_PRESSED = BUTTON.matches("[aria-pressed=true]");
  document.body.setAttribute("data-dark-mode", IS_PRESSED);
  document.body.classList.toggle('dark', IS_PRESSED);
  updateCardColors();
});
