// Proxy 原理示例
// Proxy 是 ES6 提供的用于创建对象代理的功能，可以拦截并自定义基本操作（如读取、写入、函数调用等）。

const target = {
  name: '张三',
  age: 25
};

// set deleteProperty 需要返回布尔值
// 在严格模式下，如果返回 false 的话会出现 Type Error 的异常
const handler = {
  // 拦截读取属性操作
  get: function (target, prop, receiver) {
    console.log(`读取属性：${prop}`);
    return prop in target ? target[prop] : '属性不存在';
  },
  // 拦截设置属性操作
  set: function (target, prop, value, receiver) {
    console.log(`设置属性：${prop} = ${value}`);
    target[prop] = value;
    return true; // 返回 true 表示设置成功
  },
  // 拦截删除属性操作
  deleteProperty: function (target, prop) {
    console.log(`删除属性：${prop}`);
    if (prop in target) {
      delete target[prop];
      return true;
    }
    return false;
  }
};

// 创建代理对象
const proxy = new Proxy(target, handler);

// 测试代理对象
console.log(proxy.name); // 读取属性：name -> 张三
proxy.age = 30;          // 设置属性：age = 30
console.log(proxy.age);  // 读取属性：age -> 30
delete proxy.name;       // 删除属性：name
console.log(proxy.name); // 读取属性：name -> 属性不存在

new Proxy(obj , {
  get: function(target, key, receiver) {
    console.log(`读取属性：${key}`);
    return Reflect.get(target, key, receiver);
  }
})

// 问题2:Proxy 和 Reflect 中使用的 receiver
// Proxy 中的 receiver: Proxy 或者继承 Proxy 的对象
// Reflect 中 receiver：如果 target 对象中设置了 getter,getter 中的 this 指向 receiver
const obj = {
  bar: 'original-bar',
  get foo() {
    console.log('this in getter:', this)
    return this.bar
  }
}

const proxy = new Proxy(obj, {
  get(target, key, receiver) {
    if (key === 'bar') {
      return 'value - bar'
    }
    // 一定要传 receiver，确保 this 正确指向 proxy
    // return Reflect.get(target, key) // 不设置 receiver，this 指向 target, 也就是obj 打印的this.bar是undefined
    return Reflect.get(target, key, receiver) // 设置 receiver，foo中 this 指向 proxy, 访问this.bar  也就是访问的proxy中的get函数
  }
})

console.log(proxy.foo) // 输出: 'value - bar'



// 常用 Reflect 方法
| 方法                                                        | 作用                                  |
| --------------------------------------------------------- | ----------------------------------- |
| `Reflect.get(target, propertyKey[, receiver])`            | 获取对象属性                              |
| `Reflect.set(target, propertyKey, value[, receiver])`     | 设置对象属性                              |
| `Reflect.has(target, propertyKey)`                        | 相当于 `propertyKey in target`         |
| `Reflect.deleteProperty(target, propertyKey)`             | 删除对象属性                              |
| `Reflect.defineProperty(target, propertyKey, attributes)` | 定义属性（等价于 `Object.defineProperty`）   |
| `Reflect.getOwnPropertyDescriptor(target, propertyKey)`   | 获取属性描述符                             |
| `Reflect.ownKeys(target)`                                 | 返回所有自有属性键（包括 Symbol）                |
| `Reflect.isExtensible(target)`                            | 判断对象是否可扩展                           |
| `Reflect.preventExtensions(target)`                       | 阻止对象扩展                              |
| `Reflect.getPrototypeOf(target)`                          | 获取原型                                |
| `Reflect.setPrototypeOf(target, prototype)`               | 设置原型                                |
| `Reflect.apply(targetFn, thisArg, argsArray)`             | 调用函数（代替 `Function.prototype.apply`） |
| `Reflect.construct(targetFn, argsArray[, newTarget])`     | 构造函数调用（代替 `new` 操作）                 |

// 常用 Proxy 拦截方法（traps）
| 拦截器（trap）                  | 说明                                     |
| -------------------------- | -------------------------------------- |
| `get`                      | 拦截读取属性                                 |
| `set`                      | 拦截设置属性                                 |
| `has`                      | 拦截 `in` 操作符                            |
| `deleteProperty`           | 拦截 `delete` 操作                         |
| `ownKeys`                  | 拦截 `Object.keys()`、`for...in` 等        |
| `getOwnPropertyDescriptor` | 拦截 `Object.getOwnPropertyDescriptor()` |
| `defineProperty`           | 拦截 `Object.defineProperty()`           |
| `preventExtensions`        | 拦截 `Object.preventExtensions()`        |
| `getPrototypeOf`           | 拦截原型获取                                 |
| `setPrototypeOf`           | 拦截原型设置                                 |
| `isExtensible`             | 拦截是否可扩展检查                              |
| `apply`                    | 拦截函数调用                                 |
| `construct`                | 拦截构造函数调用（new）                          |
