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
