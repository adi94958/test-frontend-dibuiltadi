export const handleApiResponse = (response) => {
  const data = response.data || {};

  if (data.responseCode) {
    const code = parseInt(data.responseCode);

    if (code === 20000) {
      return data;
    }

    throw new Error(data.responseMessage || "Request failed");
  }

  return data;
};

export const handleApiError = (error) => {
  if (!error.response) {
    const networkError = new Error(
      "Network error. Please check your connection."
    );
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
