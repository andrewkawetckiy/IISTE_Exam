async function mergeSort(arr) {
  const original = [...arr];
  showOriginalArray(original);

  const startTime = startTimer();

  await _mergeSort(arr, 0, arr.length - 1);

  endTimer("Merge Sort", startTime);
  showSortedArray(arr, "Merge Sort");
}

async function _mergeSort(arr, l, r) {
  if (l >= r) return;

  const m = Math.floor((l + r) / 2);
  await _mergeSort(arr, l, m);
  await _mergeSort(arr, m + 1, r);
  await merge(arr, l, m, r);
}

async function merge(arr, l, m, r) {
  let left = arr.slice(l, m + 1);
  let right = arr.slice(m + 1, r + 1);

  let i = 0, j = 0, k = l;

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      arr[k] = left[i];
      updateBar(k, arr[k]);
      await sleep(50);
      i++;
    } else {
      arr[k] = right[j];
      updateBar(k, arr[k]);
      await sleep(50);
      j++;
    }
    k++;
  }

  while (i < left.length) {
    arr[k] = left[i];
    updateBar(k, arr[k]);
    await sleep(50);
    i++;
    k++;
  }

  while (j < right.length) {
    arr[k] = right[j];
    updateBar(k, arr[k]);
    await sleep(50);
    j++;
    k++;
  }
}

function startMerge() {
  resetBars();
  let arr = [...bars];
  mergeSort(arr);
}
