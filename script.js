let bars = [];
const NUM_BARS = 15;
const MAX_HEIGHT = 15;

let speedMultiplier = 1;
let timings = {};

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

function startTimer() {
  return performance.now();
}

function endTimer(name, startTime) {
  const endTime = performance.now();
  const duration = endTime - startTime;
  timings[name] = duration.toFixed(2);
  updateTimingsTable();
}

function updateTimingsTable() {
  const container = document.getElementById("timings");
  if (!container) return;

  container.innerHTML = `
    <h3>⏱️ Час сортування:</h3>
    <ul>
      ${Object.entries(timings)
        .sort((a, b) => a[1] - b[1])
        .map(([name, time]) => `<li><strong>${name}:</strong> ${time} мс</li>`)
        .join("")}
    </ul>
  `;
}

// Голосове керування
if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
  const Recognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new Recognition();

  recognition.lang = "uk-UA";
  recognition.continuous = true;
  recognition.interimResults = false;

  recognition.onresult = function (event) {
    for (let i = event.resultIndex; i < event.results.length; ++i) {
      const transcript = event.results[i][0].transcript.toLowerCase();

      console.log("Розпізнано:", transcript);

      if (transcript.includes("бульбашка") || transcript.includes("bubble")) {
        startBubble();
      } else if (transcript.includes("швидше")) {
        speedMultiplier = Math.max(0.1, speedMultiplier - 0.2);
        alert(`Швидкість: x${speedMultiplier.toFixed(1)}`);
      } else if (transcript.includes("повільніше")) {
        speedMultiplier = Math.min(2, speedMultiplier + 0.2);
        alert(`Швидкість: x${speedMultiplier.toFixed(1)}`);
      } else if (transcript.includes("швидкість один")) {
        speedMultiplier = 1;
        alert("Швидкість: x1");
      }
    }
  };

  recognition.onerror = function (event) {
    console.error("Помилка розпізнавання:", event.error);
  };

  recognition.start(); // Почати слухання
}

window.onload = setup;

function sleep(ms) {
  return new Promise((resolve) =>
    setTimeout(resolve, ms * (1 / speedMultiplier))
  );
}
