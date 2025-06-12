

//
// useReducer 和 useState 都是 React 中用于管理组件状态的 Hook，但它们适用于不同的场景。以下是它们的区别和使用场景：

// 区别
// 状态管理的复杂度：

// useState：适用于简单的状态管理，例如单一变量或少量状态更新逻辑。
// useReducer：适用于复杂的状态管理，尤其是当状态更新逻辑涉及多个步骤或依赖于当前状态时。
// 更新逻辑的组织方式：

// useState：直接通过 setter 函数更新状态。
// useReducer：通过 reducer 函数（类似于 Redux 中的 reducer）来定义状态更新逻辑，使用 dispatch 触发状态更新。
// 可读性和可维护性：

// useState：简单直观，适合小型组件。
// useReducer：将状态更新逻辑集中在 reducer 函数中，便于管理复杂逻辑。


// 可以把dispatch 传给子组件  直接修改  不需要子组件重新定义state 和 setState

import React, { useReducer } from 'react';

const initialState = { count: 0 };

function reducer(state, action) {
    switch (action.type) {
        case 'increment':
            return { count: state.count + 1 };
        case 'decrement':
            return { count: state.count - 1 };
        default:
            throw new Error();
    }
}

function Counter() {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <div>
            <p>Count: {state.count}</p>
            <button onClick={() => dispatch({ type: 'increment' })}>Increment</button>
            <button onClick={() => dispatch({ type: 'decrement' })}>Decrement</button>
        </div>
    );
}