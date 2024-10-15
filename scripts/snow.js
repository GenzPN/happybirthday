const canvas = document.getElementById('snow');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const snowflakes = [];

function createSnowflake() {
  return {
    x: Math.random() * canvas.width,
    y: 0,
    radius: Math.random() * 3 + 2, // Tăng kích thước từ 2 đến 5 pixel
    speed: Math.random() * 1.5 + 0.5,
    opacity: Math.random() * 0.5 + 0.3, // Tăng độ mờ tối thiểu
    glow: Math.random() * 8 + 5 // Tăng độ phát sáng từ 5 đến 13 pixel
  };
}

function drawSnowflake(snowflake) {
  ctx.save();
  ctx.beginPath();
  
  // Vẽ hiệu ứng phát sáng
  const gradient = ctx.createRadialGradient(
    snowflake.x, snowflake.y, 0,
    snowflake.x, snowflake.y, snowflake.glow
  );
  gradient.addColorStop(0, `rgba(255, 255, 255, ${snowflake.opacity * 0.8})`);
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
  
  ctx.fillStyle = gradient;
  ctx.arc(snowflake.x, snowflake.y, snowflake.glow, 0, Math.PI * 2);
  ctx.fill();
  
  // Vẽ bông tuyết
  ctx.beginPath();
  ctx.arc(snowflake.x, snowflake.y, snowflake.radius, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(255, 255, 255, ${snowflake.opacity})`;
  ctx.fill();
  
  ctx.restore();
}

function moveSnowflake(snowflake) {
  snowflake.y += snowflake.speed;
  snowflake.x += Math.sin(snowflake.y * 0.01) * 0.7; // Tăng biên độ dao động ngang

  if (snowflake.y > canvas.height) {
    snowflake.y = 0;
    snowflake.x = Math.random() * canvas.width;
  }
}

function updateSnowflakes() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (snowflakes.length < 150) { // Giảm số lượng bông tuyết để cân bằng với kích thước lớn hơn
    snowflakes.push(createSnowflake());
  }

  for (let snowflake of snowflakes) {
    drawSnowflake(snowflake);
    moveSnowflake(snowflake);
  }

  requestAnimationFrame(updateSnowflakes);
}

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

updateSnowflakes();

function toggleSnow(show) {
  const snowCanvas = document.getElementById('snow');
  snowCanvas.style.display = show ? 'block' : 'none';
}

window.toggleSnow = toggleSnow;
