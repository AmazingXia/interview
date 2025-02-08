/* @flow */

// 导入 Watcher 类型
import type Watcher from './watcher'

// 导入配置信息
import config from '../config'

// 导入生命周期相关方法
import { callHook, activateChildComponent } from '../instance/lifecycle'

// 导入工具函数
import {
  warn, // 警告日志
  nextTick, // 异步执行 nextTick
  devtools, // Vue 开发者工具
  inBrowser, // 是否运行在浏览器环境
  isIE // 是否为 IE 浏览器
} from '../util/index'

// 最大更新次数，防止死循环
export const MAX_UPDATE_COUNT = 100

// 观察者队列
const queue: Array<Watcher> = []

// 被 keep-alive 激活的组件队列
const activatedChildren: Array<Component> = []

// 记录已添加的 watcher，避免重复
let has: { [key: number]: ?true } = {}

// 记录循环更新次数，防止死循环
let circular: { [key: number]: number } = {}

// 是否等待执行
let waiting = false

// 是否正在刷新队列
let flushing = false

// 当前执行的 watcher 索引
let index = 0

/**
 * 重置调度器的状态
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0 // 清空队列
  has = {} // 清空 has 记录
  if (process.env.NODE_ENV !== 'production') {
    circular = {} // 仅在开发模式下清空循环检测
  }
  waiting = flushing = false // 重置标志位
}

// 当前 flush 的时间戳
export let currentFlushTimestamp = 0

// 记录时间戳的方法，默认使用 Date.now()
let getNow: () => number = Date.now

// 处理不同浏览器的事件时间戳
if (inBrowser && !isIE) {
  const performance = window.performance
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // 如果事件时间戳比 Date.now() 还小，说明事件使用的是高精度时间戳
    getNow = () => performance.now()
  }
}

/**
 * 刷新调度队列，执行所有 watcher
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow() // 记录当前时间戳
  flushing = true // 标记正在刷新
  let watcher, id

  // 按 id 排序，保证执行顺序
  queue.sort((a, b) => a.id - b.id)

  // 遍历队列执行 watcher
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index]
    if (watcher.before) {
      watcher.before() // 调用 before 钩子
    }
    id = watcher.id
    has[id] = null // 允许该 id 重新进入队列
    watcher.run() // 执行 watcher 逻辑

    // 在开发环境下，检查死循环
    if (process.env.NODE_ENV !== 'production' && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? `in watcher with expression "${watcher.expression}"`
              : `in a component render function.`
          ),
          watcher.vm
        )
        break
      }
    }
  }

  // 备份已激活的组件和已更新的 watcher 队列
  const activatedQueue = activatedChildren.slice()
  const updatedQueue = queue.slice()

  // 重置调度状态
  resetSchedulerState()

  // 触发生命周期钩子
  callActivatedHooks(activatedQueue)
  callUpdatedHooks(updatedQueue)

  // 开发者工具 hook
  if (devtools && config.devtools) {
    devtools.emit('flush')
  }
}

/**
 * 调用 updated 生命周期钩子
 */
function callUpdatedHooks (queue) {
  let i = queue.length
  while (i--) {
    const watcher = queue[i]
    const vm = watcher.vm
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated') // 调用 updated 钩子
    }
  }
}

/**
 * 记录被 keep-alive 激活的组件，等所有更新完成后再处理
 */
export function queueActivatedComponent (vm: Component) {
  vm._inactive = false // 标记为活跃状态
  activatedChildren.push(vm) // 加入队列
}

/**
 * 调用 keep-alive 组件的 activated 钩子
 */
function callActivatedHooks (queue) {
  for (let i = 0; i < queue.length; i++) {
    queue[i]._inactive = true
    activateChildComponent(queue[i], true)
  }
}

/**
 * 将 watcher 加入更新队列
 */
export function queueWatcher (watcher: Watcher) {
  const id = watcher.id
  if (has[id] == null) {
    has[id] = true // 记录该 watcher，防止重复
    if (!flushing) {
      queue.push(watcher) // 如果没有正在刷新，直接入队
    } else {
      // 如果正在刷新，找到合适的位置插入
      let i = queue.length - 1
      while (i > index && queue[i].id > watcher.id) {
        i--
      }
      queue.splice(i + 1, 0, watcher) // 插入到正确位置
    }

    // 触发队列执行
    if (!waiting) {
      waiting = true

      // 立即刷新队列（仅限同步模式）
      if (process.env.NODE_ENV !== 'production' && !config.async) {
        flushSchedulerQueue()
        return
      }
      // 使用 nextTick 异步执行
      nextTick(flushSchedulerQueue)
    }
  }
}
