/*
 * @lc app=leetcode.cn id=56 lang=javascript
 *
 * [56] 合并区间
 */

// @lc code=start
/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
function merge(intervals) {
  if (!intervals.length) return [];

  // Step 1: 排序
  intervals.sort((a, b) => a[0] - b[0]);

  const merged = [intervals[0]];

  // Step 2: 遍历并合并
  for (let i = 1; i < intervals.length; i++) {
    const prev = merged[merged.length - 1];
    const curr = intervals[i];

    if (curr[0] <= prev[1]) {
      // 有重叠，更新结束位置
      prev[1] = Math.max(prev[1], curr[1]);
    } else {
      // 无重叠，加入结果
      merged.push(curr);
    }
  }

  return merged;
}

// @lc code=end

