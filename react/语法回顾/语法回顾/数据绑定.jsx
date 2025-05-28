// 3.4.3 双向数据绑定
// 双向数据绑定是指，组件类中更新了状态，DOM状态同步更新，DOM 更改了状态，组件类中同步更新。组件＜=>视图。
// 要实现双向数据绑定需要用到表单元素和 state 状态对象。

import React, { Component } from 'react';

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: "张三"
    };
    this.nameChanged = this.nameChanged.bind(this);
  }

  nameChanged(event) {
    this.setState({ name: event.target.value });
  }

  render() {
    return (
      <div>
        <div>{this.state.name}</div>
        <Person name={this.state.name} changed={this.nameChanged} />
      </div>
    );
  }
}

const Person = (props) => {
  return <input type="text" value={props.name} onChange={props.changed} />;
};

export default App;