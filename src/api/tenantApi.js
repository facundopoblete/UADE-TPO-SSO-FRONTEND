import { handleResponse, handleError, authHeader } from "./apiUtils";
import { BaseUrl } from "./ApiConfig";
const baseUrl = BaseUrl + "/api/tenant";

export async function getTenant() {
  try {
    const response = await fetch(baseUrl, {
      headers: await authHeader()
    });
    return await handleResponse(response);
  } catch (ex) {
    handleError(ex);
  }
}

export async function createNewTenant(name) {
  try {
    alert(baseUrl);
    const response = await fetch(baseUrl, {
      method: "POST",
      body: JSON.stringify({ name }),
      headers: { "Content-Type": "application/json", ...(await authHeader()) }
    });
    return await handleResponse(response);
  } catch (ex) {
    handleError(ex);
  }
}
