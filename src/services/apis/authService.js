import axiosInstance from "../axiosInstance";
import { handleApiResponse, handleApiError } from "../../utils/apiHelpers";

export const authService = {
  register: async (userData) => {
    try {
      const response = await axiosInstance.post(
        "/api/v1/auth/register",
        userData
      );
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  },

  login: async (phone, password) => {
    try {
      const response = await axiosInstance.post("/api/v1/auth/login", {
        phone,
        password,
      });
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  },

  logout: async () => {
    try {
      const response = await axiosInstance.post("/api/v1/auth/logout");
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  },

  getProfile: async () => {
    try {
      const response = await axiosInstance.get("/api/v1/auth/profile");
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  },

  updatePassword: async (
    currentPassword,
    newPassword,
    newPasswordConfirmation
  ) => {
    try {
      const response = await axiosInstance.put("/api/v1/auth/password", {
        currentPassword,
        newPassword,
        newPasswordConfirmation,
      });
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  },
};
