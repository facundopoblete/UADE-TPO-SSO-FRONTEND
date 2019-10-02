import { handleResponse, handleError, authHeader } from "./apiUtils";
import { BaseUrl } from "./ApiConfig";
const baseUrl = BaseUrl + "/api/Users";

export async function getUser(id) {
  try {
    const response = await fetch(baseUrl + "/" + id, {
      headers: await authHeader()
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

export async function updateUser(user) {
  try {
    const response = await fetch(baseUrl + "/" + user.id, {
      method: "PUT",
      body: JSON.stringify({
        fullName: user.fullName,
        metadata: user.metadata,
        extraClaims: user.extraClaims,
      }),
      headers: { "Content-Type": "application/json", ...(await authHeader()) }
    });
    return await handleResponse(response);
  } catch (ex) {
    handleError(ex);
  }
}

export async function createUser(user) {
  try {
    const response = await fetch(baseUrl, {
      method: "POST",
      body: JSON.stringify({
        fullName: user.fullName,
        email: user.email,
        password: user.password
      }),
      headers: { "Content-Type": "application/json", ...(await authHeader()) }
    });
    return await handleResponse(response);
  } catch (ex) {
    handleError(ex);
  }
}
