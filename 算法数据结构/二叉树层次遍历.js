// 二叉搜索树

class Node {
  constructor(element, parent) {
    this.parent = parent // 父节点
    this.element = element // 当前存储内容
    this.left = null // 左子树
    this.right = null // 右子树
  }
}

class BST {
  constructor(compare) {
    this.root = null // 树根
    this.size = 0 // 树中的节点个数

    this.compare = compare || this.compare
  }
  compare(a,b) {
    return a - b
  }
  add(element) {
    if(this.root === null) {
      this.root = new Node(element, null)
      this.size++
      return
    }
    // 获取根节点 用当前添加的进行判断 放左边还是放右边
    let currentNode = this.root
    let compare
    let parent = null
    while (currentNode) {
      compare = this.compare(element, currentNode.element)
      parent = currentNode // 先将父亲保存起来
      // currentNode要不停的变化
      if(compare > 0) {
        currentNode = currentNode.right
      } else if(compare < 0) {
        currentNode = currentNode.left
      } else {
        currentNode.element = element // 相等时 先覆盖后续处理
      }
    }

    let newNode = new Node(element, parent)
    if(compare > 0) {
      parent.right = newNode
    } else if(compare < 0) {
      parent.left = newNode
    }

    this.size++
  }
}
