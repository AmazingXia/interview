# Webpack 高频题

## 1. 什么是代码分割（Code Splitting）？为什么要做？

**参考答案：**
代码分割是把一个大 bundle 按规则拆成多个小 chunk，让浏览器按需加载。核心价值是减少首屏资源体积、提升缓存命中、降低重复下载。常见场景：

- 路由级懒加载（页面级拆分）
- 第三方库拆分（vendors）
- 公共模块拆分（commons）

---

## 2. `splitChunks` 常用配置有哪些？

**参考答案：**
高频配置包括：

- `chunks`：`all / async / initial`
- `minSize`：达到最小体积才拆分
- `minChunks`：被引用次数达到阈值才提取
- `maxAsyncRequests`、`maxInitialRequests`：并行请求上限
- `cacheGroups`：自定义分包规则（如 `vendors`、`commons`）

实战里最常见是 `chunks: 'all'` + `cacheGroups` 做第三方和公共模块拆分。

---

## 3. `hash`、`chunkhash`、`contenthash` 有什么区别？

**参考答案：**

- `hash`：项目级；任意文件变更都会导致整体 hash 变化。
- `chunkhash`：chunk 级；某个 chunk 内容变更才变化，适合 JS 缓存。
- `contenthash`：文件内容级；仅该文件内容变更才变化，常用于 CSS。

面试表达：一般建议 JS 用 `chunkhash/contenthash`，CSS 优先 `contenthash`，提高长效缓存命中率。

---

## 4. 如何提升 Webpack 构建速度？

**参考答案：**
可以从“少处理、快处理、复用结果”三个方向回答：

- 少处理：`include/exclude` 缩小 loader 处理范围
- 快处理：合理配置 `resolve.modules`、`resolve.alias`
- 复用结果：开启缓存（如 loader cache、构建缓存）
- 并行处理：历史方案如 `happypack`（现代项目可提 thread-loader）
- 外部化依赖：`externals + CDN` 减少打包体积与构建压力

---

## 5. 什么是 Tree Shaking？为什么只对 ES Module 生效？

**参考答案：**
Tree Shaking 是在打包阶段删除未使用代码（Dead Code）。它依赖静态分析 import/export 关系，ES Module 是静态结构，CommonJS 是动态运行时导入，难以可靠静态分析，因此 Tree Shaking 对 ESM 效果最好。

补充点：

- 生产模式默认更完整开启
- `sideEffects` 可声明模块副作用，避免误删

---

## 6. `runtimeChunk: 'single'` 的作用是什么？

**参考答案：**
把运行时代码（模块映射、加载逻辑）单独提取成一个 runtime chunk。好处是业务代码变更时，runtime 与业务 chunk 解耦，减少不必要的缓存失效，提升缓存稳定性。
