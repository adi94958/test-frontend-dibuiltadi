const messages = {
  name: {
    required: "Name is required",
    minLength: "Name must be at least 3 characters",
    maxLength: "Name must not exceed 50 characters",
  },

  email: {
    required: "Email is required",
    invalid: "Invalid email format",
    minLength: "Email must be at least 3 characters",
    maxLength: "Email must not exceed 50 characters",
  },

  phone: {
    digitsOnly: "Phone number must contain digits only",
    required: "Phone number is required",
    minLength: "Phone number must be at least 7 digits",
    maxLength: "Phone number must not exceed 20 digits",
  },

  address: {
    required: "Address is required",
    minLength: "Address must be at least 3 characters",
    maxLength: "Address must not exceed 50 characters",
  },

  password: {
    required: "Password is required",
    minLength: "Password must be at least 8 characters",
    maxLength: "Password must not exceed 50 characters",
  },

  currentPassword: {
    required: "Current password is required",
    minLength: "Current password must be at least 8 characters",
    maxLength: "Current password must not exceed 50 characters",
  },

  newPassword: {
    required: "New password is required",
    minLength: "New password must be at least 8 characters",
    maxLength: "New password must not exceed 50 characters",
    pattern:
      "New password must contain at least one uppercase letter, one lowercase letter, and one number",
  },

  confirmPassword: {
    required: "Please confirm your new password",
    mismatch: "Passwords do not match",
  },
};

export default messages;
