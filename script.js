let bars = [];
const NUM_BARS = 15; // зменшили до 15
const MAX_HEIGHT = 5;

function setup() {
  const container = document.getElementById('bars-container');

  // Генеруємо масив випадкових значень
  bars = [];
  for (let i = 0; i < NUM_BARS; i++) {
    bars[i] = Math.random() * MAX_HEIGHT + 0.1;
  }

  // Створюємо 3D-циліндри
  bars.forEach((height, i) => {
    const bar = document.createElement('a-cylinder');
    bar.setAttribute('position', { x: i - NUM_BARS / 2, y: height / 2, z: 0 });
    bar.setAttribute('radius', 0.2);
    bar.setAttribute('height', height);
    bar.setAttribute('color', '#0099ff');
    bar.setAttribute('id', `bar-${i}`);
    container.appendChild(bar);
  });
}

function updateBar(i, newHeight) {
  const bar = document.querySelector(`#bar-${i}`);
  if (!bar) return;

  bar.setAttribute('height', newHeight);
  bar.setAttribute('position', {
    x: bar.getAttribute('position').x,
    y: newHeight / 2,
    z: 0
  });

  // Змінюємо колір для анімації
  bar.setAttribute('color', '#ff0000');
  setTimeout(() => {
    bar.setAttribute('color', '#0099ff');
  }, 100);
}

function resetBars() {
  const container = document.getElementById('bars-container');
  container.innerHTML = ''; // очищуємо
  setup(); // створюємо заново
}

// Виклик setup при завантаженні
window.onload = setup;
