// 一个 Map，用于存储每个响应式对象的依赖关系
const targetMap = new WeakMap()

// 收集依赖（模拟 effect 函数栈）
let activeEffect: Function | null = null

// 注册一个副作用函数（用于收集依赖）
function effect(fn: Function) {
  activeEffect = fn            // 当前正在运行的副作用函数
  fn()                         // 执行副作用函数，会触发 getter，从而触发依赖收集
  activeEffect = null          // 清除 activeEffect
}

// 用于依赖收集
function track(target: object, key: string | symbol) {
  if (!activeEffect) return    // 如果没有副作用函数，不收集
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    depsMap = new Map()
    targetMap.set(target, depsMap) // 为当前对象设置依赖 Map
  }
  let deps = depsMap.get(key)
  if (!deps) {
    deps = new Set()
    depsMap.set(key, deps)     // 设置当前属性的依赖集合
  }
  deps.add(activeEffect)       // 收集当前副作用函数
}

// 触发依赖更新
function trigger(target: object, key: string | symbol) {
  const depsMap = targetMap.get(target)
  if (!depsMap) return
  const deps = depsMap.get(key)
  if (deps) {
    deps.forEach(fn => fn())   // 逐个执行依赖函数
  }
}

// 实现 reactive 的核心函数
function reactive<T extends object>(target: T): T {
  return new Proxy(target, {
    get(target, key, receiver) {
      const result = Reflect.get(target, key, receiver) // 获取属性
      track(target, key)                                // 依赖收集
      return result
    },
    set(target, key, value, receiver) {
      const oldValue = (target as any)[key]
      const result = Reflect.set(target, key, value, receiver) // 设置属性
      if (oldValue !== value) {      // 只有值变了才触发更新
        trigger(target, key)         // 通知依赖更新
      }
      return result
    }
  })
}


const obj = {}
Reflect.deleteProperty(obj, 'aaa')
// 即使没有'aaa', 也返回true

const hasOwnProperty = Object.property.hasOwnProperty
const hasOwn = (target, key) => hasOwnProperty.call(target, key)