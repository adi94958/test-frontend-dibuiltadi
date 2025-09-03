import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL || "https://sandbox.dibuiltadi.com",
  timeout: 60000, // 60 seconds
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Request Interceptor - Add token to headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor - Handle 401 unauthorized
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 unauthorized - logout user
    if (error.response?.status === 401) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userData");

      // Redirect ke login
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
