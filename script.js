let bars = [];
const NUM_BARS = 15; // кількість стовпчиків
const MAX_HEIGHT = 15; // максимальна висота стовпчика

function setup() {
  const container = document.getElementById('bars-container');

  bars = [];
  for (let i = 0; i < NUM_BARS; i++) {
    bars[i] = Math.floor(Math.random() * MAX_HEIGHT) + 1;
  }

  bars.forEach((height, i) => {
    const bar = document.createElement('a-cylinder');
    bar.setAttribute('position', { x: i - NUM_BARS / 2, y: height / 2, z: 0 });
    bar.setAttribute('radius', 0.2);
    bar.setAttribute('height', height);
    bar.setAttribute('color', '#0099ff');
    bar.setAttribute('id', `bar-${i}`);
    bar.setAttribute('order', i); // Задаємо порядок зображення
    container.appendChild(bar);
  });
}

function updateBar(i, newHeight) {
  const bar = document.querySelector(`#bar-${i}`);
  if (!bar) return;

  bar.setAttribute('height', newHeight);
  bar.setAttribute('position', {
    x: i - NUM_BARS / 2, // Правильна позиція за індексом
    y: newHeight / 2,
    z: 0
  });

  bar.setAttribute('color', '#ff0000');
  setTimeout(() => {
    bar.setAttribute('color', '#0099ff');
  }, 100);
}

function resetBars() {
  const container = document.getElementById('bars-container');
  container.innerHTML = '';
  setup();
}

function showOriginalArray(arr) {
  const el = document.getElementById('original-array');
  el.textContent = `[${arr.join(', ')}]`;
}

function showSortedArray(arr, sortName) {
  const elRes = document.getElementById('sorted-array');
  const elName = document.getElementById('sorted-by');

  elRes.textContent = `[${arr.join(', ')}]`;
  elName.textContent = sortName;
}

window.onload = setup;
