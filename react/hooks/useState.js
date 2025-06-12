import React, { useState } from 'react';

// useState 是 React 的一个 Hook，用于在函数组件中管理状态。
// 它允许我们在组件中添加本地状态，并在状态更新时重新渲染组件。


function Counter() {
  // useState 接受一个初始值作为参数，这里是 0。
  // 它返回一个数组，第一个元素是当前状态值，第二个元素是更新状态的函数。
  const [count, setCount] = useState(0);

  // 点击按钮时，调用 setCount 更新状态。
  return (
    <div>
      <p>当前计数值: {count}</p>
      <button onClick={() => setCount(count + 1)}>增加</button>
      <button onClick={() => setCount(count - 1)}>减少</button>
      <button onClick={() => setCount(0)}>重置</button>
    </div>
  );
}

export default Counter;

// 使用说明：
// 1. useState 是一个 React Hook，必须在函数组件中调用，不能在普通函数或类组件中使用。
// 2. 每次调用 useState 都会创建一个独立的状态变量。
// 3. 状态更新是异步的，React 会在下一次渲染时应用状态更新。


// useState 特点
/**
1. 接收唯一的参数即状态初始值.初始值可以是任意数据类型.
2. 返回值为数组.数组中存储状态值和更改状态值的方法.方法名称约定以set开头，后面加上状态名称.
3. 方法可以被调用多次.用以保存不同状态值.
4. 参数可以是一个函数，函数返回什么，初始状态就是什么，函数只会被调用一次，用在初始值是动态值的情况.
 */




import React, { useState } from 'react';

function App(props) {

  // 接受一个函数  只会执行一次 , // 这个函数的返回值作为初始状态
  const [count, setCount] = useState(() => {
    return props.count || 0;
  });

  const [person, setPerson] = useState({ name: 'John', age: 20 });

  return (
    <div>
      <span>{count} {person.name} {person.age}</span>
      <button onClick={() => setCount(count + 1)}>+ 1</button>
      <button onClick={() => setPerson({ ...person, name: 'Jane' })}>Set Person</button>
    </div>
  );
}

export default App;



// 2.1 useState)
// 设置状态值方法的参数可以是一个值也可以是一个函数
// 设置状态值方法的方法本身是异步的