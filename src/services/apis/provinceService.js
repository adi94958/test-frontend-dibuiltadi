import axiosInstance from "../axiosInstance";
import { handleApiResponse, handleApiError } from "../../utils/apiHelpers";

export const provinceService = {
  getProvinces: async () => {
    try {
      const response = await axiosInstance.get("/api/v1/provinces/list");
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  },
};
