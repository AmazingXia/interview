import React, { Component } from 'react';
import React, { useState } from 'react';

// React类组件的不足

// 1. 状态逻辑复用困难
// 类组件中状态逻辑通常分散在不同的方法中，难以复用和共享逻辑。
// 解决方案：使用函数组件和自定义Hook，可以更方便地复用状态逻辑。

// 2. 代码冗长
// 类组件需要编写构造函数、绑定this等，代码显得冗长。
// 解决方案：函数组件更加简洁，避免了this的使用。

// 3. this指向问题
// 类组件中需要手动绑定this，容易出现this指向错误的问题。
// 解决方案：函数组件没有this问题，使用箭头函数也可以避免。

// 4. 生命周期复杂
// 类组件的生命周期方法较多，容易混淆，且某些逻辑需要拆分到不同生命周期中。   一个生命周期函数  里面存在多个副作用逻辑，难以管理。
// 解决方案：函数组件通过useEffect统一管理副作用逻辑，更加直观。

// 5. 难以优化
// 类组件中shouldComponentUpdate需要手动实现，优化难度较大。
// 解决方案：函数组件可以使用React.memo和useMemo等工具更方便地优化性能。

// 示例对比
// 类组件

class ClassComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ count: this.state.count + 1 });
  }

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.handleClick}>Increment</button>
      </div>
    );
  }
}

// 函数组件

function FunctionComponent() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

export { ClassComponent, FunctionComponent };