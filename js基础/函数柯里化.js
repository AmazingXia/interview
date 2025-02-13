// 通用柯里化函数
function curry(fn) {
  // 获取函数的参数个数
  const length = fn.length;

  // 返回一个函数，接受部分参数
  return function _curry(...args) {
    console.log('args===>', args);
    if (args.length >= length) {
      // 如果已经获取了足够的参数，直接调用原函数
      return fn(...args);
    } else {
      function newfun(...rest) {
        console.log('rest===>', rest);
        return _curry(...args, ...rest);
      };

      console.log('newfun===>', newfun.toString());
      return newfun;
    }
  };
}

function add(a, b, c, d) {
  return a + b + c + d
}

const _curry = curry(add)

console.log('123===>', 123);
const res = _curry(1)(2)
// (2)(3)(4)

console.log('res.toString===>', res.toString());


function curry2(fn) {
  if (typeof fn !== 'function') {
    throw new Error('curry() requires a function');
  }

  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function (...args2) {
        return curried.apply(this, args.concat(args2));
      }
    }
  };
}