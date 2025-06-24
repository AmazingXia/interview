// 1. 防抖（Debouncing）
// 概念：
// 防抖是指在事件被触发后，延迟执行回调函数，直到事件停止触发后一定时间才执行。
// 它确保一个事件在一段时间内只会触发一次，常用于 输入框自动搜索、窗口大小调整 等场景。

// 关键特点：
// 每次事件触发时，都会重置定时器。
// 只有事件停止触发一段时间后，回调才会执行。

// 实现原理：
// 当事件触发时，设定一个定时器，等待指定的时间。如果在这段时间内事件再次触发，则取消之前的定时器，并重新设置定时器。直到不再触发事件时，定时器到期，执行回调。

// 典型应用：
// 输入框实时搜索：用户输入时延迟执行搜索请求，避免每输入一个字符就发起请求。
// 调整窗口大小：当窗口大小调整停止一定时间后，再执行相关处理



function aa(fn, time) {
  let timer = null
  if (timer) clearTimeout(timer);

  timer = setTimeout(() => {
    fn();
  }, time);
}
// | 问题                         | 原因                      |
// | -------------------------- | ----------------------- |
// | `timer` 总是 `null`          | 声明在函数内部，每次调用都重新赋值       |
// | `clearTimeout(timer)` 不起作用 | 因为没有记录住上一次的 `timer` ID  |
// | 没有返回一个闭包函数                 | 导致无法在后续调用中共享状态（如 timer） |

function debounce(fn, delay) {
  let timer = null;

  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

// args 和 arguments 是什么关系？
// arguments 在普通函数中，是一个类数组对象，包含调用函数时传入的所有参数。
// ...args（剩余参数）  是 ES6 的语法糖，可以把所有传入的参数放入一个真正的数组。
// 在你的 debounce 中用 ...args 是现代写法，比 arguments 更推荐。

function test() {
  console.log(arguments); // 类数组，类似 [arg1, arg2, ...]
}

function test(...args) {
  console.log(args); // 真数组
}



// 使用实例
const handleSearch = debounce(function () {
  console.log('Searching...');
}, 300);

document.getElementById('search-input').addEventListener('input', handleSearch);



// 2. 节流（Throttling）
// 概念：
// 节流是指限制一个函数在一定时间内只能执行一次。即使事件触发频繁，也只会在固定时间间隔内执行一次回调。
// 节流适用于 滚动事件、resize 事件等，可以确保不会执行过于频繁的操作。

// 关键特点：

// 函数在一定时间内只会被触发一次。
// 与防抖不同，节流会按照设定的时间间隔执行回调，而不关心事件是否停止。
// 实现原理：
// 每次事件触发时，检查是否已过了设定的时间间隔。如果间隔时间已过，执行回调并记录时间；如果未过，则跳过此次事件。

// 典型应用：
// 页面滚动：每隔一定时间执行一次滚动事件处理，避免滚动时多次触发。
// 按钮点击：限制按钮点击频率，避免多次提交请求。


function throttle(fn, delay) {
  let lastTime = 0;

  return function (...args) {
    const now = Date.now();
    if (now - lastTime >= delay) {
      fn.apply(this, args);
      lastTime = now;
    }
  };
}

// 使用实例
const handleScroll = throttle(function () {
  console.log('Scrolling...');
}, 300);

window.addEventListener('scroll', handleScroll);


//
function throttle(func, limit) {
  let inThrottle;
  return function () {
    const context = this;
    const args = arguments;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(function () {
        return inThrottle = false;
      }, limit);
    }
  };
}

// 使用示例  
const myEfficientFn = throttle(function () {
  // 需要节流执行的函数  
}, 250);

window.addEventListener('scroll', myEfficientFn);



// 防抖 vs 节流
// 特性	      防抖（Debounce）	              节流（Throttle）
// 触发方式   事件停止触发后延迟执行回调          固定时间间隔内只能触发一次回调
// 应用场景   输入框搜索、按钮点击防止重复提交、   调整窗口大小等    滚动事件、窗口大小变化、按钮点击频率控制等
// 执行频率   只有最后一次事件停止后执行回调       在指定时间间隔内执行回调，无论事件触发多少次
// 效果       防止连续事件触发导致执行过多次回调   限制事件频繁触发，控制执行回调的频率
