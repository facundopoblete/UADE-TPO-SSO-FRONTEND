import { handleResponse, handleError, authHeader } from "./apiUtils";
import { BaseUrl } from "./ApiConfig";
const baseUrl = BaseUrl + "/api/machine";

export async function getMachines() {
  try {
    const response = await fetch(baseUrl, {
      headers: await authHeader()
    });
    return await handleResponse(response);
  } catch (ex) {
    handleError(ex);
  }
}

export async function deleteMachine(machine) {
  try {
    const response = await fetch(baseUrl + "/" + machine.id, {
      headers: await authHeader(),
      method: "DELETE"
    });
    return await handleResponse(response);
  } catch (ex) {
    handleError(ex);
  }
}

export async function createMachine(machine) {
  try {
    const response = await fetch(baseUrl, {
      method: "POST",
      body: JSON.stringify({
        name: machine.name
      }),
      headers: { "Content-Type": "application/json", ...(await authHeader()) }
    });
    return await handleResponse(response);
  } catch (ex) {
    handleError(ex);
  }
}
