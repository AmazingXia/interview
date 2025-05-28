// 手写实现 bind, call, apply 的功能，并附上详细注释

// 手写实现 call 方法
Function.prototype.myCall = function (context, ...args) {
  // 如果 context 为 null 或 undefined，则默认绑定到全局对象（浏览器中为 window，Node.js 中为 global）
  context = context || globalThis;

  // 将当前函数（this）赋值到 context 的一个属性上，避免污染原始对象
  const fnSymbol = Symbol(); // 使用 Symbol 防止属性冲突
  context[fnSymbol] = this;

  // 使用 context 调用函数并传递参数
  const result = context[fnSymbol](...args);

  // 删除临时属性，清理环境
  delete context[fnSymbol];

  // 返回函数执行结果
  return result;
};

// 手写实现 apply 方法
Function.prototype.myApply = function (context, args) {
  // 如果 context 为 null 或 undefined，则默认绑定到全局对象
  context = context || globalThis;

  // 将当前函数（this）赋值到 context 的一个属性上
  const fnSymbol = Symbol();
  context[fnSymbol] = this;

  // 使用 context 调用函数并传递参数数组
  const result = context[fnSymbol](...(args || [])); // 如果 args 为 null 或 undefined，则传递空数组

  // 删除临时属性，清理环境
  delete context[fnSymbol];

  // 返回函数执行结果
  return result;
};

// 手写实现 bind 方法
Function.prototype.myBind = function (context, ...bindArgs) {
  // 保存当前函数（this）
  const self = this;

  // 返回一个新函数
  return function (...callArgs) {
    // 合并 bind 时的参数和调用时的参数
    const args = [...bindArgs, ...callArgs];

    // 使用 call 实现绑定功能
    return self.myCall(context, ...args);
  };
};

// 测试代码
function testFunction(a, b, c) {
  console.log(this.name, a, b, c);
}

const obj = { name: '测试对象' };

// 测试 myCall
testFunction.myCall(obj, 1, 2, 3); // 输出: 测试对象 1 2 3

// 测试 myApply
testFunction.myApply(obj, [4, 5, 6]); // 输出: 测试对象 4 5 6

// 测试 myBind
const boundFunction = testFunction.myBind(obj, 7, 8);
boundFunction(9); // 输出: 测试对象 7 8 9