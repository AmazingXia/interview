// 要手写一个 new 操作符，我们可以根据它的执行步骤来逐一实现：

// 创建一个新的空对象。
// 将这个新对象的 __proto__ 指向构造函数的 prototype，这样新对象就能够继承构造函数的原型方法和属性。
// 将构造函数内部的 this 指向新对象，并执行构造函数中的代码。
// 如果构造函数返回了一个对象，则返回该对象；如果没有返回对象，则返回新创建的对象。
// 根据这个步骤，我们可以手动实现 new 操作符。


function myNew(constructor, ...args) {
  // 1. 创建一个新的空对象
  const obj = {};

  // 2. 将新对象的 prototype 指向构造函数的 prototype
  obj.__proto__ = constructor.prototype;

  // 3. 将新对象作为 this 传入构造函数，并执行构造函数
  const result = constructor.apply(obj, args);

  // 4. 如果构造函数没有返回对象，则返回新对象
  return result instanceof Object ? result : obj;
}

// 解释：
// obj = {}：创建一个空对象。
// obj.__proto__ = constructor.prototype;：将对象的原型链指向构造函数的 prototype，使得新对象能继承构造函数原型上的方法和属性。
// constructor.apply(obj, args);：将构造函数的 this 指向新创建的对象，并传入构造函数的参数（args）。
// return result instanceof Object ? result : obj;：如果构造函数返回了一个对象（即返回值是一个对象或函数），则返回这个对象；否则返回创建的空对象 obj。


function Person(name, age) {
  this.name = name;
  this.age = age;
}

const person = myNew(Person, 'Alice', 30);

console.log(person.name);  // Alice
console.log(person.age);   // 30
console.log(person instanceof Person);  // true


// 关键点：

// myNew 可以模拟 JavaScript 中的 new 操作符，它创建了一个新的对象并将其与构造函数的原型相关联。
// 如果构造函数返回一个非原始值（比如对象或数组），myNew 会返回该对象。
// 如果没有显式返回对象，myNew 会默认返回新创建的对象。