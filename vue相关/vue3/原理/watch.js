// 1. watch
// watch 用于监听一个或多个响应式数据的变化，并在变化时执行回调函数。它适合用于需要明确指定监听目标的场景。

// 特点：

// 需要显式指定监听的目标（可以是响应式数据或计算属性）。
// 回调函数会接收两个参数：新值和旧值。
// 默认是惰性执行（只有监听的值发生变化时才会触发）。
import { ref, watch } from 'vue';

const count = ref(0);

watch(count, (newValue, oldValue) => {
  console.log(`count changed from ${oldValue} to ${newValue}`);
});

// 修改 count 的值会触发回调
count.value = 1;
// 2. watchEffect
// watchEffect 是一个更高效、更自动化的监听方式，它会在其回调函数中自动收集依赖的响应式数据，并在这些依赖发生变化时重新运行回调函数。适合用于不需要显式指定监听目标的场景。

// 特点：

// 不需要显式指定监听目标，依赖会自动收集。
// 回调函数在初始化时会立即执行一次。
// 更适合用于简单的副作用逻辑。


import { ref, watchEffect } from 'vue';

const count = ref(0);

watchEffect(() => {
  console.log(`count is now ${count.value}`);
});

// 修改 count 的值会触发回调
count.value = 1;


// 总结
// 特性	                watch	        watchEffect
// 依赖收集方式	    手动指定监听目标	  自动收集依赖
// 是否立即执行	    否（默认惰性）	      是
// 使用场景	      需要监听特定数据变化	 需要响应式数据变化时自动运行逻辑
// 回调参数	          新值和旧值	      无（直接在回调中访问响应式数据）


// 使用建议
// 如果你需要监听特定的响应式数据并获取新旧值，使用 watch。
// 如果你只需要在响应式数据变化时执行逻辑，且不关心新旧值，使用 watchEffect。