import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "api/v1/",
  timeout: 30000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const userAuth = getUserAuth();
  if (userAuth) {
    config.headers["Authorization"] = `Bearer ${userAuth.accessToken}`;
  }
  return config;
});

export const getUserAuth = () => {
  const accessToken = Cookies.get("accessToken") || "";
  const refreshToken = Cookies.get("refreshToken") || "";
  return { accessToken, refreshToken };
};

export default api;
