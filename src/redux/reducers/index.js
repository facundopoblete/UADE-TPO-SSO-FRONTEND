import { combineReducers } from "redux";
import users from "./usersReducers";
import requests from "./requestReducers";
import machines from "./machineReducers";

const rootReducer = combineReducers({
  users,
  requests,
  machines
});

export default rootReducer;
