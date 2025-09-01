// API Response Types and Constants
export const API_STATUS_CODES = {
  // Success codes
  SUCCESS: 20000,
  CREATED: 20100,
  
  // Client error codes  
  BAD_REQUEST: 40000,
  UNAUTHORIZED: 40100,
  FORBIDDEN: 40300,
  NOT_FOUND: 40400,
  VALIDATION_ERROR: 42200,
  
  // Server error codes
  SERVER_ERROR: 50000,
  SERVICE_UNAVAILABLE: 50300
};

// Expected API Response Structure
export const API_RESPONSE_STRUCTURE = {
  // Standard success response
  SUCCESS_RESPONSE: {
    status: 20000,
    message: "Success",
    data: {} // Actual data
  },
  
  // Standard error response  
  ERROR_RESPONSE: {
    status: 40000, // Error code
    message: "Error message",
    errors: {} // Validation errors if any
  },
  
  // Auth login response
  LOGIN_RESPONSE: {
    status: 20000,
    message: "Login successful",
    accessToken: "Bearer token here",
    user: {
      // User data
    }
  },
  
  // Paginated response
  PAGINATED_RESPONSE: {
    status: 20000,
    message: "Success",
    data: [], // Array of items
    meta: {
      current_page: 1,
      per_page: 10,
      total: 100,
      last_page: 10,
      from: 1,
      to: 10
    }
  }
};

// Helper function to check if response is successful
export const isSuccessResponse = (status) => {
  return status >= 20000 && status < 30000;
};

// Helper function to check if response is error
export const isErrorResponse = (status) => {
  return status >= 40000 || status < 20000;
};
