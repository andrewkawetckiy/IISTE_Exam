async function mergeSort(arr) {
  const original = [...arr];
  showOriginalArray(original);

  if (arr.length > 1) {
    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);

    await mergeSort(left);
    await mergeSort(right);

    let i = 0, j = 0, k = 0;

    while (i < left.length && j < right.length) {
      if (left[i] < right[j]) {
        arr[k] = left[i];
        updateBar(k, arr[k]);
        await sleep(50); // регулює швидкість анімації
        i++;
      } else {
        arr[k] = right[j];
        updateBar(k, arr[k]);
        await sleep(50); // регулює швидкість анімації
        j++;
      }
      k++;
    }

    while (i < left.length) {
      arr[k] = left[i];
      updateBar(k, arr[k]);
      await sleep(50); // регулює швидкість анімації
      i++;
      k++;
    }

    while (j < right.length) {
      arr[k] = right[j];
      updateBar(k, arr[k]);
      await sleep(50); // регулює швидкість анімації
      j++;
      k++;
    }
  }

  showSortedArray(arr, "Merge Sort");
}

function startMerge() {
  resetBars();
  let arr = [...bars];
  mergeSort(arr);
}

async function sleep() {
  return new Promise(resolve => setTimeout(resolve, sleepDuration));
}
