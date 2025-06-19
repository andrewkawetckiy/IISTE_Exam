let bars = [];
const NUM_BARS = 15;
const MAX_HEIGHT = 15;

let sleepDuration = 50; // швидкість анімації за замовчуванням
let recognition;

function sleep() {
  return new Promise(resolve => setTimeout(resolve, sleepDuration));
}

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
    container.appendChild(bar);
  });
}

function updateBar(i, newHeight) {
  const bar = document.querySelector(`#bar-${i}`);
  if (!bar) return;

  bar.setAttribute('height', newHeight);
  bar.setAttribute('position', {
    x: i - NUM_BARS / 2,
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

// Порівняння часу сортування
async function measureSortTime(sortFunction, sortName) {
  const arr = JSON.parse(JSON.stringify(bars)); // глибока копія
  const originalArr = [...arr]; // для відображення

  const startTime = performance.now();
  await sortFunction([...originalArr]); // передаємо нову копію
  const endTime = performance.now();

  const duration = endTime - startTime;
  updateComparisonTable(sortName, duration.toFixed(2));
}

function updateComparisonTable(algorithm, time) {
  const rows = document.querySelectorAll('#comparison-body tr');
  rows.forEach(row => {
    const cells = row.querySelectorAll('td');
    if (cells[0].textContent === algorithm) {
      cells[1].textContent = `${time} мс`;
    }
  });
}

// Голосове управління
function initSpeechRecognition() {
  if (!('webkitSpeechRecognition' in window)) {
    alert('⚠️ Ваш браузер не підтримує Web Speech API');
    return false;
  }

  recognition = new webkitSpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = 'en-US';

  recognition.onresult = function(event) {
    const transcript = event.results[0][0].transcript.trim().toLowerCase();
    console.log("Розпізнано:", transcript);
    handleVoiceCommand(transcript);
  };

  recognition.onerror = function(event) {
    console.error("Помилка розпізнавання:", event.error);
    alert("Помилка розпізнавання голосу: " + event.error);
  };

  recognition.onend = function() {
    setTimeout(() => recognition.start(), 500); // продовжуємо слухати
  };
}

function startVoiceControl() {
  if (!recognition) initSpeechRecognition();
  recognition.start();
  alert("🎧 Слухаю... Скажіть: bubble sort, quick sort, merge sort, reset або speed [faster/slower/normal]");
}

function handleVoiceCommand(command) {
  if (command.includes('bubble')) {
    startBubble();
  } else if (command.includes('quick')) {
    startQuick();
  } else if (command.includes('merge')) {
    startMerge();
  } else if (command.includes('reset')) {
    resetBars();
  } else if (command.includes('faster')) {
    increaseSpeed();
  } else if (command.includes('slower')) {
    decreaseSpeed();
  } else if (command.includes('normal')) {
    resetSpeed();
  } else {
    alert("❌ Не розумію: " + command);
  }
}

// Керування швидкістю
function updateSpeedDisplay() {
  const speedEl = document.getElementById('current-speed');
  if (speedEl) {
    speedEl.textContent = sleepDuration;
  }
}

function setSpeed(ms) {
  sleepDuration = ms;
  updateSpeedDisplay();
}

function increaseSpeed() {
  if (sleepDuration > 10) {
    sleepDuration -= 10;
    updateSpeedDisplay();
  }
}

function decreaseSpeed() {
  sleepDuration += 10;
  updateSpeedDisplay();
}

function resetSpeed() {
  sleepDuration = 50;
  updateSpeedDisplay();
}

// Запуск алгоритмів
async function runSort(sortFunction, sortName) {
  const arr = JSON.parse(JSON.stringify(bars)); // глибока копія
  showOriginalArray(arr);

  const startTime = performance.now();
  const sortedArr = await sortFunction([...arr]);
  const endTime = performance.now();

  const duration = endTime - startTime;
  updateComparisonTable(sortName, duration.toFixed(2));
  showSortedArray(sortedArr, sortName);

  // оновлюємо стовпчики на основі відсортованого масиву
  for (let i = 0; i < sortedArr.length; i++) {
    updateBar(i, sortedArr[i]);
    await sleep(); // щоб була анімація оновлення
  }
}

function startBubble() {
  runSort(bubbleSort, "Bubble Sort");
}

function startQuick() {
  runSort(quickSort, "Quick Sort");
}

function startMerge() {
  runSort(mergeSort, "Merge Sort");
}

window.onload = () => {
  setup();
  updateSpeedDisplay();
};
