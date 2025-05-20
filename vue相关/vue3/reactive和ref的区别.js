// reactive 和 ref 是 Vue 3 中用于响应式数据的两种核心 API，它们的主要区别如下：

// 1. 数据类型
// reactive：用于创建对象类型的响应式数据。它可以将一个普通的 JavaScript 对象转换为响应式对象。
// ref：用于创建基本类型（如字符串、数字、布尔值等）或单一值的响应式数据。它也可以包装对象，但需要通过 .value 访问。
// 2. 使用方式
import { reactive } from 'vue';

const state = reactive({
  count: 0,
  user: {
    name: 'Alice',
    age: 25
  }
});

state.count++; // 响应式更新
state.user.name = 'Bob'; // 响应式更新


import { ref } from 'vue';

const count = ref(0);
count.value++; // 响应式更新

const user = ref({ name: 'Alice', age: 25 });
user.value.name = 'Bob'; // 响应式更新

// 3. 响应式的深度
// reactive：会对对象的所有嵌套属性进行深度响应式处理。
// ref：如果包装的是对象，只有 .value 是响应式的，内部属性不会自动深度响应式。
// 4. 适用场景
// reactive：适合管理复杂的对象状态（如组件的状态）。
// ref：适合管理简单的值或需要单独处理的变量。
// 总结
// 如果是对象或数组，推荐使用 reactive。
// 如果是基本类型或需要单独处理的值，推荐使用 ref。