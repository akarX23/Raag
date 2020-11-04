import axios from "axios";

import { LOGIN, AUTH, LOGOUT } from "../ACTION_TYPES";

export async function auth() {
  const request = await axios
    .get("/api/auth")
    .then((response) => response.data);

  return {
    type: AUTH,
    payload: request,
  };
}

export async function login(credentials) {
  const request = await axios
    .post("/api/login", credentials)
    .then((response) => response.data);

  return {
    type: LOGIN,
    payload: request,
  };
}

export async function logout() {
  const request = await axios
    .get("/api/logout")
    .then((response) => response.data);

  return {
    type: LOGOUT,
    payload: request,
  };
}
