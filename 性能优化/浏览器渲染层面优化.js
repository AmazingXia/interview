
// 1.处理 HTML 标记并构建 DOM 树。
// 2. 处理 CSS 标记并构建 CSSOM 树。
// 3. 将 DOM 与 CSSOM 合并成一个 render tree。
// 4. 根据渲染树来布局，以计算每个节点的几何信息。
// 5. 将各个节点绘制到屏幕上。

优化关键渲染路径
// 就是指最大限度缩短执行上述第1步至第5 步耗费的总时间，让用户最快的看到首次渲染的内容。

总结起来有三种方式可以优化 HTML：


缩小 文件的尺寸（Minify）、使用gzip压缩 （Compress）、使用缓存（HTTP Cache) .


一. css优化点
// 不要.css文件中  使用@import 加载其他css文件，因为它会阻塞渲染。
@import url("./main.css");

// link标签加载CSS文件时，浏览器会并行加载多个资源，而@import  是顺序加载css的  会导致请求css总体时间变长;  会阻塞渲染，直到所有的CSS都加载完成。


// 2.js优化点
// 删除未使用的代码（Tree-shaking）
// 缩小文件尺寸（Minify）
// 启用 Gzip 或 Brotli 压缩（Compress）
// 利用 HTTP 缓存机制（HTTP Cache）

// 此外，还应注意以下运行时优化策略：

// 异步加载 JavaScript：使用 async 或 defer 属性，避免阻塞页面渲染；
// 避免同步请求：尤其在主线程中使用 XMLHttpRequest 同步请求，会阻塞页面；
// 延迟解析 JavaScript：将非关键脚本放在页面底部，或延迟加载；
// 避免运行时间过长的 JavaScript：如复杂循环、无效递归，可能导致卡顿或阻塞用户交互。

// 注意;  script 标签  放置的位置靠前   浏览器就会尽早去下载, 但是又不想要影响页面渲染  可以设置 defer 和async 属性异步加载脚本。

// defer 特性告诉浏览器不要等待脚本。相
// 反，浏览器将继续处理 HTML，构建 DOM。
// 脚本会“在后台”下载，然后等DOM 构建
// 完成后，脚本才会执行。。