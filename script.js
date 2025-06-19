import { bubbleSort } from './sorting/bubble.js';

const array = [5, 1, 4, 3, 2, 6, 9, 7, 8];
const barWidth = 1;
const spacing = 1.2;
const scene = document.querySelector("#bars");

function createBars(arr) {
  scene.innerHTML = "";
  arr.forEach((value, i) => {
    const bar = document.createElement("a-box");
    bar.setAttribute("color", "#4CC3D9");
    bar.setAttribute("depth", 1);
    bar.setAttribute("width", barWidth);
    bar.setAttribute("height", value);
    bar.setAttribute("position", {
      x: i * spacing,
      y: value / 2,
      z: 0
    });
    bar.setAttribute("id", `bar-${i}`);
    scene.appendChild(bar);
  });
}

createBars(array);

// Додати кнопку
const startBtn = document.createElement("button");
startBtn.innerText = "Start Bubble Sort";
startBtn.style.position = "absolute";
startBtn.style.top = "10px";
startBtn.style.left = "10px";
startBtn.style.padding = "10px";
startBtn.style.zIndex = 10;
document.body.appendChild(startBtn);

startBtn.onclick = () => {
  bubbleSort(array.slice(), 300); // копія масиву
};
