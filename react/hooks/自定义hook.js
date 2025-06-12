import React, { useState } from 'react';

// 需要用到共享的逻辑的时候
// 就是一堆 业务逻辑 和  内置hook的 组合  函数名称use开头


// 渲染属性（Render Props）示例

function Counter({ render }) {
  const [count, setCount] = useState(0);

  return (
    <div>
      {render(count, () => setCount(count + 1))}
    </div>
  );
}

function AppWithRenderProps() {
  return (
    <Counter
      render={(count, increment) => (
        <div>
          <p>Count: {count}</p>
          <button onClick={increment}>Increment</button>
        </div>
      )}
    />
  );
}

// 高阶组件（Higher-Order Component, HOC）示例
function withCounter(WrappedComponent) {
  return function EnhancedComponent(props) {
    const [count, setCount] = useState(0);

    const increment = () => setCount(count + 1);

    return (
      <WrappedComponent
        count={count}
        increment={increment}
        {...props}
      />
    );
  };
}

function DisplayCounter({ count, increment }) {
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}

const EnhancedDisplayCounter = withCounter(DisplayCounter);

function AppWithHOC() {
  return <EnhancedDisplayCounter />;
}

export { AppWithRenderProps, AppWithHOC };


// 类组件中的渲染属性（Render Props）示例
class CounterWithRenderProps extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  increment = () => {
    this.setState((prevState) => ({ count: prevState.count + 1 }));
  };

  render() {
    return (
      <div>
        {this.props.render(this.state.count, this.increment)}
      </div>
    );
  }
}

class AppWithClassRenderProps extends React.Component {
  render() {
    return (
      <CounterWithRenderProps
        render={(count, increment) => (
          <div>
            <p>Count: {count}</p>
            <button onClick={increment}>Increment</button>
          </div>
        )}
      />
    );
  }
}

// 类组件中的高阶组件（Higher-Order Component, HOC）示例
function withClassCounter(WrappedComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = { count: 0 };
    }

    increment = () => {
      this.setState((prevState) => ({ count: prevState.count + 1 }));
    };

    render() {
      return (
        <WrappedComponent
          count={this.state.count}
          increment={this.increment}
          {...this.props}
        />
      );
    }
  };
}

class DisplayClassCounter extends React.Component {
  render() {
    const { count, increment } = this.props;
    return (
      <div>
        <p>Count: {count}</p>
        <button onClick={increment}>Increment</button>
      </div>
    );
  }
}

const EnhancedDisplayClassCounter = withClassCounter(DisplayClassCounter);

class AppWithClassHOC extends React.Component {
  render() {
    return <EnhancedDisplayClassCounter />;
  }
}

export { AppWithClassRenderProps, AppWithClassHOC };