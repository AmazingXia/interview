const arr1 = [11, 12, 13, 14, 15];
const arr2 = [21, 22, 23, 24, 25, 26];
const arr3 = [31, 32, 33, 34, 35];



let index1 = 0;
let index2 = 0;
let index3 = 0;

const result = [];

let arr = [arr1[index1], arr2[index2], arr3[index3]].filter(num => num !== undefined);

while (arr.length > 0) {
  const min = Math.min(...arr);
  console.log('min===>', min);
  result.push(min);

  if (min === arr1[index1]) {
    index1++;
  } else if (min === arr2[index2]) {
    index2++;
  } else {
    index3++;
  }

  arr = [arr1[index1], arr2[index2], arr3[index3]].filter(num => num !== undefined);
}

console.log('result===>', result);