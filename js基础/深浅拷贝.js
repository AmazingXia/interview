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