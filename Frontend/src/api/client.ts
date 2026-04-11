import axios from "axios";
import { useAuthStore } from "../stores/authStore";

export const api = axios.create({
  // baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
  baseURL: import.meta.env.VITE_API_URL || "https://eatly-backend-divt.onrender.com/api",
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const logout = useAuthStore.getState().logout;
      logout();

      
      const path = window.location.pathname;
      if (path !== "/login" && path !== "/signup" && path !== "/") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  },
);

export const apiGet = api.get;
export const apiPost = api.post;
export const apiPatch = api.patch;
export const apiDelete = api.delete;
