// 实例方法（promise. 开头）
// Promise.any() 示例
const promises = [
  Promise.reject('Error 1'),
  Promise.resolve('Success 1'),
  Promise.resolve('Success 2')
];

Promise.any(promises)
  .then(result => console.log('Promise.any resolved with:', result))
  .catch(error => console.log('Promise.any rejected with:', error));

// Promise.allSettled() 示例
const promises2 = [
  Promise.resolve('Success A'),
  Promise.reject('Error B'),
  Promise.resolve('Success C')
];

Promise.allSettled(promises2)
  .then(results => console.log('Promise.allSettled results:', results));

// 二、实例方法（promise. 开头）
// .then(onFulfilled, onRejected)
// .catch(onRejected)
// .finally(onFinally)

// 三、静态方法（Promise. 开头）
// Promise.resolve(value)
// Promise.reject(reason)
// Promise.all(iterable)
// Promise.allSettled(iterable)
// Promise.any(iterable)
// Promise.race(iterable)


Promise.withResolvers() // （ES2024 / ES15）
const { promise, resolve, reject } = Promise.withResolvers();
setTimeout(() => resolve('done'), 1000);
promise.then(console.log); // "done"

// ✅ 模拟实现 Promise.all
function myPromiseAll(promises) {
  return new Promise((resolve, reject) => {
    const results = [];
    let completed = 0;

    const total = promises.length;
    if (total === 0) return resolve([]); // 空数组直接 resolve

    promises.forEach((p, i) => {
      Promise.resolve(p).then(value => {
        results[i] = value;
        completed++;
        if (completed === total) {
          resolve(results);
        }
      }).catch(err => {
        reject(err); // 只要有一个失败，立即 reject
      });
    });
  });
}

