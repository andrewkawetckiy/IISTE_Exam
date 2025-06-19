export async function bubbleSort(arr, speed = 500) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        updateBars(arr);
        await delay(speed);
      }
    }
  }
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function updateBars(arr) {
  const scene = document.querySelector("#bars");
  scene.innerHTML = "";

  arr.forEach((value, i) => {
    const bar = document.createElement("a-box");
    bar.setAttribute("color", "#00FFFF");
    bar.setAttribute("depth", 1);
    bar.setAttribute("width", 1);
    bar.setAttribute("height", value);
    bar.setAttribute("position", {
      x: i * 1.2,
      y: value / 2,
      z: 0
    });
    scene.appendChild(bar);
  });
}
