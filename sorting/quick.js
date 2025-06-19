async function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low === 0 && high === arr.length - 1) {
    const startTime = startTimer();

    await _quickSort(arr, low, high);

    endTimer("Quick Sort", startTime);
    showSortedArray(arr, "Quick Sort");
  } else {
    await _quickSort(arr, low, high);
  }
}

async function _quickSort(arr, low, high) {
  if (low < high) {
    const pi = await partition(arr, low, high);
    await quickSort(arr, low, pi - 1);
    await quickSort(arr, pi + 1, high);
  }
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
      await sleep(50);
    }
  }

  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  updateBar(i + 1, arr[i + 1]);
  updateBar(high, arr[high]);
  await sleep(50);

  return i + 1;
}

function startQuick() {
  resetBars();
  let arr = [...bars];
  quickSort(arr);
}
