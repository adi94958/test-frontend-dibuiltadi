import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "../../services/apis/authService";
import { API_STATUS_CODES } from "../../constants/apiConstants";

const getToken = () => localStorage.getItem("accessToken");
const setToken = (token) => localStorage.setItem("accessToken", token);
const removeToken = () => localStorage.removeItem("accessToken");

const initialState = {
  isAuthenticated: !!getToken(),
  token: getToken() || null,
  loading: false,
  error: null,
  updateError: null,
  updateSuccess: false,
};

// Async Thunk for register
export const register = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authService.register(userData);

      // Handle backend response format
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
        return rejectWithValue(err.message);
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

      // Handle backend response format: { responseCode: "20000", accessToken: "...", phone: "..." }
      const responseCode = parseInt(response.responseCode);
      if (responseCode === API_STATUS_CODES.SUCCESS && response.accessToken) {
        
        // Save to localStorage
        setToken(response.accessToken);
        
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
      return response.data;
    } catch (err) {
      if (err.response && err.response.data) {
        return rejectWithValue(err.response.data);
      } else {
        return rejectWithValue(err.message);
      }
    }
  }
);

// Async Thunk for get profile
export const getProfile = createAsyncThunk(
  "auth/getProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await authService.getProfile();
      return response.data;
    } catch (err) {
      if (err.response && err.response.data) {
        return rejectWithValue(err.response.data);
      } else {
        return rejectWithValue(err.message);
      }
    }
  }
);

// Async Thunk for update password
export const updatePassword = createAsyncThunk(
  "auth/updatePassword",
  async (passwordData, { rejectWithValue }) => {
    try {
      const response = await authService.updatePassword(passwordData);
      return response.data;
    } catch (err) {
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
      state.token = null;
      removeToken();
    },
    setCredentials(state, action) {
      state.isAuthenticated = true;
      state.token = action.payload.token;
    },
    clearError(state) {
      state.error = null;
      state.updateError = null;
    },
    clearUpdateSuccess(state) {
      state.updateSuccess = false;
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
        state.token = null;
        state.loading = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.token = null;
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updatePassword.pending, (state) => {
        state.loading = true;
        state.updateError = null;
        state.updateSuccess = false;
      })
      .addCase(updatePassword.fulfilled, (state) => {
        state.loading = false;
        state.updateSuccess = true;
        state.updateError = null;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.loading = false;
        state.updateError = action.payload;
        state.updateSuccess = false;
      });
  },
});

export const { logout, setCredentials, clearError, clearUpdateSuccess } =
  authSlice.actions;
export default authSlice.reducer;
