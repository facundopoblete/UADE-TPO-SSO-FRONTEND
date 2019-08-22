import * as actionTypes from "../actions/actionTypes";

export default function requestReduxReducer(state = 0, action) {
  switch (action.type) {
    case actionTypes.NEW_REQUEST:
      return state + 1;
    case actionTypes.FINISH_REQUEST:
    case actionTypes.GET_USERS_FAIL:
    case actionTypes.GET_USERS_SUCCESS:
      return state - 1;
    default:
      return state;
  }
}
