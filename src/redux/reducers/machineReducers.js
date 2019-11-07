import * as actionTypes from "../actions/actionTypes";

export default function machineReduxReducer(state = [], action) {
  switch (action.type) {
    case actionTypes.CREATE_MACHINE_SUCCESS:
      return [...state].concat(action.machine);
    case actionTypes.GET_MACHINES_SUCCESS:
      return [...action.machines];
    case actionTypes.GET_MACHINES_FAIL:
      return [];
    case actionTypes.DELETE_MACHINE_SUCCESS:
      var machines = [...state];
      machines = machines.filter(x => x.id != action.machine.id);
      return machines;
    default:
      return state;
  }
}
