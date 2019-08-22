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
  //let user = await StorageFunctions.getUser();
  
  let user = {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjYmE4MGEyYy0zMjNiLTRiN2ItOWM4Zi1hMDRjYTZkYjk3MmYiLCJuYmYiOjE1NjY0MjkzOTUsImV4cCI6MTU2NjQzMjk5NSwiaWF0IjoxNTY2NDI5Mzk1LCJpc3MiOiJVQURFIFNTTyIsImF1ZCI6ImQ0ZWYzYWY3YWMxYjQxZjM4YzExZjFiYWQyZDIxMzNmIn0.BnpgwLckU6i9NCMYKClTEDzHdrdUo_rGMfEFTzXtsH0"
  };

  if (user && user.token) {
    return { Authorization: "Bearer " + user.token };
  } else {
    return {};
  }
}
