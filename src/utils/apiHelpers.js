import { API_STATUS_CODES } from "../constants/apiConstants";

/**
 * Handle API response
 */
export const handleApiResponse = (response) => {
  const data = response.data || {};

  // Kalau backend pakai responseCode
  if (data.responseCode) {
    const code = parseInt(data.responseCode);

    if (code === API_STATUS_CODES.SUCCESS) {
      return data;
    }

    // Kalau bukan success, tetap return untuk di-handle di thunk
    throw new Error(data.responseMessage || "Request failed");
  }

  return data;
};

/**
 * Handle API error
 */
export const handleApiError = (error) => {
  if (!error.response) {
    // Tidak ada respon → jaringan error
    return new Error("Network error. Please check your connection.");
  }

  const errorData = error.response.data || {};
  const code = parseInt(errorData.responseCode);

  // Kalau ada errorMessage dari backend → pakai itu
  const message =
    errorData.responseMessage ||
    errorData.message ||
    getErrorMessage(code) ||
    "An unexpected error occurred.";

  // Buat Error object dengan data asli biar bisa dipakai di Redux
  const apiError = new Error(message);
  apiError.response = { data: errorData };
  return apiError;
};

/**
 * Default error messages by code
 */
const getErrorMessage = (code) => {
  switch (code) {
    case API_STATUS_CODES.UNAUTHORIZED:
      return "Please login to continue.";
    case API_STATUS_CODES.FORBIDDEN:
      return "You don’t have permission to perform this action.";
    case API_STATUS_CODES.NOT_FOUND:
      return "The requested resource was not found.";
    case API_STATUS_CODES.BAD_REQUEST:
      return "Invalid request. Please check your input.";
    case API_STATUS_CODES.SERVER_ERROR:
      return "Server error. Please try again later.";
    case API_STATUS_CODES.SERVICE_UNAVAILABLE:
      return "Service is temporarily unavailable.";
    default:
      return null;
  }
};
