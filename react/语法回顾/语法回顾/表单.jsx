// 受控表单指  的是表单元素的值由 React 组件的状态（state）来管理，而非受控表单则是由 DOM 元素本身来管理。下面是两种方式的示例。

// 4.2 非受控表单
// 表单元素的值由 DOM 元素本身管理。
import React, { Component } from 'react';

class App extends Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    console.log(this.username.value);
    e.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input type="text" ref={(username) => (this.username = username)} />
      </form>
    );
  }
}

export default App;