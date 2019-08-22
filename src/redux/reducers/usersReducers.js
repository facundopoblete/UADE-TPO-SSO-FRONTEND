import * as actionTypes from "../actions/actionTypes";

export default function productosReduxReducer(state = [], action) {
  switch (action.type) {
    case actionTypes.GET_USERS_SUCCESS:
      return [...action.users];
    case actionTypes.GET_USERS_FAIL:
      return [];
    case actionTypes.DELETE_USER_SUCCESS:
      var users = [...state];
      users = users.filter(x => x.id != action.user.id);
      return users;
    default:
      return state;
  }
}
