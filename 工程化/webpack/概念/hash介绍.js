| Hash 类型       | 粒度      | 变化条件          | 适合用途         |
| ------------- | ------- | ------------- | ------------ |
| `hash`        | 项目级     | 任意文件变动        | 简单项目         |
| `chunkhash`   | chunk 级 | 对应 chunk 内容变动 | 多入口 JS 缓存优化  |
| `contenthash` | 文件内容级   | 文件自身内容变动      | CSS/静态资源缓存优化 |


重点记忆

应用场景



// chunkhash 和 contenthash 的区别在于，chunkhash 是基于 chunk 的内容生成的哈希值，
// 而 contenthash 是基于文件内容生成的哈希值。chunkhash 适用于 JS 文件，contenthash 适用于 CSS 文件。
// 当文件内容变更时，chunkhash 会改变，但如果只是修改了 CSS 文件而 JS 文件没有变更，chunkhash 可能不会改变，这时 contenthash 就能确保 CSS 文件的哈希值更新，从而实现更细粒度的缓存优化。
// contenthash 适用于 CSS 文件，因为 CSS 文件通常会被单独处理和缓存
// chunkhash 适用于 JS 文件，因为 JS 文件通常是多个模块打包成一个 chunk 的，chunkhash 可以确保只有当对应的 JS 代码变更时，才会更新哈希值，从而优化缓存。
