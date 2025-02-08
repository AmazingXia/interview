/* @flow */

import {
  warn, // 导入警告函数
  remove, // 导入删除函数
  isObject, // 导入对象判断函数
  parsePath, // 导入路径解析函数
  _Set as Set, // 导入 Set 工具函数
  handleError, // 导入错误处理函数
  noop // 导入空函数
} from '../util/index' // 导入工具函数

import { traverse } from './traverse' // 导入遍历函数
import { queueWatcher } from './scheduler' // 导入调度队列函数
import Dep, { pushTarget, popTarget } from './dep' // 导入依赖类及相关函数

import type { SimpleSet } from '../util/index' // 引入 SimpleSet 类型

let uid = 0 // 唯一标识符，用于批量处理

/**
 * Watcher 用于解析表达式，收集依赖，并在表达式值发生变化时触发回调。
 * 这既用于 $watch() API，也用于指令。
 */
export default class Watcher {
  vm: Component; // 组件实例
  expression: string; // 表达式字符串
  cb: Function; // 回调函数
  id: number; // 唯一标识符
  deep: boolean; // 是否深度监听
  user: boolean; // 是否用户自定义
  lazy: boolean; // 是否懒加载
  sync: boolean; // 是否同步执行
  dirty: boolean; // 是否脏数据标记
  active: boolean; // 是否激活
  deps: Array<Dep>; // 依赖的 dep 数组
  newDeps: Array<Dep>; // 新的依赖 dep 数组
  depIds: SimpleSet; // 依赖的 id 集合
  newDepIds: SimpleSet; // 新的依赖 id 集合
  before: ?Function; // 回调函数执行前的钩子
  getter: Function; // 用于获取值的函数
  value: any; // 存储当前值

  constructor(
    vm: Component, // 组件实例
    expOrFn: string | Function, // 表达式或函数
    cb: Function, // 回调函数
    options?: ?Object, // 可选配置
    isRenderWatcher?: boolean // 是否是渲染 watcher
  ) {
    this.vm = vm
    if (isRenderWatcher) {
      vm._watcher = this // 如果是渲染 watcher，赋值给组件的 _watcher 属性
    }
    vm._watchers.push(this) // 将当前 watcher 添加到组件的 watchers 数组中
    // 设置选项
    if (options) {
      this.deep = !!options.deep
      this.user = !!options.user
      this.lazy = !!options.lazy
      this.sync = !!options.sync
      this.before = options.before
    } else {
      this.deep = this.user = this.lazy = this.sync = false // 默认值
    }
    this.cb = cb
    this.id = ++uid // 为当前 watcher 分配唯一 id
    this.active = true // 设置为激活状态
    this.dirty = this.lazy // 懒加载 watcher 初始化为脏数据
    this.deps = [] // 初始化依赖数组
    this.newDeps = [] // 初始化新依赖数组
    this.depIds = new Set() // 初始化依赖 id 集合
    this.newDepIds = new Set() // 初始化新依赖 id 集合
    this.expression = process.env.NODE_ENV !== 'production'
      ? expOrFn.toString() // 非生产环境下，将表达式转换为字符串
      : ''
    // 解析表达式以获取 getter
    if (typeof expOrFn === 'function') {
      this.getter = expOrFn
    } else {
      this.getter = parsePath(expOrFn) // 解析路径表达式
      if (!this.getter) {
        this.getter = noop // 如果无法解析路径，使用 noop 函数
        process.env.NODE_ENV !== 'production' && warn(
          `Failed watching path: "${expOrFn}" ` +
          'Watcher only accepts simple dot-delimited paths. ' +
          'For full control, use a function instead.',
          vm
        )
      }
    }
    this.value = this.lazy
      ? undefined
      : this.get() // 如果是懒加载，值为 undefined；否则获取初始值
  }

