import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "../../services/apis/authService";
import { API_STATUS_CODES } from "../../constants/apiConstants";

const getToken = () => localStorage.getItem("accessToken");
const setToken = (token) => localStorage.setItem("accessToken", token);
const removeToken = () => localStorage.removeItem("accessToken");

const getUser = () => {
  try {
    const userString = localStorage.getItem("user");
    if (!userString || userString === "undefined" || userString === "null") {
      return null;
    }
    return JSON.parse(userString);
  } catch {
    return null;
  }
};

const setUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

const removeUser = () => localStorage.removeItem("user");

const initialState = {
  isAuthenticated: !!getToken(),
  user: getUser(),
  token: getToken() || null,
  loading: false,
  error: null,
};

// Async Thunk for register
export const register = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authService.register(userData);

      const responseCode = parseInt(response.responseCode);
      if (responseCode === API_STATUS_CODES.SUCCESS) {
        return response;
      } else {
        return rejectWithValue(
          response.responseMessage || "Registration failed"
        );
      }
    } catch (err) {
      if (err.response && err.response.data) {
        return rejectWithValue(err.response.data);
      } else {
        return rejectWithValue({ message: err.message });
      }
    }
  }
);

// Async Thunk for login
export const login = createAsyncThunk(
  "auth/login",
  async ({ phone, password }, { rejectWithValue }) => {
    try {
      const response = await authService.login(phone, password);

      console.log("Login response code:", response?.responseCode);

      const responseCode = parseInt(response.responseCode);
      if (responseCode === API_STATUS_CODES.SUCCESS && response.accessToken) {
        const userData = {
          name: response.name,
          phone: response.phone,
          email: response.email,
          address: response.address,
        };

        setToken(response.accessToken);
        setUser(userData);

        return response;
      } else {
        return rejectWithValue(response.responseMessage || "Login failed");
      }
    } catch (err) {
      if (err.response && err.response.data) {
        return rejectWithValue(err.response.data);
      } else {
        return rejectWithValue({ message: err.message });
      }
    }
  }
);

// Async Thunk for logout
export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await authService.logout();
      removeToken();
      removeUser();
      return response.data;
    } catch (err) {
      // Even if logout fails on server, clear local storage
      removeToken();
      removeUser();
      if (err.response && err.response.data) {
        return rejectWithValue(err.response.data);
      } else {
        return rejectWithValue(err.message);
      }
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      removeToken();
      removeUser();
    },
    setCredentials(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      setToken(action.payload.token);
      setUser(action.payload.user);
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.token = action.payload.accessToken;
        state.user = {
          name: action.payload.name,
          phone: action.payload.phone,
          email: action.payload.email,
          address: action.payload.address,
        };
        state.loading = false;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.loading = false;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.loading = false;
      });
  },
});

export const { logout, setCredentials, clearError } = authSlice.actions;
export default authSlice.reducer;
