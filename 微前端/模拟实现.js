// qiankong.js
// 简易微前端框架实现方案（核心思路）

class MicroFrontendFramework {
  constructor() {
    this.apps = [];
    this.currentApp = null;
  }

  register(apps) {
    this.apps = apps;
    window.addEventListener('hashchange', this.route.bind(this));
    window.addEventListener('load', this.route.bind(this));
  }

  async route() {
    const path = location.hash.slice(1) || '/';
    const app = this.apps.find(app => app.activeRule(path));
    if (app && app !== this.currentApp) {
      if (this.currentApp && this.currentApp.unmount) {
        await this.currentApp.unmount();
      }
      if (!app.bootstraped) {
        await app.bootstrap();
        app.bootstraped = true;
      }
      await app.mount();
      this.currentApp = app;
    }
  }
}

// 用法示例
const framework = new MicroFrontendFramework();

framework.register([
  {
    name: 'app1',
    activeRule: path => path.startsWith('/app1'),
    bootstrap: async () => {
      // 加载资源
      if (!document.getElementById('app1-script')) {
        const script = document.createElement('script');
        script.id = 'app1-script';
        script.src = 'http://localhost:9001/app1.js';
        document.body.appendChild(script);
        await new Promise(resolve => script.onload = resolve);
      }
    },
    mount: async () => {
      window.app1Mount && window.app1Mount(document.getElementById('subapp'));
    },
    unmount: async () => {
      window.app1Unmount && window.app1Unmount(document.getElementById('subapp'));
    }
  },
  {
    name: 'app2',
    activeRule: path => path.startsWith('/app2'),
    bootstrap: async () => {
      if (!document.getElementById('app2-script')) {
        const script = document.createElement('script');
        script.id = 'app2-script';
        script.src = 'http://localhost:9002/app2.js';
        document.body.appendChild(script);
        await new Promise(resolve => script.onload = resolve);
      }
    },
    mount: async () => {
      window.app2Mount && window.app2Mount(document.getElementById('subapp'));
    },
    unmount: async () => {
      window.app2Unmount && window.app2Unmount(document.getElementById('subapp'));
    }
  }
]);

// 主应用页面需有 <div id="subapp"></div>


/*
CSS样式隔离常用方案：
1. 使用 Shadow DOM：将子应用内容挂载到 shadowRoot，样式天然隔离。
2. CSS 前缀/命名空间：构建时给每个子应用样式加唯一前缀，避免冲突。
3. CSS-in-JS：如 styled-components、emotion，样式作用域限定在组件内。

JS沙箱机制常用方案：
1. iframe：最彻底的隔离，但通信复杂。
2. 代理 window（快照沙箱）：用 Proxy 包裹 window，拦截全局变量读写，子应用卸载时恢复。
3. eval/sandboxed Function：限制作用域，但不完全隔离 DOM。

在你的实现中，可以这样扩展：
- CSS隔离：在 bootstrap/mount 时，将子应用内容挂载到 shadowRoot（如 document.getElementById('subapp').attachShadow({mode: 'open'})），并让子应用渲染到 shadowRoot。
- JS沙箱：用 Proxy 包裹 window，或在子应用 mount/unmount 时保存和恢复 window 的全局变量快照。

更完善的微前端框架（如 qiankun）会结合多种方案实现更强的隔离性。



/*
微前端解决了什么问题？

微前端是一种架构思想，主要解决了以下问题：

1. 多团队协作：允许多个团队独立开发、测试和部署各自负责的前端子应用，提升开发效率和团队自治。
2. 技术栈兼容：不同子应用可以使用不同的前端技术栈（如 React、Vue、Angular），降低技术升级和迁移的成本。
3. 独立部署与发布：子应用可以独立构建和部署，主应用无需整体发布，提升上线效率和稳定性。
4. 运行时隔离：通过样式隔离、JS沙箱等机制，避免子应用间的样式、全局变量等互相污染，提升系统健壮性。
5. 渐进式集成：支持将旧系统逐步拆分为多个子应用，平滑演进大型前端项目。

总之，微前端让大型前端项目的开发、维护和升级更加灵活、可控和高效。
*/