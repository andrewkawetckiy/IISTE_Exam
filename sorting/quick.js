async function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const pi = await partition(arr, low, high);
    await quickSort(arr, low, pi - 1);
    await quickSort(arr, pi + 1, high);
  }

  showSortedArray(arr, "Quick Sort");
}

async function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;

  for (let j = low; j <= high - 1; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
      updateBar(i, arr[i]);
      updateBar(j, arr[j]);
      await sleep();
    }
  }

  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  updateBar(i + 1, arr[i + 1]);
  updateBar(high, arr[high]);
  await sleep();

  return i + 1;
}

function startQuick() {
  resetBars();
  let arr = [...bars];
  quickSort(arr);
}
