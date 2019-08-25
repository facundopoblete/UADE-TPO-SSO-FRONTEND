import * as StorageFunctions from "../utils/StorageFunctions";

export async function handleResponse(response) {
  if (response.ok) {
    if (response.headers.get("content-type") === null) {
      return;
    }
    return response.json();
  }
  if (response.status === 400) {
    const error = await response.text();
    throw new Error(error);
  }

  const jsonResponse = await response.json();
  throw new Error(jsonResponse.message);
}

export function handleError(error) {
  console.error("API call failed. " + error);
  throw error;
}

export async function authHeader() {
  let jwt = StorageFunctions.getUser();

  if (jwt) {
    return { Authorization: "Bearer " + jwt };
  } else {
    return {};
  }
}
