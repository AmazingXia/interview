/* @flow */

import Dep from './dep' // 引入依赖管理器 Dep
import VNode from '../vdom/vnode' // 引入虚拟节点 VNode
import { arrayMethods } from './array' // 引入数组方法的增强对象
import {
  def, // 定义对象属性的工具函数
  warn, // 警告日志函数
  hasOwn, // 判断对象是否有某个自身属性
  hasProto, // 判断是否支持 __proto__
  isObject, // 判断是否为对象
  isPlainObject, // 判断是否为纯对象
  isPrimitive, // 判断是否为基本数据类型
  isUndef, // 判断是否为 undefined 或 null
  isValidArrayIndex, // 判断是否为有效的数组索引
  isServerRendering // 判断是否是服务端渲染
} from '../util/index' // 引入工具函数

const arrayKeys = Object.getOwnPropertyNames(arrayMethods) // 获取 arrayMethods 的所有属性名

/**
 * 在某些情况下，我们可能希望在组件更新计算时禁用观察
 */
export let shouldObserve: boolean = true // 是否开启响应式观察

export function toggleObserving(value: boolean) {
  shouldObserve = value // 切换响应式观察状态
}

/**
 * Observer 类用于给数据对象添加响应式功能
 * 一旦被附加，Observer 会将对象的属性转换为
 * 具有依赖收集和通知更新功能的 getter/setter
 */
export class Observer {
  value: any; // 存储观察的值
  dep: Dep; // 依赖管理器
  vmCount: number; // 该对象作为 Vue 根数据的实例数

  constructor(value: any) {
    this.value = value
    this.dep = new Dep() // 创建依赖管理实例
    this.vmCount = 0 // 记录该数据对象被多少个 Vue 实例使用
    def(value, '__ob__', this) // 在对象上定义不可枚举的 __ob__ 属性，指向当前 Observer 实例
    if (Array.isArray(value)) { // 如果是数组
      if (hasProto) {
        protoAugment(value, arrayMethods) // 通过修改原型增强数组方法
      } else {
        copyAugment(value, arrayMethods, arrayKeys) // 直接在对象上定义新的数组方法
      }
      this.observeArray(value) // 遍历数组，观察数组元素
    } else {
      this.walk(value) // 遍历对象，转换属性为响应式
    }
  }

  /**
   * Walk through all properties and convert them into
   * getter/setters. This method should only be called when
   * value type is Object.
   */

  /**
   * 遍历对象的所有属性，并将其转换为响应式
   * 仅在对象类型的数据上调用
   */
  walk(obj: Object) {
    const keys = Object.keys(obj) // 获取对象的所有键
    for (let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i]) // 逐个转换属性为响应式
    }
  }

  /**
   * 观察数组中的每一项
   */
  observeArray(items: Array<any>) {
    for (let i = 0, l = items.length; i < l; i++) {
      observe(items[i]) // 递归观察数组元素
    }
  }
}

// 辅助方法

/**
 * 通过修改 __proto__ 方式增强目标对象或数组
 */
function protoAugment(target, src: Object) {
  /* eslint-disable no-proto */
  target.__proto__ = src // 直接修改原型
  /* eslint-enable no-proto */
}

/**
 * 通过定义不可枚举属性的方式增强目标对象或数组
 */
/* istanbul ignore next */
function copyAugment(target: Object, src: Object, keys: Array<string>) {
  for (let i = 0, l = keys.length; i < l; i++) {
    const key = keys[i]
    def(target, key, src[key]) // 在 target 上定义 src[key] 方法
  }
}

/**
 * 尝试为一个值创建观察者实例
 * 如果该值已经有观察者，则返回已有的观察者
 */
export function observe(value: any, asRootData: ?boolean): Observer | void {
  if (!isObject(value) || value instanceof VNode) {
    return // 仅对对象进行观察，VNode 类型除外
  }
  let ob: Observer | void
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__ // 如果已有 Observer 实例，直接返回
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) && // 确保对象是可扩展的
    !value._isVue // 避免 Vue 实例被观察
  ) {
    ob = new Observer(value) // 创建新的 Observer 实例
  }
  if (asRootData && ob) {
    ob.vmCount++ // 如果是根数据对象，增加引用计数
  }
  return ob
}

