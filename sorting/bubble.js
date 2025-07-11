async function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        updateBar(j, arr[j]);
        updateBar(j + 1, arr[j + 1]);
        await sleep();
      }
    }
  }
  return arr;
}
