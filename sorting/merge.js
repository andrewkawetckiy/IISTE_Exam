async function mergeSort(arr) {
  const copy = [...arr];

  async function merge(left, right, target) {
    let i = 0, j = 0, k = 0;

    while (i < left.length && j < right.length) {
      if (left[i] < right[j]) {
        target[k] = left[i++];
      } else {
        target[k] = right[j++];
      }
      updateBar(k++, target[k - 1]);
      await sleep();
    }

    while (i < left.length) {
      target[k] = left[i++];
      updateBar(k++, target[k - 1]);
      await sleep();
    }

    while (j < right.length) {
      target[k] = right[j++];
      updateBar(k++, target[k - 1]);
      await sleep();
    }
  }

  async function sort(array) {
    const n = array.length;
    if (n < 2) return array;

    const mid = Math.floor(n / 2);
    const left = array.slice(0, mid);
    const right = array.slice(mid);

    await sort(left);
    await sort(right);

    await merge(left, right, array);
    return array;
  }

  return sort(copy);
}
