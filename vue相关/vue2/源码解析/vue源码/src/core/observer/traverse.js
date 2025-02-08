/* @flow */

import { _Set as Set, isObject } from '../util/index' // 导入 Set（别名 _Set）和 isObject 工具函数
import type { SimpleSet } from '../util/index' // 导入 SimpleSet 类型
import VNode from '../vdom/vnode' // 导入 VNode 组件

const seenObjects = new Set()

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */

/**
 * 递归遍历一个对象，触发所有已转换的 getter，
 * 以便收集对象内部的所有嵌套属性作为 "深层" 依赖。
 */
export function traverse (val: any) {
  _traverse(val, seenObjects) // 调用 _traverse 递归遍历对象
  seenObjects.clear() // 清空 seenObjects，避免影响下次遍历
}

function _traverse (val: any, seen: SimpleSet) {
  let i, keys
  const isA = Array.isArray(val) // 判断 val 是否为数组
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    // 如果 val 既不是数组也不是对象，或者是被冻结的对象，或者是 VNode 实例，则直接返回
    return
  }
  if (val.__ob__) { // 如果 val 存在 __ob__（Observer 实例）
    const depId = val.__ob__.dep.id // 获取该对象的依赖 ID
    if (seen.has(depId)) { // 如果该对象已经遍历过，则直接返回
      return
    }
    seen.add(depId) // 记录该对象已遍历
  }
  if (isA) { // 如果是数组
    i = val.length
    while (i--) _traverse(val[i], seen) // 递归遍历数组每一项
  } else { // 如果是对象
    keys = Object.keys(val) // 获取对象的所有键名
    i = keys.length
    while (i--) _traverse(val[keys[i]], seen) // 递归遍历对象的每个属性值
  }
}
