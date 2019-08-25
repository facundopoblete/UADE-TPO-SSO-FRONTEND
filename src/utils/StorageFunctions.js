export async function saveUser(jwt) {
  localStorage.setItem("user", jwt);
}

export function getUser() {
  return localStorage.getItem("user");
}

export async function deleteUser() {
  localStorage.removeItem("user");
}
