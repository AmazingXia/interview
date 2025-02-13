// 广度优先遍历 breadth-first traversal
/**
 * 把所有children拼接成一维数组
 * @param {*} cb
 */
export function breadthFirst(tree, cb) {
  let queue = tree;
  for (let i = 0; i < queue.length; i++) {
    cb(queue[i]);
    if (queue[i].children) {
      queue = queue.concat(queue[i].children);
    }
  }
}