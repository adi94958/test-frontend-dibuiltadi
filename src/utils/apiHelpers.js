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
    const networkError = new Error("Network error. Please check your connection.");
    return networkError;
  }

  const { status, data } = error.response;
  const message =
    data?.responseMessage ||
    data?.message ||
    (data?.errors ? Object.values(data.errors).flat().join(", ") : null) ||
    "An unexpected error occurred.";

  const apiError = new Error(message);
  apiError.response = { status, data };
  return apiError;
};
