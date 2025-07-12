qiankun 是基于 single-spa 的微前端实现框架，主要用于在主应用中动态加载多个子应用，实现多团队协作开发、独立部署等目标。它的核心能力包括应用的注册、生命周期管理、资源加载、沙箱隔离等。

**1. qiankun 的核心原理：**
- 利用 single-spa 管理子应用的生命周期（加载、挂载、卸载）。
- 子应用以 HTML Entry 的方式接入，qiankun 负责资源的加载与渲染。
- 通过沙箱机制实现子应用之间的隔离，避免全局变量、样式等互相污染。

---

**2. CSS 隔离的实现：**

qiankun 主要通过两种方式实现 CSS 隔离：

- **样式前缀（Scoped CSS）**
  在 experimentalStyleIsolation: true 时，qiankun 会为每个子应用的 DOM 节点添加独立的容器（如 data-qiankun 属性），并自动为样式加上前缀，限制样式作用范围。

- **Shadow DOM（实验性）**
  通过 experimentalStyleIsolation: true 配置，qiankun 可以将子应用内容挂载到 Shadow DOM 中，利用 Shadow DOM 的天然样式隔离能力，防止样式泄漏到全局。

---

**3. JS 隔离的实现：**

qiankun 通过沙箱（sandbox）机制实现 JS 隔离，主要方式如下：

- **Proxy 沙箱**
  利用 ES6 Proxy 对 window 对象进行代理。每个子应用运行时，都会有一个独立的 Proxy 沙箱，子应用对全局变量的修改只作用于自己的沙箱，不会影响主应用和其他子应用。

- **快照沙箱**
  对于不支持 Proxy 的环境，qiankun 采用快照沙箱：在子应用挂载前记录全局变量状态，卸载时恢复，避免全局变量污染。

---

**总结：**
- CSS 隔离：Scoped CSS（样式前缀）、Shadow DOM。
- JS 隔离：Proxy 沙箱、快照沙箱。

如果需要代码示例或更详细的实现细节，可以继续提问。


