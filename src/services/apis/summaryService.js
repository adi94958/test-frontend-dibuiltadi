import axiosInstance from "../axiosInstance";
import { handleApiResponse, handleApiError } from "../../utils/apiHelpers";

export const summaryService = {
  getDailyTransactions: async (params = {}) => {
    try {
      const response = await axiosInstance.get(
        "/api/v1/summaries/daily-transactions",
        { params }
      );
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  },

  getMonthlyTransactions: async (params = {}) => {
    try {
      const response = await axiosInstance.get(
        "/api/v1/summaries/monthly-transactions",
        { params }
      );
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  },

  getYearlyTransactions: async (params = {}) => {
    try {
      const response = await axiosInstance.get(
        "/api/v1/summaries/yearly-transactions",
        { params }
      );
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  },

  getTopCustomers: async (params = {}) => {
    try {
      const response = await axiosInstance.get(
        "/api/v1/summaries/top-customers",
        { params }
      );
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  },
};
