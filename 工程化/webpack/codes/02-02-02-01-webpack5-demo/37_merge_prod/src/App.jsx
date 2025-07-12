import React, {Component} from 'react'
import {BrowserRouter, Link, Route} from 'react-router-dom'
import Home from '@/components/Home'
import About from '@/components/About'

class App extends Component{
  constructor(props){
    super(props)
    this.state = {
      title: '前端'
    }
  }
  render(){
    return (
      <div>
        <h2>{this.state.title}</h2>
        <BrowserRouter>
          <Link to='/home'>首页</Link>
          <Link to='/about'>关于</Link>

          <Route path="/home" component={Home}></Route>
          <Route path="/about" component={About}></Route>

        </BrowserRouter>
      </div>
    )
  }
}

export default App
