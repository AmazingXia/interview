// userContext.js
import React from "react";
const userContext = React.createContext("默认值");
const UserProvider = userContext.Provider;
const UserConsumer = userContext.Consumer;
export { UserProvider, UserConsumer };

// App.js
import React, { Component } from "react";
import { UserProvider } from "./userContext";

class App extends Component {
  render() {
    return (
      <UserProvider value="Hello React Context">
        <A />
      </UserProvider>
    );
  }
}

// C.js
import React, { Component } from "react";
import { UserConsumer } from "./userContext";

export class C extends Component {
  render() {
    return (
      <div>
        <UserConsumer>
          {(username) => {
            return <div>{username}</div>;
          }}
        </UserConsumer>
      </div>
    );
  }
}
