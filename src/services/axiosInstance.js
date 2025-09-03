// src/services/axiosInstance.js
import axios from "axios";
import { API_STATUS_CODES, isErrorResponse } from "../constants/apiConstants";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL || "https://sandbox.dibuiltadi.com",
  timeout: 60000, // 60 seconds
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Set default headers
    config.headers["Accept"] = "application/json";
    
    // Set default Content-Type jika tidak ada
    if (!config.headers["Content-Type"]) {
      config.headers["Content-Type"] = "application/json";
    }

    // Ambil token dari localStorage
    const token = localStorage.getItem("accessToken");
    if (token) {
      // Tambahkan Bearer prefix jika belum ada
      config.headers.Authorization = token.startsWith('Bearer ') ? token : `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Check custom status codes in response data
    const customStatus = response.data?.status;
    
    // If custom status indicates error, treat as error
    if (customStatus && isErrorResponse(customStatus)) {
      const error = new Error(response.data.message || "API Error");
      error.response = {
        ...response,
        status: customStatus,
        data: response.data
      };
      return Promise.reject(error);
    }
    
    return response;
  },
  (error) => {
    // Check for custom status codes
    const customStatus = error.response?.data?.status || error.response?.status;
    
    // Handle unauthorized access - tapi jangan terlalu agresif
    if (customStatus === API_STATUS_CODES.UNAUTHORIZED || error.response?.status === 401) {
      // Hanya clear token jika benar-benar unauthorized (bukan error sementara)
      const isRealUnauthorized = 
        error.response?.data?.responseCode === '40100' || // Custom unauthorized code
        error.response?.data?.message?.toLowerCase().includes('unauthorized') ||
        error.response?.data?.message?.toLowerCase().includes('token');
      
      if (isRealUnauthorized) {
        // Clear localStorage
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userData");
        
        // Trigger logout (will be handled by AuthContext)
        window.dispatchEvent(new CustomEvent('unauthorized-access'));
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
