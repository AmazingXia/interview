/* @flow */
import type Watcher from './watcher' // 导入 Watcher 类型
import { remove } from '../util/index' // 导入工具函数 remove
import config from '../config' // 导入配置

let uid = 0 // 唯一标识符，用于生成 id

/**
 * Dep 是一个可观察对象，多个指令可以订阅它。
 *
 */
export default class Dep {
  static target: ?Watcher; // 当前的目标 watcher，可能为空
  id: number; // 当前 dep 的唯一标识符
  subs: Array<Watcher>; // 订阅该 dep 的 watchers 数组

  constructor () {
    this.id = uid++ // 生成唯一 id
    this.subs = [] // 初始化 subs 数组
  }

  addSub (sub: Watcher) { // 向订阅者列表中添加一个 watcher
    this.subs.push(sub)
  }

  removeSub (sub: Watcher) { // 从订阅者列表中移除一个 watcher
    remove(this.subs, sub)
  }

  depend () { // 如果有目标 watcher，添加该 dep 到目标 watcher 中
    if (Dep.target) {
      Dep.target.addDep(this) // 将当前 dep 添加到目标 watcher 的依赖中
    }
  }

  notify () { // 通知所有订阅者更新
    const subs = this.subs.slice() // 复制订阅者列表，避免在循环中修改列表
    if (process.env.NODE_ENV !== 'production' && !config.async) { // 如果不是生产环境，并且配置中未启用异步
      // 如果未开启异步，手动排序订阅者，确保它们按正确的顺序触发
      subs.sort((a, b) => a.id - b.id)
    }
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update() // 更新每个订阅者
    }
  }
}

// 当前正在评估的目标 watcher。
// 这个全局唯一，因为一次只能评估一个 watcher。
Dep.target = null
const targetStack = [] // 目标 watcher 栈，用于支持嵌套的依赖

export function pushTarget (target: ?Watcher) { // 将目标 watcher 推入栈中
  targetStack.push(target)
  Dep.target = target // 更新当前目标 watcher
}

export function popTarget () { // 将目标 watcher 从栈中弹出
  targetStack.pop()
  Dep.target = targetStack[targetStack.length - 1] // 设置下一个目标 watcher
}
