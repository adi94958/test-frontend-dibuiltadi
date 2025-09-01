export const authConstants = {
  // Token & Storage Keys (based on Postman collection using 'token')
  TOKEN_KEY: "token",
  USER_KEY: "user",

  // SweetAlert Icons
  ICON_SUCCESS: "success",
  ICON_ERROR: "error",
  ICON_WARNING: "warning",
  ICON_INFO: "info",

  // SweetAlert Titles
  LOGIN_SUCCESS_TITLE: "Login Berhasil",
  LOGIN_FAILED_TITLE: "Login Gagal",
  ERROR_TITLE: "Error",
  SESSION_EXPIRED_TITLE: "Sesi Berakhir",
  LOGOUT_CONFIRMATION_TITLE: "Konfirmasi Logout",
  LOGOUT_SUCCESS_TITLE: "Logout Berhasil",
  REGISTER_SUCCESS_TITLE: "Registrasi Berhasil",

  // SweetAlert Text
  SESSION_EXPIRED_TEXT: "Sesi Anda telah berakhir. Silakan login kembali.",
  LOGOUT_CONFIRMATION_TEXT: "Apakah Anda yakin ingin logout?",
  LOGOUT_SUCCESS_TEXT: "Anda telah berhasil logout.",

  // SweetAlert Button Text
  CONFIRM_BUTTON_TEXT_OK: "OK",
  CONFIRM_BUTTON_TEXT_SUCCESS: "OK",
  CONFIRM_BUTTON_TEXT_ERROR: "OK",
  LOGOUT_CONFIRM_BUTTON_TEXT: "Ya, Logout",

  // Button Colors
  LOGOUT_CONFIRM_BUTTON_COLOR: "#3085d6",
  LOGOUT_CANCEL_BUTTON_COLOR: "#d33",

  // Custom Status Codes (based on your API specification)
  STATUS_SUCCESS: 20000,
  STATUS_UNAUTHORIZED: 40100,
  STATUS_FORBIDDEN: 40300,
  STATUS_NOT_FOUND: 40400,
  STATUS_VALIDATION_ERROR: 42200,
  STATUS_SERVER_ERROR: 50000,
};
