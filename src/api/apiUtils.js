import * as StorageFunctions from "../utils/StorageFunctions";

export async function handleResponse(response) {
  if (response.ok) {
    if (response.headers.get("content-type") === null) {
      return;
    }
    var text = await response.text();

    if (text.length > 0) return JSON.parse(text);
    return {}
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
