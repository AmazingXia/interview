// WeakMap 和 Map 的详解对比介绍

// | 特性       | `Map`                     | `WeakMap`                |
// | -------- | ------------------------- | ------------------------ |
// | 键类型      | 任意类型（对象、基本类型）             | 只能是**对象**（不能是字符串、数字等）    |
// | 键是否可枚举   | ✅ 可遍历（forEach / for...of） | ❌ 不能遍历                   |
// | 是否可被垃圾回收 | ❌ 键强引用，不可自动回收             | ✅ 键是弱引用，可被 GC 自动清理       |
// | 用途       | 普通键值对存储                   | 依附对象的私有数据（比如 Vue3 的依赖收集） |


const map = new Map()

const objKey = { id: 1 }
map.set(objKey, 'Object Value')
map.set('name', 'Alice')
map.set(42, 'Answer')

console.log(map.get(objKey))     // Object Value
console.log(map.get('name'))     // Alice
console.log(map.size)            // 3

// 遍历
for (const [key, value] of map) {
  console.log(key, value)
}


const weakMap = new WeakMap()

let obj = { id: 123 }
weakMap.set(obj, 'Private Value')

console.log(weakMap.get(obj))    // Private Value

obj = null  // 原对象被置空

// WeakMap 自动释放 obj 内存（无法验证，但不会造成内存泄漏）
// 为什么 WeakMap 不能遍历？
// 因为它是为临时存储私有对象数据而设计的。如果允许遍历，垃圾回收机制就无法在不确定是否仍被引用的情况下安全回收。

