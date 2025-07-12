// 用过哪些设计模式 https://interview.amazingxia.top/docs/base.html#_18-%E7%94%A8%E8%BF%87%E5%93%AA%E4%BA%9B%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F

// 常用设计模式有哪些并举例使用场景  https://interview.amazingxia.top/docs/base.html#_122-%E5%B8%B8%E7%94%A8%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F%E6%9C%89%E5%93%AA%E4%BA%9B%E5%B9%B6%E4%B8%BE%E4%BE%8B%E4%BD%BF%E7%94%A8%E5%9C%BA%E6%99%AF

// 设计模式 https://interview.amazingxia.top/docs/base/design-pattern.html


// 什么样的前端代码是好的  https://interview.amazingxia.top/docs/base.html#_2-%E4%BB%80%E4%B9%88%E6%A0%B7%E7%9A%84%E5%89%8D%E7%AB%AF%E4%BB%A3%E7%A0%81%E6%98%AF%E5%A5%BD%E7%9A%84

// 设计模式的六大原则
单一职责原则、开放封闭原则、里氏替换原则、依赖倒置原则、接口隔离原则 迪米特法则



好的前端代码具有以下特点：

可读性高：代码结构清晰，命名规范，注释清晰明了，易于理解和维护。
高复用性：代码组织良好，模块化设计，可通过复用组件、函数和样式来减少代码的冗余。
低耦合性：模块之间相互独立，减少模块之间的依赖，修改一个模块时不会对其他模块造成影响。
高性能：代码优化，减少不必要的计算和请求，合理使用缓存机制，提高页面加载速度和响应性能。
可维护性：代码结构清晰，逻辑简洁，易于调试和修改，便于团队协作和后续的功能迭代。
可靠性：代码经过严格的测试，处理各种异常情况，确保系统的稳定性和可靠性。
宽容性：能够适应不同浏览器和设备的差异，具有良好的兼容性，确保在各种环境下都能正常运行和展示。
安全性：防范常见的前端安全漏洞，保护用户信息和系统数据的安全。



// 📌 总结表格：前端常见设计模式对照业务场景
| 设计模式    | 典型用途           | 示例业务场景             |
| ------- | -------------- | ------------------ |
| 单例模式    | 全局唯一实例         | Toast、Store        |
| 工厂模式    | 对象统一创建         | 多类型组件渲染            |
| 策略模式    | 多种策略替代 if-else | 表单校验、排序策略          |
| 装饰器模式   | 添加额外功能（增强）     | 日志记录、防抖、权限增强       |
| 代理模式    | 控制访问、懒加载、缓存    | 图片懒加载、数据缓存代理       |
| 发布-订阅模式 | 事件驱动、解耦通信      | mitt、EventBus、消息中心 |
| 观察者模式   | 数据响应式          | Vue 2 的响应式系统       |
| 组合模式    | 树形结构递归处理       | 菜单、评论树、DOM 节点结构    |
| 模板方法模式  | 通用流程定制         | 表单提交、API 模板封装      |
| 责任链模式   | 流程链式控制         | 校验链、权限链、拦截器        |



// 1. 单例模式（Singleton Pattern）
// ✅ 作用：确保全局只存在一个实例（如全局缓存、全局状态管理）
// 📦 业务场景：消息提示（如 Toast 只能弹一个）


class Toast {
  constructor() {
    if (Toast.instance) return Toast.instance;
    this.toastDom = document.createElement('div');
    document.body.appendChild(this.toastDom);
    Toast.instance = this;
  }

  show(message) {
    this.toastDom.innerText = message;
    this.toastDom.style.display = 'block';
  }
}

const toast1 = new Toast();
const toast2 = new Toast();
toast1 === toast2; // true
