import axios from "axios";

const API =
  import.meta.env.VITE_API_URL || "https://github-backend-clone.onrender.com";

const axiosInstance = axios.create({
  baseURL: API,
});

// Token auto attach
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;