async function quickSort(arr) {
  const copy = [...arr];

  async function recursiveQuickSort(low, high) {
    if (low < high) {
      const pi = await partition(low, high);
      await recursiveQuickSort(low, pi - 1);
      await recursiveQuickSort(pi + 1, high);
    }
  }

  async function partition(low, high) {
    const pivot = copy[high];
    let i = low - 1;

    for (let j = low; j <= high - 1; j++) {
      if (copy[j] < pivot) {
        i++;
        [copy[i], copy[j]] = [copy[j], copy[i]];
        updateBar(i, copy[i]);
        updateBar(j, copy[j]);
        await sleep();
      }
    }

    [copy[i + 1], copy[high]] = [copy[high], copy[i + 1]];
    updateBar(i + 1, copy[i + 1]);
    updateBar(high, copy[high]);
    await sleep();

    return i + 1;
  }

  await recursiveQuickSort(0, copy.length - 1);
  return copy;
}