  /**
   * 评估 getter，并重新收集依赖。
   */
  get() {
    pushTarget(this) // 将当前 watcher 设置为目标
    let value
    const vm = this.vm
    try {
      value = this.getter.call(vm, vm) // 执行 getter 获取值
    } catch (e) {
      if (this.user) {
        handleError(e, vm, `getter for watcher "${this.expression}"`) // 错误处理
      } else {
        throw e
      }
    } finally {
      // "touch" 每个属性，以便它们作为深度监听的依赖被追踪
      if (this.deep) {
        traverse(value)
      }
      popTarget() // 恢复目标 watcher
      this.cleanupDeps() // 清理依赖
    }
    return value // 返回值
  }

  /**
   * 向当前指令添加依赖。
   */
  addDep(dep: Dep) {
    const id = dep.id
    if (!this.newDepIds.has(id)) { // 如果新依赖 id 集合中没有该 id
      this.newDepIds.add(id) // 添加到新依赖集合
      this.newDeps.push(dep) // 添加到新依赖数组
      if (!this.depIds.has(id)) { // 如果当前依赖 id 集合中没有该 id
        dep.addSub(this) // 将当前 watcher 添加为 dep 的订阅者
      }
    }
  }

  /**
   * 清理依赖收集。
   */
  cleanupDeps() {
    let i = this.deps.length
    while (i--) {
      const dep = this.deps[i]
      if (!this.newDepIds.has(dep.id)) { // 如果新的依赖集合中没有该 dep 的 id
        dep.removeSub(this) // 移除当前 watcher
      }
    }
    let tmp = this.depIds
    this.depIds = this.newDepIds
    this.newDepIds = tmp // 交换 depIds 和 newDepIds
    this.newDepIds.clear() // 清空 newDepIds
    tmp = this.deps
    this.deps = this.newDeps
    this.newDeps = tmp // 交换 deps 和 newDeps
    this.newDeps.length = 0 // 清空 newDeps 数组
  }

  /**
   * 订阅者接口。
   * 当依赖发生变化时会调用此方法。
   */
  update() {
    /* istanbul ignore else */
    if (this.lazy) {
      this.dirty = true // 如果是懒加载，标记为脏数据
    } else if (this.sync) {
      this.run() // 如果是同步，立即执行
    } else {
      queueWatcher(this) // 否则将当前 watcher 加入调度队列
    }
  }

  /**
   * 调度器任务接口。
   * 由调度器调用此方法。
   */
  run() {
    if (this.active) {
      const value = this.get() // 获取最新的值
      if (
        value !== this.value || // 如果新值与旧值不同
        isObject(value) || // 如果新值是对象（深度监听需要）
        this.deep // 或者是深度监听
      ) {
        // 设置新值
        const oldValue = this.value
        this.value = value
        if (this.user) { // 如果是用户自定义的 watcher
          try {
            this.cb.call(this.vm, value, oldValue) // 调用回调函数
          } catch (e) {
            handleError(e, this.vm, `callback for watcher "${this.expression}"`)
          }
        } else {
          this.cb.call(this.vm, value, oldValue) // 调用回调函数
        }
      }
    }
  }

  /**
   * 评估 watcher 的值。
   * 仅对懒加载的 watcher 调用此方法。
   */
  evaluate() {
    this.value = this.get() // 获取值
    this.dirty = false // 标记为干净数据
  }

  /**
   * 对所有收集到的依赖执行 depend 操作。
   */
  depend() {
    let i = this.deps.length
    while (i--) {
      this.deps[i].depend() // 对每个依赖调用 depend 方法
    }
  }

  /**
   * 从所有依赖的订阅者列表中移除自身。
   */
  teardown() {
    if (this.active) {
      // 从 vm 的 watchers 列表中移除自身
      if (!this.vm._isBeingDestroyed) {
        remove(this.vm._watchers, this)
      }
      let i = this.deps.length
      while (i--) {
        this.deps[i].removeSub(this) // 从每个 dep 中移除自身
      }
      this.active = false // 设置为不活跃
    }
  }
}
