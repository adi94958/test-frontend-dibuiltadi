import {
  API_STATUS_CODES,
  isSuccessResponse,
  isErrorResponse,
} from "../constants/apiConstants";

// Helper function to handle API responses
export const handleApiResponse = (response) => {
  const { status, data, message, meta } = response.data;

  if (isSuccessResponse(status)) {
    return {
      success: true,
      status,
      data,
      message,
      // Include meta for paginated responses
      ...(meta && { meta }),
      // Include accessToken if present (for login)
      ...(response.data.accessToken && {
        accessToken: response.data.accessToken,
      }),
      // Include user if present (for login/profile)
      ...(response.data.user && { user: response.data.user }),
    };
  } else if (isErrorResponse(status)) {
    throw new Error(message || "API Error");
  }

  return response.data;
};

// Helper function to handle API errors
export const handleApiError = (error) => {
  if (error.response?.data) {
    const { status, message, errors } = error.response.data;

    // Handle specific error codes
    switch (status) {
      case API_STATUS_CODES.UNAUTHORIZED:
        throw new Error("Unauthorized access. Please login again.");
      case API_STATUS_CODES.FORBIDDEN:
        throw new Error("Access forbidden. You don't have permission.");
      case API_STATUS_CODES.NOT_FOUND:
        throw new Error("Resource not found.");
      case API_STATUS_CODES.VALIDATION_ERROR:
        throw new Error(
          errors
            ? Object.values(errors).flat().join(", ")
            : "Validation failed."
        );
      case API_STATUS_CODES.BAD_REQUEST:
        throw new Error(message || "Bad request.");
      case API_STATUS_CODES.SERVER_ERROR:
        throw new Error("Server error. Please try again later.");
      case API_STATUS_CODES.SERVICE_UNAVAILABLE:
        throw new Error("Service temporarily unavailable.");
      default:
        throw new Error(message || "An error occurred.");
    }
  }

  throw new Error(error.message || "Network error occurred.");
};
