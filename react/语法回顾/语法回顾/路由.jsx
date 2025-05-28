// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

function Index() {
  return <div>首页</div>;
}

function News() {
  return <div>新闻</div>;
}

function App() {
  return (
    <Router>
      <div>
        <Link to="/index">首页</Link>
        <Link to="/news">新闻</Link>
      </div>
      <div>
        <Route path="/index" component={Index} />
        <Route path="/news" component={News} />
      </div>
    </Router>
  );
}

export default App;




// Nested Routing Example
function News(props) {
  return (
    <div>
      <div>
        <Link to={`${props.match.url}/company`}>公司新闻</Link>
        <Link to={`${props.match.url}/industry`}>行业新闻</Link>
      </div>
      <div>
        <Route path={`${props.match.path}/company`} component={CompanyNews} />
        <Route path={`${props.match.path}/industry`} component={IndustryNews} />
      </div>

    </div>
  );
}

function CompanyNews() {
  return <div>公司新闻</div>;
}

function IndustryNews() {
  return <div>行业新闻</div>;
}