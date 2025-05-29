class Queue {
  constructor () {
    this.queue = {}
    this.count = 0
    // 用于记录队首的键
    this.head = 0
  }
  // 入队方法
  enQueue (item) {
    this.queue[this.count++] = item
  }
  // 出队方法
  deQueue () {
    if (this.isEmpty()) {
      return
    }
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