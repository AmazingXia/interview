// Proxy 原理示例
// Proxy 是 ES6 提供的用于创建对象代理的功能，可以拦截并自定义基本操作（如读取、写入、函数调用等）。

const target = {
  name: '张三',
  age: 25
};

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