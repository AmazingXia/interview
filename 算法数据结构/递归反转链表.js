// 链表 从头尾删除、增加 性能比较好
// 分为很多类 常用单向链表、双向链表

// js模拟链表结构：增删改查

// node节点
class Node {
  constructor(element,next) {
    this.element = element
    this.next = next
  }
}

class LinkedList {
 constructor() {
   this.head = null // 默认应该指向第一个节点
   this.size = 0 // 通过这个长度可以遍历这个链表
 }
 // 增加O(n)
 add(index,element) {
   if(arguments.length === 1) {
     // 向末尾添加
     element = index // 当前元素等于传递的第一项
     index = this.size // 索引指向最后一个元素
   }
  if(index < 0 || index > this.size) {
    throw new Error('添加的索引不正常')
  }
  if(index === 0) {
    // 直接找到头部 把头部改掉 性能更好
    let head = this.head
    this.head = new Node(element,head)
  } else {
    // 获取当前头指针
    let current = this.head
    // 不停遍历 直到找到最后一项 添加的索引是1就找到第0个的next赋值
    for (let i = 0; i < index-1; i++) { // 找到它的前一个
      current = current.next
    }
    // 让创建的元素指向上一个元素的下一个
    // 看图理解next层级
    current.next = new Node(element,current.next) // 让当前元素指向下一个元素的next
  }

  this.size++;
 }
 // 删除O(n)
 remove(index) {
  if(index < 0 || index >= this.size) {
    throw new Error('删除的索引不正常')
  }
  this.size--
  if(index === 0) {
    let head = this.head
    this.head = this.head.next // 移动指针位置

    return head // 返回删除的元素
  }else {
    let current = this.head
    for (let i = 0; i < index-1; i++) { // index-1找到它的前一个
      current = current.next
    }
    let returnVal = current.next // 返回删除的元素
    // 找到待删除的指针的上一个 current.next.next
    // 如删除200， 100=>200=>300 找到200的上一个100的next的next为300，把300赋值给100的next即可
    current.next = current.next.next

    return returnVal
  }
 }
 // 查找O(n)
 get(index) {
  if(index < 0 || index >= this.size) {
    throw new Error('查找的索引不正常')
  }
  let current = this.head
  for (let i = 0; i < index; i++) {
    current = current.next
  }
  return current
 }
}


var ll = new LinkedList()

ll.add(0,100) // Node { ellement: 100, next: null }
ll.add(0,200) // Node { element: 200, next: Node { element: 100, next: null } }
ll.add(1,500) // Node {element: 200,next: Node { element: 100, next: Node { element: 500, next: null } } }
ll.add(300)
ll.remove(0)

console.log(ll.get(2),'get')
console.log(ll.head)



// 用链表默认使用数组来模拟队列，性能更佳
class Queue {
  constructor() {
    this.ll = new LinkedList()
  }
  // 向队列中添加
  offer(elem) {
    this.ll.add(elem)
  }
  // 查看第一个
  peek() {
    return this.ll.get(0)
  }
  // 队列只能从头部删除
  remove() {
    return this.ll.remove(0)
  }
}

var queue = new Queue()

queue.offer(1)
queue.offer(2)
queue.offer(3)
var removeVal = queue.remove(3)

console.log(queue.ll,'queue.ll')
console.log(removeVal,'queue.remove')
console.log(queue.peek(),'queue.peek')



// 3 递归反转链表

// node节点
class Node {
  constructor(element,next) {
    this.element = element
    this.next = next
  }
}

class LinkedList {
 constructor() {
   this.head = null // 默认应该指向第一个节点
   this.size = 0 // 通过这个长度可以遍历这个链表
 }
 // 增加O(n)
 add(index,element) {
   if(arguments.length === 1) {
     // 向末尾添加
     element = index // 当前元素等于传递的第一项
     index = this.size // 索引指向最后一个元素
   }
  if(index < 0 || index > this.size) {
    throw new Error('添加的索引不正常')
  }
  if(index === 0) {
    // 直接找到头部 把头部改掉 性能更好
    let head = this.head
    this.head = new Node(element,head)
  } else {
    // 获取当前头指针
    let current = this.head
    // 不停遍历 直到找到最后一项 添加的索引是1就找到第0个的next赋值
    for (let i = 0; i < index-1; i++) { // 找到它的前一个
      current = current.next
    }
    // 让创建的元素指向上一个元素的下一个
    // 看图理解next层级 ![](https://s.poetries.top/images/20210522115056.png)
    current.next = new Node(element,current.next) // 让当前元素指向下一个元素的next
  }

  this.size++;
 }
 // 删除O(n)
 remove(index) {
  if(index < 0 || index >= this.size) {
    throw new Error('删除的索引不正常')
  }
  this.size--
  if(index === 0) {
    let head = this.head
    this.head = this.head.next // 移动指针位置

    return head // 返回删除的元素
  }else {
    let current = this.head
    for (let i = 0; i < index-1; i++) { // index-1找到它的前一个
      current = current.next
    }
    let returnVal = current.next // 返回删除的元素
    // 找到待删除的指针的上一个 current.next.next
    // 如删除200， 100=>200=>300 找到200的上一个100的next的next为300，把300赋值给100的next即可
    current.next = current.next.next

    return returnVal
  }
 }
 // 查找O(n)
 get(index) {
  if(index < 0 || index >= this.size) {
    throw new Error('查找的索引不正常')
  }
  let current = this.head
  for (let i = 0; i < index; i++) {
    current = current.next
  }
  return current
 }
 reverse() {
  const reverse = head=>{
    if(head == null || head.next == null) {
      return head
    }
    let newHead = reverse(head.next)
    // 从这个链表的最后一个开始反转，让当前下一个元素的next指向自己，自己指向null
    // ![](https://s.poetries.top/images/20210522161710.png)
    // 刚开始反转的是最后两个
    head.next.next = head
    head.next = null

    return newHead
  }
  return reverse(this.head)
 }
}

let ll = new LinkedList()

ll.add(1)
ll.add(2)
ll.add(3)
ll.add(4)

// console.dir(ll,{depth: 1000})

console.log(ll.reverse())

