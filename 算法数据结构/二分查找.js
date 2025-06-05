//
const nums = [1, 3, 5, 6, 7, 8, 9];
const target = 7;

var searchInsert = function (nums, target) {
  const n = nums.length;
  let left = 0, right = n - 1;
  while (left <= right) {
    let mid = Math.floor((right + left) / 2);
    console.log('mid===>', mid);
    if (target > nums[mid]) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return left;
};


searchInsert(nums, target);