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

// 深拷贝对象
export function deepClone(obj) {
  const _toString = Object.prototype.toString;

  // null, undefined, non-object, function
  if (!obj || typeof obj !== 'object') {
    return obj;
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
    if (obj.global) { flags.push('g'); }
    if (obj.multiline) { flags.push('m'); }
    if (obj.ignoreCase) { flags.push('i'); }

    return new RegExp(obj.source, flags.join(''));
  }

  const result = Array.isArray(obj) ? [] : obj.constructor ? new obj.constructor() : {};

  for (const key in obj) {
    result[key] = deepClone(obj[key]);
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
  hobbies: ['Reading', 'Traveling']
};

const copiedObj = cloneDeep(obj);
obj.age = 12;
obj.hobbies = ['Reading', 'Traveling', '123'];
console.log(obj);
console.log(copiedObj);