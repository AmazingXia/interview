import { reactive } from 'vue';

const state = reactive({
  count: 0,
  message: 'Hello Vue 3'
});

// 正确使用：直接访问响应式对象的属性
console.log(state.count); // 0
console.log(state.message); // Hello Vue 3

// 错误示例：解构响应式对象
const { count, message } = state;

// 解构后，count 和 message 不再是响应式的
console.log(count); // 0
console.log(message); // Hello Vue 3

// 修改 state 的属性，解构后的变量不会更新
state.count++;
console.log(count); // 0 (不会更新)
console.log(state.count); // 1 (正确更新)

// 解决方案：避免解构，直接使用响应式对象的属性


// 解构出来的变量  赋值给了新的变量   新的变量是一个普通的js变量  不是响应式数据

// 可以通过toRefs调用   他的作用是把  对象所有的属性变成响应式的
// toRefs 必须传入一个代理对象   否则报错  内部会创建一个新的对象  把代理对象的属性 通过ref创建.value属性