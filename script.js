const array = [5, 1, 4, 3, 2, 6, 9, 7, 8];
const barWidth = 1;
const spacing = 1.2;
const scene = document.querySelector("#bars");

function createBars(arr) {
  scene.innerHTML = ""; // очищення попередніх барів
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


import('./sorting/bubble.js').then(module => {
  const startBtn = document.createElement("button");
  startBtn.innerText = "Start Bubble Sort";
  startBtn.style.position = "absolute";
  startBtn.style.top = "10px";
  startBtn.style.left = "10px";
  startBtn.style.padding = "10px";
  document.body.appendChild(startBtn);

  startBtn.onclick = () => {
    module.bubbleSort(array.slice(), 500); // копія масиву для сортування
  };
});
