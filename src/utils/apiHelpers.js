import { API_STATUS_CODES } from "../constants/apiConstants";

/**
 * Handle successful API responses
 * Backend format: { responseCode: "20000", responseMessage: "OK", accessToken: "...", ... }
 */
export const handleApiResponse = (response) => {
  try {
    const data = response.data;

    // Check if we have backend format with responseCode
    if (data.responseCode) {
      const code = parseInt(data.responseCode);

      if (code === API_STATUS_CODES.SUCCESS) {
        return data; // Return the full response for success
      } // For non-success codes, still return data but let caller handle
      return data;
    }

    // Fallback for other formats
    return data;
  } catch (error) {
    console.error("Error parsing API response:", error.message);
    return response.data;
  }
};

/**
 * Handle API errors consistently
 * Backend error format: { responseCode: "42200", responseMessage: "Error", errors: {...} }
 */
export const handleApiError = (error) => {
  try {
    // Network or other errors without response
    if (!error.response) {
      throw new Error("Network error. Please check your connection.");
    }

    const errorData = error.response.data;

    // Handle backend error format
    if (errorData.responseCode) {
      const code = parseInt(errorData.responseCode);

      // Handle validation errors with detailed messages
      if (code === API_STATUS_CODES.VALIDATION_ERROR && errorData.errors) {
        const validationMessages = Object.values(errorData.errors)
          .flat()
          .join(", ");

        const validationError = new Error(validationMessages);
        validationError.response = { data: errorData };
        throw validationError;
      }

      // Handle other error codes
      const message = errorData.responseMessage || getErrorMessage(code);
      const apiError = new Error(message);
      apiError.response = { data: errorData };
      throw apiError;
    }

    // Fallback for other error formats
    const message = errorData.message || "An error occurred";
    throw new Error(message);
  } catch (err) {
    // If error handling itself fails, throw original or new error
    if (err.response) {
      throw err; // Re-throw if it's our formatted error
    }
    throw new Error(error.message || "Unknown error occurred");
  }
};

/**
 * Get user-friendly error messages based on status codes
 */
const getErrorMessage = (code) => {
  switch (code) {
    case API_STATUS_CODES.UNAUTHORIZED:
      return "Please login to continue.";
    case API_STATUS_CODES.FORBIDDEN:
      return "You don't have permission to perform this action.";
    case API_STATUS_CODES.NOT_FOUND:
      return "The requested resource was not found.";
    case API_STATUS_CODES.BAD_REQUEST:
      return "Invalid request. Please check your input.";
    case API_STATUS_CODES.SERVER_ERROR:
      return "Server error. Please try again later.";
    case API_STATUS_CODES.SERVICE_UNAVAILABLE:
      return "Service is temporarily unavailable.";
    default:
      return "An unexpected error occurred.";
  }
};
