// AuthContext.jsx
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login as authLogin, logoutUser, getProfile } from "../redux/slices/authSlice";
import Swal from "sweetalert2";
import { jwtDecode } from "jwt-decode";
import { authConstants } from "../constants/authConstants";
import { authMessages } from "../messages/authMessages";
import { API_STATUS_CODES } from "../constants/apiConstants";
import { AuthContext } from "./AuthContextProvider";

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Fungsi untuk mengecek apakah token sudah expired
  const isTokenExpired = (token) => {
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken.exp * 1000 < Date.now();
    } catch {
      return true;
    }
  };

  // Handle unauthorized logout
  const handleUnauthorizedLogout = useCallback(() => {
    Swal.fire({
      title: authConstants.SESSION_EXPIRED_TITLE,
      text: authConstants.SESSION_EXPIRED_TEXT,
      icon: authConstants.ICON_WARNING,
      confirmButtonText: authConstants.CONFIRM_BUTTON_TEXT_OK,
    }).then(() => {
      localStorage.removeItem(authConstants.TOKEN_KEY);
      localStorage.removeItem(authConstants.USER_KEY);
      setUser(null);
      setIsAuthenticated(false);
      navigate("/login");
    });
  }, [navigate]);

  // Listen for unauthorized access events from axios
  useEffect(() => {
    const handleUnauthorizedEvent = () => {
      handleUnauthorizedLogout();
    };

    window.addEventListener('unauthorized-access', handleUnauthorizedEvent);
    
    return () => {
      window.removeEventListener('unauthorized-access', handleUnauthorizedEvent);
    };
  }, [handleUnauthorizedLogout]);

  useEffect(() => {
    const token = localStorage.getItem(authConstants.TOKEN_KEY);
    const storedUser = localStorage.getItem(authConstants.USER_KEY);

    if (token && storedUser) {
      if (isTokenExpired(token)) {
        localStorage.removeItem(authConstants.TOKEN_KEY);
        localStorage.removeItem(authConstants.USER_KEY);
        setIsAuthenticated(false);
        setUser(null);
      } else {
        setIsAuthenticated(true);
        setUser(JSON.parse(storedUser));
        // Optionally fetch fresh user profile
        dispatch(getProfile());
      }
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
    setLoading(false);
  }, [dispatch]);

  // Fungsi login
  const login = async (phone, password) => {
    try {
      const result = await dispatch(authLogin({ phone, password }));
      
      if (authLogin.fulfilled.match(result)) {
        if (result.payload.status === API_STATUS_CODES.SUCCESS) {
          const userData = result.payload.user || { phone };
          
          setIsAuthenticated(true);
          setUser(userData);

          Swal.fire({
            title: authConstants.LOGIN_SUCCESS_TITLE,
            text: result.payload.message || authMessages.LOGIN_SUCCESS_DEFAULT_MESSAGE,
            icon: authConstants.ICON_SUCCESS,
            confirmButtonText: authConstants.CONFIRM_BUTTON_TEXT_SUCCESS,
          }).then(() => {
            navigate("/");
          });
        } else {
          throw new Error(result.payload.message || authMessages.LOGIN_FAILED_DEFAULT_MESSAGE);
        }
      } else {
        throw new Error(result.payload?.message || authMessages.LOGIN_FAILED_DEFAULT_MESSAGE);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
                          error.message || 
                          authMessages.ERROR_DEFAULT_MESSAGE;
      
      Swal.fire({
        title: authConstants.LOGIN_FAILED_TITLE,
        text: errorMessage,
        icon: authConstants.ICON_ERROR,
        confirmButtonText: authConstants.CONFIRM_BUTTON_TEXT_ERROR,
      });
      
      throw error;
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
        dispatch(logoutUser());
        
        localStorage.removeItem(authConstants.TOKEN_KEY);
        localStorage.removeItem(authConstants.USER_KEY);
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
        logout,
        handleUnauthorizedLogout,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};