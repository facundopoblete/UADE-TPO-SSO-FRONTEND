import { combineReducers } from "redux";
import users from "./usersReducers";
import requests from "./requestReducers";

const rootReducer = combineReducers({
  users,
  requests
});

export default rootReducer;
