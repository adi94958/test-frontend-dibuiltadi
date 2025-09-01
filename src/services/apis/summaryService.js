import axiosInstance from "../axiosInstance";
import { handleApiResponse, handleApiError } from "../../utils/apiHelpers";

// Summary Service Functions
export const summaryService = {
  // Get Daily Transactions Summary
  getDailyTransactions: async (params = {}) => {
    try {
      const response = await axiosInstance.get("/api/v1/summaries/daily-transactions", { params });
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  },

  // Get Monthly Transactions Summary (using correct endpoint from documentation)
  getMonthlyTransactions: async (params = {}) => {
    try {
      const response = await axiosInstance.get("/api/v1/summaries/montly-transactions", { params });
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  },

  // Get Yearly Transactions Summary
  getYearlyTransactions: async (params = {}) => {
    try {
      const response = await axiosInstance.get("/api/v1/summaries/yearly-transactions", { params });
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  },

  // Get Top Customers Summary
  getTopCustomers: async (params = {}) => {
    try {
      const response = await axiosInstance.get("/api/v1/summaries/top-customers", { params });
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  },
};

// Individual export functions for backward compatibility
export const getDailyTransactionsSummary = summaryService.getDailyTransactions;
export const getMonthlyTransactionsSummary = summaryService.getMonthlyTransactions;
export const getYearlyTransactionsSummary = summaryService.getYearlyTransactions;
export const getTopCustomersSummary = summaryService.getTopCustomers;