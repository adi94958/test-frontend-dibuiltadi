import axiosInstance from "../axiosInstance";
import { handleApiResponse, handleApiError } from "../../utils/apiHelpers";

// Customer Service Functions (Read-only as per API documentation)
export const customerService = {
  // Get All Customers with pagination and filters
  getCustomers: async (params = {}) => {
    try {
      const response = await axiosInstance.get("/api/v1/customers", { params });
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  },

  // Get Customer Detail by ID
  getCustomerDetail: async (id) => {
    try {
      const response = await axiosInstance.get(`/api/v1/customers/${id}`);
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  },
};

// Province Service Functions (Read-only as per API documentation)
export const provinceService = {
  // Get List of Provinces
  getProvinces: async () => {
    try {
      const response = await axiosInstance.get("/api/v1/provinces");
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  },
};

// City Service Functions (Read-only as per API documentation)
export const cityService = {
  // Get List of Cities
  getCities: async () => {
    try {
      const response = await axiosInstance.get("/api/v1/cities");
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  },
};

// Sales Service Functions (Read-only as per API documentation)
export const salesService = {
  // Get List of Sales
  getSales: async () => {
    try {
      const response = await axiosInstance.get("/api/v1/sales");
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  },
};

// Customer List Service Function (Read-only as per API documentation)
export const customerListService = {
  // Get Customer List (simple list for dropdowns)
  getCustomerList: async () => {
    try {
      const response = await axiosInstance.get("/api/v1/customer-list");
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  },
};

// Individual export functions for backward compatibility
export const getCustomers = customerService.getCustomers;
export const getCustomerDetail = customerService.getCustomerDetail;
export const getProvinces = provinceService.getProvinces;
export const getCities = cityService.getCities;
export const getSales = salesService.getSales;
export const getCustomerList = customerListService.getCustomerList;