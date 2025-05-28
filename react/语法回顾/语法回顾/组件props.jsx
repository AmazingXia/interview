// 11 函数组件
const Person = props => {
  return (
    <div>
      <h3>姓名：{props.name}</h3>
      <h4>年龄：{props.age}</h4>
    </div>
  );
}


function ThemedButton(props) {
}
ThemedButton.defaultProps = {
  theme: "secondary", label: "Button Text"
}



class App extends Component {
  static defaultProps = {}
}


import React, { Component } from 'react';

class App extends Component {
  constructor() {
    super();
    this.state = {
      person: {
        name: "张三",
        age: 20
      }
    };
    this.changePerson = this.changePerson.bind(this);
  }

  changePerson() {
    this.setState({
      person: {
        name: "李四",
        age: 15
      }
    });
  }

  render() {
    return (
      <div>
        <h3>{this.state.person.name}</h3>
        <h4>{this.state.person.age}</h4>
        <button onClick={this.changePerson}>Change Person</button>
      </div>
    );
  }
}

