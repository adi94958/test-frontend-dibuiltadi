import axiosInstance from "../axiosInstance";
import { handleApiResponse, handleApiError } from "../../utils/apiHelpers";

export const transactionService = {
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
