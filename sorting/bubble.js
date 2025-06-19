export async function bubbleSort(arr, speed = 500) {
  let len = arr.length;
  let swapped;

  for (let i = 0; i < len; i++) {
    swapped = false;
    for (let j = 0; j < len - i - 1; j++) {
      const a = arr[j];
      const b = arr[j + 1];

      if (a > b) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        await swapBars(j, j + 1, arr);
        await delay(speed);
        swapped = true;
      }
    }
    if (!swapped) break;
  }
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function swapBars(i, j, arr) {
  const bar1 = document.querySelector(`#bar-${i}`);
  const bar2 = document.querySelector(`#bar-${j}`);

  if (!bar1 || !bar2) return;

  const pos1 = bar1.getAttribute("position");
  const pos2 = bar2.getAttribute("position");

  // Обмін позицій
  bar1.setAttribute("position", { x: pos2.x, y: pos1.y, z: pos1.z });
  bar2.setAttribute("position", { x: pos1.x, y: pos2.y, z: pos2.z });

  // Обмін ID
  bar1.setAttribute("id", "temp-bar");
  bar2.setAttribute("id", `bar-${i}`);
  document.querySelector("#temp-bar").setAttribute("id", `bar-${j}`);
}
