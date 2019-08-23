export async function saveUser(user) {
  localStorage.setItem("user", user);
}

export function getUser() {
  return localStorage.getItem("user");
}

export async function deleteUser() {
  localStorage.removeItem("user");
}
