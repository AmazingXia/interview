// https://www.cnblogs.com/onepixel/p/7674659.html  十大经典排序算法（动图演示）
// 冒泡排序

function bubbleSort(arr) {
  const len = arr.length;
  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        // 交换
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}

// 选择排序
function selectionSort(arr) {
  const len = arr.length;
  for (let i = 0; i < len - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < len; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
  }
  return arr;
}

// 插入排序
function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let current = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > current) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = current;
  }
  return arr;
}

// 希尔排序（Shell Sort）
function shellSort(arr) {
  let len = arr.length;
  let gap = Math.floor(len / 2);
  while (gap > 0) {
    for (let i = gap; i < len; i++) {
      let temp = arr[i];
      let j = i;
      while (j >= gap && arr[j - gap] > temp) {
        arr[j] = arr[j - gap];
        j -= gap;
      }
      arr[j] = temp;
    }
    gap = Math.floor(gap / 2);
  }
  return arr;
}

// 归并排序（Merge Sort）
function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  while (left.length && right.length) {
    result.push(left[0] <= right[0] ? left.shift() : right.shift());
  }
  return result.concat(left, right);
}

// 6. 快速排序（Quick Sort）
function quickSort(arr) {
  if (arr.length <= 1) return arr;
  const pivot = arr[0];
  const left = arr.slice(1).filter(v => v < pivot);
  const right = arr.slice(1).filter(v => v >= pivot);
  return [...quickSort(left), pivot, ...quickSort(right)];
}
// 7. 计数排序（Counting Sort）——适合正整数
function countingSort(arr, maxValue) {
  const bucket = Array(maxValue + 1).fill(0);
  for (let num of arr) {
    bucket[num]++;
  }
  let sorted = [];
  for (let i = 0; i < bucket.length; i++) {
    while (bucket[i] > 0) {
      sorted.push(i);
      bucket[i]--;
    }
  }
  return sorted;
}

// 8. 基数排序（Radix Sort）——适合非负整数
function radixSort(arr) {
  const max = Math.max(...arr);
  let exp = 1;
  while (Math.floor(max / exp) > 0) {
    arr = countingSortByDigit(arr, exp);
    exp *= 10;
  }
  return arr;
}

function countingSortByDigit(arr, exp) {
  const output = new Array(arr.length);
  const count = Array(10).fill(0);

  for (let i = 0; i < arr.length; i++) {
    let digit = Math.floor(arr[i] / exp) % 10;
    count[digit]++;
  }

  for (let i = 1; i < 10; i++) {
    count[i] += count[i - 1];
  }

  for (let i = arr.length - 1; i >= 0; i--) {
    let digit = Math.floor(arr[i] / exp) % 10;
    output[--count[digit]] = arr[i];
  }

  return output;
}

// 9. 堆排序（Heap Sort）
function heapSort(arr) {
  buildMaxHeap(arr);
  for (let i = arr.length - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, 0, i);
  }
  return arr;
}

function buildMaxHeap(arr) {
  const len = arr.length;
  for (let i = Math.floor(len / 2) - 1; i >= 0; i--) {
    heapify(arr, i, len);
  }
}

function heapify(arr, i, len) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  if (left < len && arr[left] > arr[largest]) largest = left;
  if (right < len && arr[right] > arr[largest]) largest = right;

  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, largest, len);
  }
}
