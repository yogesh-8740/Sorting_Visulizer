export function generateArray(size: number): number[] {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1)
}

export function* bubbleSort(arr: number[], ascending = true) {
  const n = arr.length
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if ((arr[j] > arr[j + 1] && ascending) || (arr[j] < arr[j + 1] && !ascending)) {
        ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
      }
      yield {
        array: [...arr],
        comparing: [j, j + 1],
        sorted: Array.from({ length: i + 1 }, (_, k) => n - 1 - k),
      }
    }
  }
}

export function* insertionSort(arr: number[], ascending = true) {
  for (let i = 1; i < arr.length; i++) {
    let j = i - 1
    const key = arr[i]

    while (j >= 0 && ((arr[j] > key && ascending) || (arr[j] < key && !ascending))) {
      arr[j + 1] = arr[j]
      j--
      yield {
        array: [...arr],
        comparing: [j, i],
        sorted: Array.from({ length: i }, (_, k) => k),
      }
    }
    arr[j + 1] = key
    yield {
      array: [...arr],
      comparing: [j + 1],
      sorted: Array.from({ length: i + 1 }, (_, k) => k),
    }
  }
}

export function* selectionSort(arr: number[], ascending = true) {
  const n = arr.length
  for (let i = 0; i < n - 1; i++) {
    let extremeIdx = i
    for (let j = i + 1; j < n; j++) {
      if ((arr[j] < arr[extremeIdx] && ascending) || (arr[j] > arr[extremeIdx] && !ascending)) {
        extremeIdx = j
      }
      yield {
        array: [...arr],
        comparing: [i, extremeIdx],
        sorted: Array.from({ length: i }, (_, k) => k),
      }
    }
    ;[arr[i], arr[extremeIdx]] = [arr[extremeIdx], arr[i]]
    yield {
      array: [...arr],
      comparing: [i],
      sorted: Array.from({ length: i + 1 }, (_, k) => k),
    }
  }
}

export function* quickSort(arr: number[], ascending = true) {
  function* partition(low: number, high: number) {
    const pivot = arr[high]
    let i = low - 1

    for (let j = low; j < high; j++) {
      if ((arr[j] < pivot && ascending) || (arr[j] > pivot && !ascending)) {
        i++
        ;[arr[i], arr[j]] = [arr[j], arr[i]]
      }
      yield {
        array: [...arr],
        comparing: [i, j],
        sorted: [],
      }
    }
    ;[arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]
    yield {
      array: [...arr],
      comparing: [i + 1, high],
      sorted: [],
    }
    return i + 1
  }

  function* quickSortHelper(low: number, high: number) {
    if (low < high) {
      const pi = yield* partition(low, high)
      yield* quickSortHelper(low, pi - 1)
      yield* quickSortHelper(pi + 1, high)
    }
  }

  yield* quickSortHelper(0, arr.length - 1)
}

export function* mergeSort(arr: number[], ascending = true) {
  function* merge(left: number, mid: number, right: number) {
    const leftArr = arr.slice(left, mid + 1)
    const rightArr = arr.slice(mid + 1, right + 1)
    let i = 0,
      j = 0,
      k = left

    while (i < leftArr.length && j < rightArr.length) {
      if ((leftArr[i] <= rightArr[j] && ascending) || (leftArr[i] > rightArr[j] && !ascending)) {
        arr[k] = leftArr[i]
        i++
      } else {
        arr[k] = rightArr[j]
        j++
      }
      k++
      yield {
        array: [...arr],
        comparing: [k - 1],
        sorted: [],
      }
    }

    while (i < leftArr.length) {
      arr[k] = leftArr[i]
      i++
      k++
      yield {
        array: [...arr],
        comparing: [k - 1],
        sorted: [],
      }
    }

    while (j < rightArr.length) {
      arr[k] = rightArr[j]
      j++
      k++
      yield {
        array: [...arr],
        comparing: [k - 1],
        sorted: [],
      }
    }
  }

  function* mergeSortHelper(left: number, right: number) {
    if (left < right) {
      const mid = Math.floor((left + right) / 2)
      yield* mergeSortHelper(left, mid)
      yield* mergeSortHelper(mid + 1, right)
      yield* merge(left, mid, right)
    }
  }

  yield* mergeSortHelper(0, arr.length - 1)
}
