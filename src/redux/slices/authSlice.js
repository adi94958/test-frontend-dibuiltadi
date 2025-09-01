import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "../../services/apis/authService";
import { authConstants } from "../../constants/authConstants";

const initialState = {
  isAuthenticated: !!localStorage.getItem(authConstants.TOKEN_KEY),
  user: JSON.parse(localStorage.getItem(authConstants.USER_KEY)) || null,
  token: localStorage.getItem(authConstants.TOKEN_KEY) || null,
  loading: false,
  error: null,
  updateSuccess: false,
  updateError: null,
};

// Async Thunk for register
export const register = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authService.register(userData);
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

// Async Thunk for login
export const login = createAsyncThunk(
  "auth/login",
  async ({ phone, password }, { rejectWithValue }) => {
    try {
      const response = await authService.login(phone, password);
      
      // Store token and user data in localStorage
      // Based on Postman collection, token comes as 'accessToken'
      if (response.accessToken) {
        localStorage.setItem(authConstants.TOKEN_KEY, response.accessToken);
        
        // Store user data if available
        const userData = {
          phone,
          // Add other user fields from response if available
          ...response.user
        };
        localStorage.setItem(authConstants.USER_KEY, JSON.stringify(userData));
      }
      
      return response;
    } catch (err) {
      if (err.response && err.response.data) {
        return rejectWithValue(err.response.data);
      } else {
        return rejectWithValue(err.message);
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
      
      // Clear localStorage
      localStorage.removeItem(authConstants.TOKEN_KEY);
      localStorage.removeItem(authConstants.USER_KEY);
      
      return response.data;
    } catch (err) {
      // Even if API call fails, clear localStorage
      localStorage.removeItem(authConstants.TOKEN_KEY);
      localStorage.removeItem(authConstants.USER_KEY);
      
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
      state.user = null;
      state.token = null;
      localStorage.removeItem(authConstants.TOKEN_KEY);
      localStorage.removeItem(authConstants.USER_KEY);
    },
    setCredentials(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload.user;
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
      // Register cases
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
      // Login cases
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user || { phone: action.payload.phone };
        state.token = action.payload.accessToken;
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Logout cases
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
      .addCase(logoutUser.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.loading = false;
        state.error = action.payload;
      })
      // Get profile cases
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        // Update localStorage with new user data
        localStorage.setItem(authConstants.USER_KEY, JSON.stringify(action.payload));
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update password cases
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

export const { logout, setCredentials, clearError, clearUpdateSuccess } = authSlice.actions;
export default authSlice.reducer;