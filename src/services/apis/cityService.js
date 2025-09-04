import axiosInstance from "../axiosInstance";
import { handleApiResponse, handleApiError } from "../../utils/apiHelpers";

export const cityService = {
  getCities: async () => {
    try {
      const response = await axiosInstance.get("/api/v1/cities/list");
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  },
};
