class MyPromise {
  constructor(exec) {
    // 初始化状态、值和回调数组
    this.value = null; // 用于存储成功的结果
    this.reason = ''; // 用于存储失败的原因
    this.resolveCbs = []; // 存储所有成功回调
    this.rejectCbs = []; // 存储所有失败回调
    this.state = 'pending'; // 初始状态为 pending（待定）

    // resolve 方法，用于将 Promise 状态从 'pending' 改为 'fulfilled'
    const resolve = (value) => {
      if (this.state !== 'pending') return; // 如果 Promise 已经解决或拒绝，什么都不做
      this.state = 'fulfilled'; // 设置状态为 'fulfilled'
      this.value = value; // 存储成功结果
      this.resolveCbs.forEach(fn => fn(value)); // 执行所有成功回调
    }

    // reject 方法，用于将 Promise 状态从 'pending' 改为 'rejected'
    const reject = (reason) => {
      if (this.state !== 'pending') return; // 如果 Promise 已经解决或拒绝，什么都不做
      this.state = 'rejected'; // 设置状态为 'rejected'
      this.reason = reason; // 存储失败原因
      this.rejectCbs.forEach(fn => fn(reason)); // 执行所有失败回调
    }

    try {
      exec(resolve, reject); // 执行传入的 executor 函数，开始异步操作
    } catch (error) {
      reject(error); // 如果 executor 函数抛出异常，调用 reject
    }
  }

  // then 方法用于注册回调
  then(successCb, failCb) {
    return new MyPromise((resolve, reject) => {
      // 当状态已经是 'fulfilled'（成功）时，立即执行成功回调
      if (this.state === 'fulfilled') {
        setTimeout(() => {
          try {
            const result = successCb(this.value); // 执行成功回调
            resolve(result); // 返回一个新的 MyPromise，继续链式调用
          } catch (error) {
            reject(error); // 如果回调抛出异常，拒绝 Promise
          }
        }, 0); // 使用 setTimeout 将回调放入任务队列，确保是异步执行
      } else if (this.state === 'rejected') { // 如果状态是 'rejected'（失败）
        setTimeout(() => {
          try {
            const result = failCb(this.reason); // 执行失败回调
            resolve(result); // 返回一个新的 MyPromise，继续链式调用
          } catch (error) {
            reject(error); // 如果回调抛出异常，拒绝 Promise
          }
        }, 0); // 使用 setTimeout 同样确保是异步执行
      } else if (this.state === 'pending') { // 如果状态是 'pending'（待定），将回调添加到数组中
        this.resolveCbs.push((value) => {
          setTimeout(() => {
            const value = successCb(this.value); // 执行成功回调
            resolve(value); // 返回一个新的 MyPromise，继续链式调用
          }, 0);
        })
        this.rejectCbs.push((reason) => {
          setTimeout(() => {
            const value = failCb(this.reason); // 执行失败回调
            resolve(value); // 返回一个新的 MyPromise，继续链式调用
          }, 0);
        })
      }
    });
  }

  // resolve 方法，用于返回一个新的已成功的 Promise
  resolve(value) {
    return new MyPromise((resolve, reject) => {
      resolve(value); // 直接调用 resolve 将 Promise 状态设为 fulfilled
    })
  }

  // reject 方法，用于返回一个新的已拒绝的 Promise
  reject(reason) {
    return new MyPromise((resolve, reject) => {
      reject(reason); // 直接调用 reject 将 Promise 状态设为 rejected
    })
  }
}


// 使用示例
const promise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('成功!'); // 模拟异步操作，1秒后 Promise 被解决
  }, 1000);
});

// 链式调用 then 方法
promise.then(
  value => console.log(value), // 输出 '成功!'
  reason => console.log(reason) // 不会执行
);




// setTimeout 的作用
// 确保回调是异步执行： 在 then 方法中，setTimeout 被用于确保回调是异步执行的。虽然 resolve 或 reject 调用是同步的，但 setTimeout 可以将回调放入任务队列，确保它们在当前执行栈完成后再执行。这样可以模拟 Promise 的异步行为，避免同步回调的立即执行。

// 符合 Promise 的规范： 在 Promise 的规范中，then 方法的回调必须是异步执行的，即使在 Promise 已经是 fulfilled 或 rejected 状态时。setTimeout 可以确保这一点，因此符合 Promise 的实现规范。

// 为什么需要加 setTimeout
// 确保 then 中的回调是异步的： 如果直接同步执行回调（不使用 setTimeout），那么 then 中的回调将会立即执行，这就违反了 Promise 的规范，即使 Promise 已经处于 fulfilled 或 rejected 状态时。setTimeout 确保回调是异步的，这与 Promise 的行为一致。

// 模拟 JavaScript 的事件循环： 使用 setTimeout 是为了模拟异步操作的行为，因为 Promise 的核心特性就是异步操作（即使是成功或失败后立刻回调，也需要确保是在微任务队列中执行）。通过将回调推入队列中，可以保证代码的顺序性和异步性。