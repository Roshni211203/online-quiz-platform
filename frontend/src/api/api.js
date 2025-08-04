// filepath: [api.js](http://_vscodecontentref_/1)
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api/",
});

// Token set karne ka function
export function setAuthToken(token) {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Token ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
}

// Helper for public endpoints (no token)
export function apiPublic() {
  // Axios instance without Authorization header
  const instance = axios.create({
    baseURL: "http://localhost:8000/api/",
  });
  return instance;
}

export default api;