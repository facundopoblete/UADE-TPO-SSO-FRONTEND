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

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <PrivateRoute path="/users" component={UsersPage} />
          <PrivateRoute path="/home" component={HomePage} />
          <PrivateRoute path="/users/:id?" component={UserPage} />
          <PrivateRoute component={HomePage} />
        </Switch>
      </Router>
    </div>
  );
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
        <Redirect to="/login" />
      );
    }}
  />
);

export default App;