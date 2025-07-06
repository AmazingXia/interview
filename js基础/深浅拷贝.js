function cloneDeep(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return obj
  }

  if (obj instanceof Date) {
    return new Date(obj)
  }
  if (obj instanceof RegExp) {
    return new RegExp(obj)
  }

  if (Array.isArray(obj)) {
    const copy = [];
    for (let i = 0; i < obj.length; i++) {
      copy[i] = cloneDeep(obj[i]);
    }

    return copy;
  }
  const copy = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      copy[key] = cloneDeep(obj[key]);
    }
  }
  return copy;
}


// 深拷贝对象，支持循环引用
export function deepClone(obj, map = new WeakMap()) {
  const _toString = Object.prototype.toString;

  // null, undefined, 非对象类型，函数等
  if (!obj || typeof obj !== 'object') {
    return obj;
  }

  // 避免循环引用
  if (map.has(obj)) {
    return map.get(obj);
  }

  // DOM Node
  if (obj.nodeType && 'cloneNode' in obj) {
    return obj.cloneNode(true);
  }

  // Date
  if (_toString.call(obj) === '[object Date]') {
    return new Date(obj.getTime());
  }

  // RegExp
  if (_toString.call(obj) === '[object RegExp]') {
    const flags = [];
    if (obj.global) flags.push('g');
    if (obj.multiline) flags.push('m');
    if (obj.ignoreCase) flags.push('i');
    if (obj.unicode) flags.push('u');
    if (obj.sticky) flags.push('y');
    return new RegExp(obj.source, flags.join(''));
  }

  // 初始化克隆结果对象
  const result = Array.isArray(obj) ? [] : obj.constructor? new obj.constructor() : {};
  // 缓存对象引用，处理循环引用
  map.set(obj, result);
  // 拷贝属性
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = deepClone(obj[key], map);
    }
  }

  return result;
}



const obj = {
  name: 'John',
  age: 30,
  details: {
    city: 'New York',
    country: 'USA'
  },
  hobbies: ['Reading', 'Traveling'],

  fn: function() {
    console.log('Hello, ' + this.name);
  },
};

const copiedObj = cloneDeep(obj);
obj.age = 12;
obj.hobbies = ['Reading', 'Traveling', '123'];
console.log(obj);
console.log(copiedObj);