/* eslint react/prop-types: 0 */

import React from "react";
import {
  Route,
  Switch,
  BrowserRouter as Router,
  Redirect
} from "react-router-dom";
import UsersPage from "./users/UsersPage";
import Header from "./common/Header";
import HomePage from "./HomePage";
import UserPage from "./users/UserPage";
import * as StorageFunctions from "../utils/StorageFunctions";
import * as Configs from "../Configs"

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/callback" component={Callback} />
          <PrivateRoute path="/logout" component={Logout} />
          <PrivateRoute path="/users" component={UsersPage} />
          <PrivateRoute path="/home" component={HomePage} />
          <PrivateRoute path="/user/:id?" component={UserPage} />
          <PrivateRoute component={HomePage} />
        </Switch>
      </Router>
    </div>
  );
}

class Callback extends React.Component {
  async componentDidMount() {
      StorageFunctions.saveUser(window.location.hash);
      this.props.history.replace("/home");
  }

  render() {
      return <p>Loading profile...</p>;
  }
}

class Logout extends React.Component {
  async componentDidMount() {
  }

  render() {
    StorageFunctions.deleteUser();
    this.props.history.replace("/home");
    return <></>
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      return  StorageFunctions.getUser() !== null ? (
        <>
          <Header />
          <Component {...props} />
        </>
      ) : (
        <Route
      render={() => {
        window.location.replace(Configs.LoginUrl);
        return <></>;
      }}/>
      );
    }}
  />
);

export default App;