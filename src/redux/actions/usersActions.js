import * as actionTypes from "./actionTypes";
import * as usersApi from "../../api/usersApi";
import * as requestActions from "./requestActions";

export function getUserSuccess(user) {
  return { type: actionTypes.GET_USER_SUCCESS, user };
}

export function getUserFail() {
  return { type: actionTypes.GET_USER_FAIL };
}

export function getUsersSuccess(users) {
  return { type: actionTypes.GET_USERS_SUCCESS, users };
}

export function getUsersFail() {
  return { type: actionTypes.GET_USERS_FAIL };
}

export function createUserSuccess(user) {
  return { type: actionTypes.CREATE_USER_SUCCESS, user };
}

export function createUserFail() {
  return { type: actionTypes.CREATE_USER_FAIL };
}

export function deleteUserSuccess(user) {
  return { type: actionTypes.DELETE_USER_SUCCESS, user };
}

export function deleteUserFail() {
  return { type: actionTypes.DELETE_USER_FAIL };
}

export function getUser(id) {
  return async function(dispatch) {
    try {
      let user = await usersApi.getUser(id);
      dispatch(getUserSuccess(user));
    } catch {
      dispatch(getUserFail());
    }
  };
}

export function getUsers() {
  return async function(dispatch) {
    try {
      const users = await usersApi.getUsers();
      dispatch(getUsersSuccess(users));
    } catch {
      dispatch(getUserFail());
    }
  };
}

export function createUser(user) {
  return async function(dispatch) {
    dispatch(requestActions.informNewRequest());
    try {
      let newUser = await usersApi.createUser(user.id);
      dispatch(deleteUserSuccess(newUser));
    } catch {
      dispatch(createUserFail());
    }
  };
}

export function deleteUser(user) {
  return async function(dispatch) {
    dispatch(requestActions.informNewRequest());
    try {
      await usersApi.deleteUser(user.id);
      dispatch(deleteUserSuccess(user));
    } catch {
      dispatch(deleteUserFail());
    }
  };
}
