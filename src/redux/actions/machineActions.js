import * as actionTypes from "./actionTypes";
import * as machinesApi from "../../api/machineApi";
import * as requestActions from "./requestActions";

export function getMachinesSuccess(machines) {
  return { type: actionTypes.GET_MACHINES_SUCCESS, machines };
}

export function getMachinesFail() {
  return { type: actionTypes.GET_MACHINES_FAIL };
}

export function createMachineSuccess(machine) {
  return { type: actionTypes.CREATE_MACHINE_SUCCESS, machine };
}

export function createMachineFail() {
  return { type: actionTypes.CREATE_MACHINE_FAIL };
}

export function deleteMachineSuccess(machine) {
  return { type: actionTypes.DELETE_MACHINE_SUCCESS, machine };
}

export function deleteMachineFail() {
  return { type: actionTypes.DELETE_MACHINE_FAIL };
}

export function getMachines() {
  return async function(dispatch) {
    try {
      const machines = await machinesApi.getMachines();
      dispatch(getMachinesSuccess(machines));
    } catch {
      dispatch(getMachinesFail());
    }
  };
}

export function createMachine(machine) {
  return async function(dispatch) {
    dispatch(requestActions.informNewRequest());
    try {
      let newUser = await machinesApi.createMachine(machine);
      dispatch(createMachineSuccess(newUser));
    } catch (e) {
      dispatch(createMachineFail());
    }
  };
}

export function deleteMachine(machine) {
  return async function(dispatch) {
    dispatch(requestActions.informNewRequest());
    try {
      await machinesApi.deleteMachine(machine);
      dispatch(deleteMachineSuccess(machine));
    } catch (e) {
      dispatch(deleteMachineFail());
    }
  };
}
