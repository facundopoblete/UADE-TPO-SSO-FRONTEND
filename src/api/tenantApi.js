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

export async function updateTenant(tenant) {
  try {
    const response = await fetch(baseUrl, {
      method: "PUT",
      body: JSON.stringify({
        name: tenant.name,
        jwtSigningKey: tenant.jwtSigningKey,
        jwtDuration: tenant.jwtDuration,
        allowPublicUsers: tenant.allowPublicUsers
      }),
      headers: { "Content-Type": "application/json", ...(await authHeader()) }
    });
    return await handleResponse(response);
  } catch (ex) {
    handleError(ex);
  }
}

export async function createNewTenant(name) {
  try {
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
