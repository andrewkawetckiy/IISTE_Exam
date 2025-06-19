// bubble.js

async function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // Обмін елементів
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];

        // Оновлюємо візуалізацію
        updateBar(j, arr[j]);
        updateBar(j + 1, arr[j + 1]);

        // Затримка для анімації
        await sleep(50);
      }
    }
  }
}

function startBubble() {
  console.log("startBubble викликана!");
  resetBars();
  let arr = [...bars]; // копія масиву
  bubbleSort(arr);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
