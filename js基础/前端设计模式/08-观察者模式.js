// 🪝 8. 观察者模式（Observer Pattern）
// ✅ 作用：多个对象监听一个对象状态，变化时自动通知
// 📦 业务场景：响应式数据系统（Vue 2 响应式）



class Observer {
  constructor() {
    this.dependents = [];
  }
  depend(fn) {
    this.dependents.push(fn);
  }
  notify() {
    this.dependents.forEach(fn => fn());
  }
}

const obs = new Observer();
let state = { count: 0 };

obs.depend(() => console.log('count changed:', state.count));

state.count = 1;
obs.notify();
