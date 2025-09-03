import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  login as loginAction,
  register as registerAction,
  logout as logoutAction,
} from "../redux/slices/authSlice";
import Swal from "sweetalert2";
import { authConstants } from "../constants/authConstants";
import { API_STATUS_CODES } from "../constants/apiConstants";
import { AuthContext } from "./AuthContextProvider";

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Handle unauthorized logout
  const handleUnauthorizedLogout = useCallback(() => {
    Swal.fire({
      title: authConstants.SESSION_EXPIRED_TITLE,
      text: authConstants.SESSION_EXPIRED_TEXT,
      icon: authConstants.ICON_WARNING,
      confirmButtonText: authConstants.CONFIRM_BUTTON_TEXT_OK,
    }).then(() => {
      localStorage.removeItem("accessToken");
      setUser(null);
      setIsAuthenticated(false);
      navigate("/login");
    });
  }, [navigate]); // Listen for unauthorized access events from axios
  useEffect(() => {
    const handleUnauthorizedEvent = () => {
      handleUnauthorizedLogout();
    };

    window.addEventListener("unauthorized-access", handleUnauthorizedEvent);

    return () => {
      window.removeEventListener(
        "unauthorized-access",
        handleUnauthorizedEvent
      );
    };
  }, [handleUnauthorizedLogout]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
    setLoading(false);
  }, [dispatch]);

  // Fungsi register
  const register = async (name, phone, email, address, password) => {
    try {
      const userData = { name, phone, email, address, password };

      const result = await dispatch(registerAction(userData));

      if (registerAction.fulfilled.match(result)) {
        // Check responseCode for success
        const responseCode = parseInt(result.payload?.responseCode);
        if (responseCode === API_STATUS_CODES.SUCCESS) {
          Swal.fire({
            title: "Registration Success!",
            text:
              result.payload?.responseMessage ||
              "Account created successfully. Please login to continue.",
            icon: authConstants.ICON_SUCCESS,
            confirmButtonText: authConstants.CONFIRM_BUTTON_TEXT_SUCCESS,
          }).then(() => {
            navigate("/login");
          });
        } else {
          throw new Error(
            result.payload?.responseMessage || "Registration failed"
          );
        }
      } else {
        // Handle rejected case
        const errorMessage =
          result.payload?.responseMessage ||
          result.payload?.message ||
          "Registration failed";
        throw new Error(errorMessage);
      }
    } catch (error) {
      // Handle validation errors specifically
      const errorResponseCode = parseInt(error.response?.data?.responseCode);
      if (
        errorResponseCode === API_STATUS_CODES.VALIDATION_ERROR &&
        error.response?.data?.errors
      ) {
        const errors = error.response.data.errors;
        let errorMessages = [];

        // Format error messages nicely
        Object.keys(errors).forEach((field) => {
          errorMessages.push(`${field}: ${errors[field]}`);
        });

        Swal.fire({
          title: "Validation Error",
          text: errorMessages.join("\n"),
          icon: authConstants.ICON_ERROR,
          confirmButtonText: authConstants.CONFIRM_BUTTON_TEXT_ERROR,
        });
      } else {
        // Handle other errors
        const errorMessage =
          error.response?.data?.responseMessage ||
          error.message ||
          "Registration failed. Please try again.";

        Swal.fire({
          title: "Registration Failed",
          text: errorMessage,
          icon: authConstants.ICON_ERROR,
          confirmButtonText: authConstants.CONFIRM_BUTTON_TEXT_ERROR,
        });
      }

      throw error;
    }
  };

  // Fungsi login
  const login = async (phone, password) => {
    try {
      const result = await dispatch(loginAction({ phone, password }));

      if (loginAction.fulfilled.match(result)) {
        // Check responseCode - convert string to number for comparison
        const responseCode = parseInt(result.payload?.responseCode);
        if (responseCode === API_STATUS_CODES.SUCCESS) {
          console.log("Login success!");

          setIsAuthenticated(true);
          setUser({ phone: result.payload?.phone });

          Swal.fire({
            title: authConstants.LOGIN_SUCCESS_TITLE,
            text:
              result.payload.responseMessage ||
              authConstants.LOGIN_SUCCESS_DEFAULT_MESSAGE,
            icon: authConstants.ICON_SUCCESS,
            confirmButtonText: authConstants.CONFIRM_BUTTON_TEXT_SUCCESS,
          }).then(() => {
            navigate("/");
          });
        } else {
          throw new Error(
            result.payload.responseMessage ||
              authConstants.LOGIN_FAILED_DEFAULT_MESSAGE
          );
        }
      } else {
        // Handle rejected case
        const errorMessage =
          result.payload?.responseMessage ||
          result.payload?.message ||
          authConstants.LOGIN_FAILED_DEFAULT_MESSAGE;
        throw new Error(errorMessage);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.responseMessage ||
        error.response?.data?.message ||
        error.message ||
        authConstants.ERROR_DEFAULT_MESSAGE;

      Swal.fire({
        title: authConstants.LOGIN_FAILED_TITLE,
        text: errorMessage,
        icon: authConstants.ICON_ERROR,
        confirmButtonText: authConstants.CONFIRM_BUTTON_TEXT_ERROR,
      });
    }
  };

  // Fungsi logout
  const logout = () => {
    Swal.fire({
      title: authConstants.LOGOUT_CONFIRMATION_TITLE,
      text: authConstants.LOGOUT_CONFIRMATION_TEXT,
      icon: authConstants.ICON_WARNING,
      showCancelButton: true,
      confirmButtonColor: authConstants.LOGOUT_CONFIRM_BUTTON_COLOR,
      cancelButtonColor: authConstants.LOGOUT_CANCEL_BUTTON_COLOR,
      confirmButtonText: authConstants.LOGOUT_CONFIRM_BUTTON_TEXT,
    }).then((result) => {
      if (result.isConfirmed) {
        // Dispatch logout action
        dispatch(logoutAction());

        localStorage.removeItem("accessToken");
        setIsAuthenticated(false);
        setUser(null);
        Swal.fire({
          title: authConstants.LOGOUT_SUCCESS_TITLE,
          text: authConstants.LOGOUT_SUCCESS_TEXT,
          icon: authConstants.ICON_SUCCESS,
          confirmButtonText: authConstants.CONFIRM_BUTTON_TEXT_SUCCESS,
        }).then(() => {
          navigate("/login");
        });
      }
    });
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        login,
        register,
        logout,
        handleUnauthorizedLogout,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
