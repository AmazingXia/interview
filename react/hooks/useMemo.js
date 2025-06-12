import React, { useState, useMemo } from 'react';
import React, { memo } from 'react';

function ExpensiveComputationDemo() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  // 使用 useMemo 记住计算结果
  const expensiveComputation = useMemo(() => {
    console.log('执行高开销计算...');
    let result = 0;
    for (let i = 0; i < 1000000000; i++) {
      result += i;
    }
    return result;
  }, [count]);

  return (
    <div>
      <h1>useMemo 示例</h1>
      <p>高开销计算结果: {expensiveComputation}</p>
      <button onClick={() => setCount(count + 1)}>增加计数: {count}</button>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="输入文本"
      />
    </div>
  );
}

export default ExpensiveComputationDemo;




// // 使用 React.memo 优化组件渲染
const MemoizedComponent = memo(({ text }) => {
  console.log('MemoizedComponent 渲染');
  return <p>输入的文本: {text}</p>;
});

// 使用 MemoizedComponent
// 在主组件中添加
function ExpensiveComputationDemo() {
  // 其他代码保持不变

  return (
    <div>
      <h1>useMemo 示例</h1>
      <p>高开销计算结果: {expensiveComputation}</p>
      <button onClick={() => setCount(count + 1)}>增加计数: {count}</button>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="输入文本"
      />
      <MemoizedComponent text={text} />
    </div>
  );
}