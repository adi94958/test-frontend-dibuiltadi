const messages = {
  name: {
    required: "Name is required",
    minLength: "Name must be at least 3 characters",
    maxLength: "Name must not exceed 50 characters",
  },

  identityNo: {
    maxLength: "Identity No must not exceed 30 characters",
  },

  npwp: {
    pattern: "NPWP can only contain numbers, dots, and dashes",
    minLength: "NPWP must be at least 15 characters",
    maxLength: "NPWP must not exceed 20 characters",
  },

  email: {
    invalid: "Invalid email format",
    minLength: "Email must be at least 3 characters",
    maxLength: "Email must not exceed 50 characters",
  },

  phone: {
    digitsOnly: "Phone number must contain digits only",
    minLength: "Phone number must be at least 7 digits",
    maxLength: "Phone number must not exceed 20 digits",
  },

  mobilePhone: {
    digitsOnly: "Mobile phone number must contain digits only",
    minLength: "Mobile phone number must be at least 7 digits",
    maxLength: "Mobile phone number must not exceed 20 digits",
  },

  provinceCode: {
    required: "Province is required",
  },

  cityCode: {
    required: "City is required",
  },

  address: {
    required: "Address is required",
    minLength: "Address must be at least 10 characters",
    maxLength: "Address must not exceed 200 characters",
  },

  companyType: {
    required: "Company type is required",
    invalid: "Company type must be either 'person' or 'company'",
  },
};

export default messages;
