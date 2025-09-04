import axiosInstance from "../axiosInstance";
import { handleApiResponse, handleApiError } from "../../utils/apiHelpers";

export const customerService = {
  getCustomers: async (params = {}) => {
    try {
      const response = await axiosInstance.get("/api/v1/customers", { params });
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  },

  getCustomerDetail: async (id) => {
    try {
      const response = await axiosInstance.get(`/api/v1/customers/${id}`);
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  },
};

export const customerListService = {
  getCustomerList: async () => {
    try {
      const response = await axiosInstance.get("/api/v1/customers/list");
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  },
};

export const storeCustomer = {
  storeCustomer: async (customerData) => {
    try {
      const response = await axiosInstance.post(
        "/api/v1/customers",
        customerData
      );
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  },
};
