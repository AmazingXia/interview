/**
 * useCallback Hook
 *
 * useCallback is a React Hook that returns a memoized version of the callback function.
 * It is useful to prevent unnecessary re-creations of functions, especially when passing
 * them as props to child components or using them in dependencies of other hooks.
 *
 * @param {Function} callback - The function to be memoized.
 * @param {Array} dependencies - An array of dependencies that determine when the memoized
 *                                function should be updated.
 * @returns {Function} - The memoized version of the callback function.
 *
 * @example
 * const memoizedCallback = useCallback(() => {
 *   doSomething();
 * }, [dependency]);
 *
 * 注意事项:
 * - 确保正确设置依赖数组，否则可能导致意外的行为或性能问题。
 * - 不要过度使用 useCallback，仅在必要时使用以优化性能。
 * - 如果依赖数组为空，则返回的函数在组件生命周期内不会改变。
 */


import React, { useState, useCallback, memo } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  const resetCount = useCallback(() => setCount(0), [setCount]);

  return (
	<div>
	  <span>{count}</span>
	  <button onClick={() => setCount(count + 1)}>+1</button>
	  <Test resetCount={resetCount} />
	</div>
  );
}

function Test(props) {
  console.log('Test re-render');
  return (
	<div>
	  Test
	  <button onClick={props.resetCount}>reset</button>
	</div>
  );
}

export default memo(Test);