/*
 * 不对这个文件进行类型检查，因为 Flow 与动态访问 Array 原型上的方法不兼容
 */

import { def } from '../util/index' // 导入 def 函数

const arrayProto = Array.prototype // 获取 Array 的原型对象
export const arrayMethods = Object.create(arrayProto) // 创建一个新的对象，继承自 Array 原型

// 需要打补丁的方法列表
const methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]

/**
 * 拦截变更方法，并触发事件
 */
methodsToPatch.forEach(function (method) { // 遍历需要打补丁的方法
  // 缓存原始方法
  const original = arrayProto[method]
  def(arrayMethods, method, function mutator (...args) { // 使用 def 函数定义一个新的 mutator 方法
    const result = original.apply(this, args) // 调用原始方法
    const ob = this.__ob__ // 获取当前对象的 observer 实例
    let inserted // 用于存储新插入的数组元素
    switch (method) { // 根据不同的数组方法进行不同的处理
      case 'push': // 对 push 方法进行处理
      case 'unshift': // 对 unshift 方法进行处理
        inserted = args // 将新增的元素保存到 inserted
        break
      case 'splice': // 对 splice 方法进行处理
        inserted = args.slice(2) // splice 方法的新增元素位于参数的第三个及之后的位置
        break
    }
    if (inserted) ob.observeArray(inserted) // 如果有新插入的元素，则对它们进行观察
    // 通知变化
    ob.dep.notify() // 通知依赖更新
    return result // 返回原始方法的执行结果
  })
})
