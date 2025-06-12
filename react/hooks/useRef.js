// // useRef.js

// useRef 是 React 中的一个 Hook，主要用于以下场景：

// 访问 DOM 元素：可以获取并操作 DOM 元素的引用。
// 存储可变值：可以在组件的整个生命周期中存储一个可变值，而不会触发组件重新渲染。
// useRef 返回一个可变的 ref 对象，该对象的 .current 属性可以存储值。

// 以下是一个简单的示例，展示如何使用 useRef：


// 示例 1：访问 DOM 元素
import React, { useRef } from 'react';

function InputFocus() {
  const inputRef = useRef(null);

  const handleFocus = () => {
    // 通过 useRef 获取 input 元素并聚焦
    inputRef.current.focus();
  };

  return (
    <div>
      <input ref={inputRef} type="text" placeholder="点击按钮聚焦" />
      <button onClick={handleFocus}>聚焦输入框</button>
    </div>
  );
}

export default InputFocus;



// 示例 2：存储可变值

import React, { useRef, useState } from 'react';

function Counter() {
  const countRef = useRef(0);
  const [renderCount, setRenderCount] = useState(0);

  const increment = () => {
    countRef.current += 1; // 修改 ref 值，不会触发重新渲染
    console.log('Ref 值:', countRef.current);
  };

  const forceRender = () => {
    setRenderCount(renderCount + 1); // 强制重新渲染
  };

  return (
    <div>
      <p>Ref 值: {countRef.current}</p>
      <p>渲染次数: {renderCount}</p>
      <button onClick={increment}>增加 Ref 值</button>
      <button onClick={forceRender}>强制重新渲染</button>
    </div>
  );
}

export default Counter;

// 3. useState存储的是状态数据  useRef 存储的数据不属于状态数据  不会改变  经常用来存储辅助数据
// 在点击 Stop 按钮时，我们希望停止计数器，setCount执行  App组件会重新执行 导致timerId 变为 null，无法清除计时器。
// 再点击 Stop 按钮时，计数器会停止计数，但由于 timerId 是在 useEffect 中定义的，无法直接访问到它。我们需要将 timerId 存储在 useRef 中，以便在 stopCount 函数中访问。
import React, { useState, useEffect } from "react";

function App() {
  const [count, setCount] = useState(0);
  let timerId = null;

  useEffect(() => {
    timerId = setInterval(() => {
      setCount((count) => count + 1);
    }, 1000);

    return () => clearInterval(timerId); // Cleanup interval on unmount
  }, []);

  const stopCount = () => {
    console.log(timerId);
    clearInterval(timerId);
  };

  return (
    <div>
      {count}
      <button onClick={stopCount}>Stop</button>
    </div>
  );
}

export default App;


// 修复后的代码  useRef 具有跨周期的持久性，可以在组件的整个生命周期中保持对同一对象的引用，而不会因为组件重新渲染而丢失引用。
import React, { useState, useEffect, useRef } from "react";

function App() {
  const [count, setCount] = useState(0);
  const timerId = useRef();

  useEffect(() => {
    timerId.current = setInterval(() => {
      setCount((count) => count + 1);
    }, 1000);

    return () => clearInterval(timerId.current); // Cleanup interval on unmount
  }, []);

  const stopCount = () => {
    console.log(timerId.current);
    clearInterval(timerId.current);
  };

  return (
    <div>
      {count}
      <button onClick={stopCount}>Stop</button>
    </div>
  );
}

export default App;