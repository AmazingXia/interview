// 2.4 useEffect()
// 1. useEffect 执⾏时机
// 可以把 useEffect 看做 componentDidMount, componentDidUpdate 和 componentWillUnmount 这三个函数的组合.



// useEffect(() => {}) => componentDidMount, componentDidUpdate
// useEffect(() => {}, []) => componentDidMount
// useEffect(() => () => {}) => componentWillUnMount



import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

function App() {
  function onScroll() {
    console.log("页面发生滚动了");
  }

  // 1. 按照⽤途将代码进⾏分类 (将⼀组相⼲的业务逻辑归置到了同⼀个副作⽤函数中)
  // 2. 简化重复代码, 使组件内部代码更加清晰,  不需要再多个生命周期调用函数
  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const [count, setCount] = useState(0);

  useEffect(() => {
    const timerId = setInterval(() => {
      setCount((count) => {
        document.title = count + 1;
        return count + 1;
      });
    }, 1000);
    return () => clearInterval(timerId);
  }, []);

  return (
    <div>
      <span>{count}</span>
      <button
        onClick={() =>
          ReactDOM.unmountComponentAtNode(document.getElementById("root"))
        }
      >
        Unmount
      </button>
    </div>
  );
}

export default App;




// useEffect 的其他使用方法

import React, { useEffect, useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");

  // 1. 不传依赖数组：每次组件渲染都会执行
  useEffect(() => {
    console.log("组件渲染或更新");
  });

  // 2. 传空依赖数组：只在组件挂载时执行（类似于 componentDidMount）
  useEffect(() => {
    console.log("组件挂载");
    return () => {
      console.log("组件卸载");
    };
  }, []);

  // 3. 传递特定依赖：依赖变化时执行（类似于 componentDidUpdate,  componentDidMount）都会执行
  useEffect(() => {
    console.log("count 发生变化:", count);
  }, [count]);

  // 4. 多个 useEffect：可以根据不同逻辑拆分多个 useEffect
  useEffect(() => {
    console.log("name 发生变化:", name);
  }, [name]);


  // 5. 异步
  // useEffect中的参数函数不能是异步函数, 因为useEffect函数要返回清理资源的函数, 如果是异步函数就变成了返回Promise

  useEffect(() => {
    (async () => {
      try {
        await axios.get();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  });

  return (
    <div>
      <h1>useEffect 示例</h1>
      <div>
        <button onClick={() => setCount(count + 1)}>增加 count</button>
        <p>当前 count: {count}</p>
      </div>
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="输入名字"
        />
        <p>当前 name: {name}</p>
      </div>
    </div>
  );
}

export default App;