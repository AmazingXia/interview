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