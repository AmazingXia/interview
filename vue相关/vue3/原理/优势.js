// Vue3 Composition API
// 问题: Vue3的setup函数与Vue2的Options API相比有哪些优势？
// 答案:
// 逻辑组织更好:
// Options API将逻辑分散(data, methods, computed等)
// Composition API可将相关逻辑组织在一起
// 更好的类型推断:
// Composition API对TypeScript支持更好
// 代码复用性高:
// 可使用自定义组合式函数轻松复用逻辑
// 更小的生产包体积:
// 基于函数的API对tree-shaking更友好


// 更好的性能:
// Vue3使用Proxy代替Vue2的Object.defineProperty实现响应式，性能更高
// 支持Fragment和Teleport，减少不必要的DOM结构
// 编译器优化更强，生成更高效的渲染函数

// 更好的生态支持:
// Vue3对现代工具链支持更好，如Vite
// 提供更灵活的插件机制和扩展能力

// 更好的开发体验:
// 更清晰的API设计，减少学习成本
// 更好的错误提示和调试工具


// Vue2的响应式系统使用Object.defineProperty来拦截对象属性的访问和修改
// Vue3使用Proxy实现响应式

// • Vue.js 3.0中使用 Proxy 对象重写响应式系统
// • 可以监听动态新增的属性
// • 可以监听删除的属性
// •可以监听数组的索引和 length 属性


// •Vue.js 2.x中通过标记静态根节点，优化 diff 的过程
// vue2只会跳过静态根节点  内容的静态节点仍然会diff


// • Vue.js 3.0中标记和提升所有的静态根节点，diff 的时候只需要对比动态节点内容
// • Fragments（升级 vetur 插件）
// • 静态提升
// • Patch flag
// •缓存事件处理函数



// • Proxy 对象实现属性监听
// •多层属性嵌套，在访问属性过程中处理下一级属性
// • 默认监听动态添加的属性
// • 默认监听属性的删除操作
// •默认监听数组索引和 length 属性
// • 可以作为单独的模块使用