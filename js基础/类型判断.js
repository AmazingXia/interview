const aa = (obj) => {
  typeof obj === 'object';
  typeof 'hello';    // "string"
  typeof 42;         // "number"
  typeof true;       // "boolean"
  typeof undefined;  // "undefined"
  typeof Symbol();   // "symbol"
  typeof function() {};  // "function"
  typeof null;       // "object" (这是一个历史遗留问题，`null` 被错误地判定为对象)

  // typeof 适用于基本类型（原始类型）和函数类型。
  // instanceof 适用于判断对象是否为某一构造函数的实例。

  [] instanceof Array // instanceof 用于检查对象是否是某个构造函数的实例，适用于对象类型（例如 Array、Date、RegExp 等）。

  new Date() instanceof Date;

  /aa/ instanceof RegExp;

  Array.isArray([])

  Object.prototype.toString.call('hello');   // "[object String]"
  Object.prototype.toString.call(42);        // "[object Number]"
  Object.prototype.toString.call(true);      // "[object Boolean]"
  Object.prototype.toString.call(undefined); // "[object Undefined]"
  Object.prototype.toString.call(Symbol());  // "[object Symbol]"
  Object.prototype.toString.call({});        // "[object Object]"
  Object.prototype.toString.call([]);        // "[object Array]"
  Object.prototype.toString.call(new Date()); // "[object Date]"
  Object.prototype.toString.call(null);      // "[object Null]"
  Object.prototype.toString.call(NaN);       // "[object Number]"
  Object.prototype.toString.call(/abc/);     // "[object RegExp]"


  Number.isNaN(NaN);    // true
  Number.isNaN(42);     // false
  Number.isNaN('hello'); // false

  const arr = [];
  arr.constructor === Array;    // true
  const obj = {};
  obj.constructor === Object;   // true


}