/**
 * 在对象上定义响应式属性
 */
export function defineReactive(
  obj: Object,
  key: string,
  val: any,
  customSetter?: ?Function,
  shallow?: boolean
) {
  const dep = new Dep() // 创建依赖管理实例

  const property = Object.getOwnPropertyDescriptor(obj, key)
  if (property && property.configurable === false) {
    return // 不可配置的属性无法被响应式化
  }

  // 记录属性的原始 getter/setter
  const getter = property && property.get
  const setter = property && property.set
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key] // 获取原值
  }

  let childOb = !shallow && observe(val) // 递归观察子对象
  Object.defineProperty(obj, key, {
    enumerable: true, // 可枚举
    configurable: true, // 可配置
    get: function reactiveGetter() {
      const value = getter ? getter.call(obj) : val
      if (Dep.target) {
        dep.depend() // 依赖收集
        if (childOb) {
          childOb.dep.depend()
          if (Array.isArray(value)) {
            dependArray(value) // 递归收集数组依赖
          }
        }
      }
      return value
    },
    set: function reactiveSetter(newVal) {
      const value = getter ? getter.call(obj) : val
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return // 值未改变，直接返回
      }
      if (process.env.NODE_ENV !== 'production' && customSetter) {
        customSetter() // 调用自定义 setter
      }
      if (getter && !setter) return // 只读属性，不执行 setter
      if (setter) {
        setter.call(obj, newVal)
      } else {
        val = newVal
      }
      childOb = !shallow && observe(newVal) // 观察新值
      dep.notify() // 通知依赖更新
    }
  })
}

/**
 * 在对象或数组上设置新属性，并触发响应式更新
 */
export function set(target: Array<any> | Object, key: any, val: any): any {
  if (process.env.NODE_ENV !== 'production' &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(`不能在 undefined、null 或原始值上设置响应式属性: ${(target: any)}`)
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key)
    target.splice(key, 1, val) // 通过 splice 触发响应式
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val
    return val
  }
  const ob = (target: any).__ob__
  if (target._isVue || (ob && ob.vmCount)) {
    warn('避免在 Vue 实例或其根数据上动态添加响应式属性')
    return val
  }
  if (!ob) {
    target[key] = val
    return val
  }
  defineReactive(ob.value, key, val) // 使新属性响应式
  ob.dep.notify() // 触发更新
  return val
}
/**
 * 删除对象或数组中的属性，并在必要时触发变更通知
 */
export function del (target: Array<any> | Object, key: any) {
  // 生产环境下如果 target 为空或是基本数据类型，则警告
  if (process.env.NODE_ENV !== 'production' &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(`无法删除 undefined、null 或原始值上的响应式属性: ${(target: any)}`)
  }

  // 如果是数组，且 key 是有效的索引，则使用 splice 删除该元素
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1)
    return
  }

  // 获取 target 的 Observer 实例
  const ob = (target: any).__ob__

  // 如果 target 是 Vue 实例或其根数据对象，则警告并返回
  if (target._isVue || (ob && ob.vmCount)) {
    process.env.NODE_ENV !== 'production' && warn(
      '避免在 Vue 实例或其根数据对象上删除属性 - ' +
      '应该将其值设为 null。'
    )
    return
  }

  // 如果 key 不在 target 自身属性中，则直接返回
  if (!hasOwn(target, key)) {
    return
  }

  // 使用 delete 操作符删除该属性
  delete target[key]

  // 如果 target 没有 Observer 实例，则直接返回
  if (!ob) {
    return
  }

  // 触发依赖更新，通知相关的 Watcher 进行视图更新
  ob.dep.notify()
}

/**
 * 当数组被访问时，收集数组元素的依赖
 * 因为无法像对象属性的 getter 那样拦截数组元素的访问，所以需要手动处理
 */
function dependArray (value: Array<any>) {
  for (let e, i = 0, l = value.length; i < l; i++) {
    e = value[i]
    // 如果元素是响应式对象（存在 __ob__ 属性），则收集依赖
    e && e.__ob__ && e.__ob__.dep.depend()
    // 如果元素仍然是数组，递归调用自身，继续收集内部数组元素的依赖
    if (Array.isArray(e)) {
      dependArray(e)
    }
  }
}
