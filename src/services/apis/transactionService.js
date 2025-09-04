import axiosInstance from "../axiosInstance";
import { handleApiResponse, handleApiError } from "../../utils/apiHelpers";

// Transaction Service Functions
export const transactionService = {
  // Get All Transactions with pagination and filters
  getAll: async (params = {}) => {
    try {
      const response = await axiosInstance.get("/api/v1/transactions", {
        params,
      });
      return handleApiResponse(response);
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Get Transaction Detail by Reference No
  getDetail: async (referenceNo) => {
    try {
      const response = await axiosInstance.get(
        `/api/v1/transactions/${referenceNo}`
      );
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  },
};
