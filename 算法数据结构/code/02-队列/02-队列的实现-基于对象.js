class Queue {
  constructor () {
    this.queue = {}
    this.count = 0 // this.count++ 只会增加  不会减少  否则导致重复
    // 用于记录队首的键
    this.head = 0
  }
  // 入队方法
  enQueue (item) {
    this.queue[this.count++] = item // 后缀自增 先使用当前值 this.count: 0, 再执行自增：
    // 相当于 this.queue[this.count] = item; this.count = this.count + 1;

    // 所以第一项 就是 this.queue[0]  head = 0是可以取到值的
  }
  // 出队方法
  deQueue () {
    if (this.isEmpty()) {
      return
    }

    // 出队做了三件事件  取出队首的值  返回出去  同时  删除队首的值
    const headData = this.queue[this.head]
    delete this.queue[this.head]
    this.head++
    return headData
  }
  length () {
    return this.count - this.head
  }
  isEmpty () {
    return this.length() === 0
  }
  clear () {
    this.queue = {}
    this.count = 0
    this.head = 0
  }
}

const q = new Queue()