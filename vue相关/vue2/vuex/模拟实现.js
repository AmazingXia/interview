



// 二、mutation 和 action 的区别与使用时机
// | 特点   | Mutation     | Action                |
// | ---- | ------------ | --------------------- |
// | 是否同步 | ✅ 必须同步       | ❌ 可以异步                |
// | 修改状态 | ✅ 直接修改 state | ❌ 不能直接修改，需提交 mutation |
// | 触发方式 | `commit`     | `dispatch`            |
// | 常用场景 | 简单状态更新       | 异步操作（如 API 请求）        |


// 使用时机总结：
// 同步逻辑（如表单输入更新、开关切换） → 用 mutation
// 异步逻辑（如请求接口、定时器、批量处理） → 用 action，在其中再 commit mutation

// 三、为什么不能混用（mutation 不应包含异步逻辑）
// 原因：
// 状态不可追踪：Vuex 的调试工具（devtools）依赖 mutation 的同步性来记录每一步状态变化。如果 mutation 中有异步代码，就无法保证状态一致性。

// 调试困难：异步操作可能导致状态在未来某个时间被修改，难以定位问题。

// 原则性设计：Vuex 的设计就是单一数据流：组件触发 -> action -> mutation -> state


// 五、总结一句话
// mutation 负责“同步地”修改状态，action 负责“异步地”处理逻辑后提交 mutation，不能混用是为了保证状态变更可追踪、逻辑可维护。

class Store {
  constructor(options) {
    this.state = options.state;
    this.mutations = options.mutations;
    this.actions = options.actions;

    this.getters = {};
    const getters = options.getters || {};
    Object.keys(getters).forEach(key => {
      Object.defineProperty(this.getters, key, {
        get: () => getters[key](this.state),
        enumerable: true
      });
    });
  }

  commit = (type, payload) => {
    const mutation = this.mutations[type];
    if (mutation) {
      mutation(this.state, payload);
    } else {
      console.error(`Mutation ${type} not found`);
    }
  }

  dispatch = (type, payload) => {
    const action = this.actions[type];
    if (action) {
      return action({
        state: this.state,
        commit: this.commit,
        dispatch: this.dispatch,
      }, payload);
    } else {
      console.error(`Action ${type} not found`);
    }
  }
}
