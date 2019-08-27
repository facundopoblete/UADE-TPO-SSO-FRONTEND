/* eslint react/prop-types: 0 */

import React from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import UsersPage from "./users/UsersPage";
import Header from "./common/Header";
import HomePage from "./HomePage";
import UserPage from "./users/UserPage";
import TenantSettingsPage from "./settings/tenantSettingsPage";
import * as StorageFunctions from "../utils/StorageFunctions";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/callback" component={Callback} />
          <PrivateRoute path="/logout" component={Logout} />
          <PrivateRoute path="/users" component={UsersPage} />
          <PrivateRoute path="/home" component={HomePage} />
          <PrivateRoute path="/settings" component={TenantSettingsPage} />
          <PrivateRoute path="/user/:id?" component={UserPage} />
          <PrivateRoute component={HomePage} />
        </Switch>
      </Router>
    </div>
  );
}

class Callback extends React.Component {
  componentDidMount() {
    StorageFunctions.SSO.saveUserToken();
    this.props.history.replace("/home");
  }

  render() {
    return <p>Loading profile...</p>;
  }
}

class Logout extends React.Component {
  async componentDidMount() {
    StorageFunctions.SSO.logout();
  }

  render() {
    return <></>;
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      return StorageFunctions.getUser() !== null ? (
        <>
          <Header />
          <Component {...props} />
        </>
      ) : (
        <Route
          render={() => {
            StorageFunctions.SSO.login();
            return <></>;
          }}
        />
      );
    }}
  />
);

export default App;
