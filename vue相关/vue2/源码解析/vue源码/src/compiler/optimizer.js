/* @flow */

import { makeMap, isBuiltInTag, cached, no } from 'shared/util'
// 从共享工具库中导入 `makeMap`（创建映射函数）、`isBuiltInTag`（判断是否为内置标签）、`cached`（缓存函数）、`no`（返回 false 的函数）

let isStaticKey
let isPlatformReservedTag

const genStaticKeysCached = cached(genStaticKeys)
// 生成静态 key，并缓存以提高性能


/**
 * Goal of the optimizer: walk the generated template AST tree
 * and detect sub-trees that are purely static, i.e. parts of
 * the DOM that never needs to change.
 *
 * Once we detect these sub-trees, we can:
 *
 * 1. Hoist them into constants, so that we no longer need to
 *    create fresh nodes for them on each re-render;
 * 2. Completely skip them in the patching process.
 */


/**
 * 优化器的目标：遍历生成的模板 AST 树，
 * 识别纯静态的子树，即 DOM 中不需要变化的部分。
 *
 * 一旦识别出这些静态子树，我们可以：
 *
 * 1. 将它们提升为常量，这样每次重新渲染时不需要创建新的节点；
 * 2. 在补丁（patch）过程中完全跳过它们，提高渲染性能。
 */
export function optimize (root: ?ASTElement, options: CompilerOptions) {
  if (!root) return
  // 如果 AST 根节点不存在，则直接返回

  isStaticKey = genStaticKeysCached(options.staticKeys || '')
  // 生成静态 key 集合

  isPlatformReservedTag = options.isReservedTag || no
  // 判断是否为平台保留标签，默认为 `no`（返回 false）

  // 第一次遍历：标记所有非静态节点
  markStatic(root)

  // 第二次遍历：标记静态根节点
  markStaticRoots(root, false)
}

function genStaticKeys (keys: string): Function {
  return makeMap(
    'type,tag,attrsList,attrsMap,plain,parent,children,attrs,start,end,rawAttrsMap' +
    (keys ? ',' + keys : '')
    // 生成静态 key 映射表，包含 AST 中的基本属性
  )
}

function markStatic (node: ASTNode) {
  node.static = isStatic(node)
  // 判断当前节点是否为静态节点，并标记到 `static` 属性上

  if (node.type === 1) {
    // 只有元素节点（type === 1）才需要进一步处理

    // 避免将组件的 slot 内容标记为静态：
    // 1. 组件需要能够修改 slot 内容
    // 2. 静态 slot 内容会影响热重载
    if (
      !isPlatformReservedTag(node.tag) &&
      node.tag !== 'slot' &&
      node.attrsMap['inline-template'] == null
    ) {
      return
      // 非平台保留标签且不是 slot，并且没有 `inline-template`，直接返回
    }

    for (let i = 0, l = node.children.length; i < l; i++) {
      // 递归遍历子节点
      const child = node.children[i]
      markStatic(child)
      if (!child.static) {
        node.static = false
        // 只要子节点有一个不是静态的，则当前节点也不是静态的
      }
    }

    if (node.ifConditions) {
      // 处理 `v-if` 及 `v-else-if` 条件分支
      for (let i = 1, l = node.ifConditions.length; i < l; i++) {
        const block = node.ifConditions[i].block
        markStatic(block)
        if (!block.static) {
          node.static = false
          // 只要 `v-if` 或 `v-else-if` 分支中的 block 不是静态的，则当前节点不是静态的
        }
      }
    }
  }
}

function markStaticRoots (node: ASTNode, isInFor: boolean) {
  if (node.type === 1) {
    // 只处理元素节点
    if (node.static || node.once) {
      // 如果是静态节点或 v-once 指定的节点
      node.staticInFor = isInFor
      // 记录是否在 v-for 内部
    }

    // 只有包含多个静态子节点的节点，才标记为静态根节点
    // 如果只有一个静态文本子节点，提升它的代价大于收益，所以不标记
    if (node.static && node.children.length && !(
      node.children.length === 1 &&
      node.children[0].type === 3
    )) {
      node.staticRoot = true
      // 标记为静态根节点
      return
    } else {
      node.staticRoot = false
      // 如果不满足条件，则不是静态根
    }

    if (node.children) {
      // 递归处理子节点
      for (let i = 0, l = node.children.length; i < l; i++) {
        markStaticRoots(node.children[i], isInFor || !!node.for)
        // 继续递归标记静态根，isInFor 传递是否在 v-for 中
      }
    }

    if (node.ifConditions) {
      // 处理 v-if 和 v-else-if 语句的 block
      for (let i = 1, l = node.ifConditions.length; i < l; i++) {
        markStaticRoots(node.ifConditions[i].block, isInFor)
      }
    }
  }
}

function isStatic (node: ASTNode): boolean {
  if (node.type === 2) {
    // type === 2 代表表达式节点，如 `{{ message }}`
    return false
  }
  if (node.type === 3) {
    // type === 3 代表纯文本节点
    return true
  }
  return !!(node.pre || (
    !node.hasBindings && // 没有动态绑定
    !node.if && !node.for && // 不是 v-if、v-for、v-else
    !isBuiltInTag(node.tag) && // 不是内置组件（如 `slot`、`component`）
    isPlatformReservedTag(node.tag) && // 是平台保留标签（即原生 HTML 标签）
    !isDirectChildOfTemplateFor(node) && // 不是 template v-for 的直接子节点
    Object.keys(node).every(isStaticKey) // 节点的所有属性都在静态 key 集合中
  ))
}

function isDirectChildOfTemplateFor (node: ASTElement): boolean {
  while (node.parent) {
    // 遍历父节点
    node = node.parent
    if (node.tag !== 'template') {
      // 只检查 template 标签
      return false
    }
    if (node.for) {
      // 如果 `template` 具有 `v-for`，则返回 true
      return true
    }
  }
  return false
  // 直到根节点都没有 `template v-for`，返回 false
}
