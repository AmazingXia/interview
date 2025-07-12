/**
 * useLayoutEffect 是 React 提供的一个 Hook，用于在 DOM 更新后同步执行副作用操作。
 *
 * 概念详细介绍：
 * - useLayoutEffect 的回调会在所有 DOM 变更后同步执行（在浏览器绘制前），
 *   这意味着它会阻塞浏览器绘制，直到回调函数执行完毕。
 * - 适合需要读取布局信息（如元素尺寸、位置）或同步修改 DOM 的场景。
 *
 * 应用场景：
 * - 读取 DOM 元素的尺寸或位置，并基于这些信息进行计算。
 * - 需要在浏览器绘制前同步修改 DOM，避免出现闪烁或布局抖动。
 * - 实现动画、拖拽等需要精确控制 DOM 的场景。
 *
 * 与 useEffect 的区别：
 * - useEffect 的回调会在浏览器完成绘制后异步执行，不会阻塞页面渲染。
 * - useLayoutEffect 的回调会在 DOM 更新后、浏览器绘制前同步执行，可能会阻塞渲染。
 * - 如果副作用操作会影响布局或需要读取最新的 DOM 信息，推荐使用 useLayoutEffect。
 * - 如果副作用操作不会影响布局（如数据请求、事件监听），推荐使用 useEffect。
 */







import React, { useLayoutEffect, useRef, useState } from 'react';

export default function LayoutEffectDemo() {
  const ref = useRef();
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    // 读取 DOM 元素宽度并设置到 state
    setWidth(ref.current.getBoundingClientRect().width);
  }, []);

  return (
    <div>
      <div ref={ref} style={{ width: '50vw', background: '#eee' }}>
        这个 div 的宽度是 {width}px
      </div>
    </div>
  );
}

