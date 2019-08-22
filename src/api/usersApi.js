import { handleResponse, handleError, authHeader } from "./apiUtils";
import { BaseUrl } from "./ApiConfig";
const baseUrl = BaseUrl + "/api/Users";

export async function getUser(user) {
  try {
    const response = await fetch(baseUrl + "/" + user.id, {
      headers: await authHeader(),
    });
    return await handleResponse(response);
  } catch (ex) {
    handleError(ex);
  }
}

export async function getUsers() {
  try {
    const response = await fetch(baseUrl, {
      headers: await authHeader()
    });
    return await handleResponse(response);
  } catch (ex) {
    handleError(ex);
  }
}

export async function deleteUser(user) {
  try {
    const response = await fetch(baseUrl + "/" + user.id, {
      headers: await authHeader(),
      method: "DELETE"
    });
    return await handleResponse(response);
  } catch (ex) {
    handleError(ex);
  }
}

export async function createUser(user) {
  try {
    const response = await fetch(baseUrl, {
      headers: await authHeader()
    });
    return await handleResponse(response);
  } catch (ex) {
    handleError(ex);
  }
}