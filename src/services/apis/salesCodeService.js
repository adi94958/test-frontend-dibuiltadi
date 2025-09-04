import axiosInstance from "../axiosInstance";
import { handleApiResponse, handleApiError } from "../../utils/apiHelpers";

export const salesService = {
  getSales: async () => {
    try {
      const response = await axiosInstance.get("/api/v1/sales/list");
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  },
};
