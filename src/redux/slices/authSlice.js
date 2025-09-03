import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "../../services/apis/authService";

const getToken = () => localStorage.getItem("accessToken");
const setToken = (token) => localStorage.setItem("accessToken", token);
const removeToken = () => localStorage.removeItem("accessToken");

// Helper untuk user data - PRE-LOAD untuk avoid delay
const getUserData = () => {
  try {
    const userData = localStorage.getItem("userData");
    return userData && userData !== "undefined" ? JSON.parse(userData) : null;
  } catch {
    return null;
  }
};

const setUserData = (userData) => {
  localStorage.setItem("userData", JSON.stringify(userData));
};

const removeUserData = () => {
  localStorage.removeItem("userData");
};

const initialState = {
  isAuthenticated: !!getToken(),
  token: getToken() || null,
  user: getUserData(), // PRE-LOAD user data untuk instant display
  loading: false, // No loading by default untuk instant UI
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

// Async Thunk for login
export const login = createAsyncThunk(
  "auth/login",
  async ({ phone, password }, { rejectWithValue }) => {
    try {
      const response = await authService.login(phone, password);
      setToken(response.accessToken);
      return response;
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
      return {
        code: response.code,
        name: response.name,
        phone: response.phone,
        email: response.email,
        profileImage: response.profileImage,
        roleCode: response.roleCode,
        roleName: response.roleName,
      };
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
      state.user = null;
      removeToken();
      removeUserData(); // Hapus user data dari localStorage
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

        // Simpan user data ke state dan localStorage untuk instant display
        const userData = {
          code: action.payload.code,
          name: action.payload.name,
          phone: action.payload.phone,
          email: action.payload.email,
          profileImage: action.payload.profileImage,
          roleCode: action.payload.roleCode,
          roleName: action.payload.roleName,
        };
        state.user = userData;
        setUserData(userData); // Persist untuk instant load next time

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
        state.user = null;
        removeUserData();
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.token = null;
        state.user = null;
        state.loading = false;
        state.error = action.payload;
        removeUserData();
      })
      .addCase(getProfile.pending, (state) => {
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        const userData = {
          code: action.payload.code,
          name: action.payload.name,
          phone: action.payload.phone,
          email: action.payload.email,
          profileImage: action.payload.profileImage,
          roleCode: action.payload.roleCode,
          roleName: action.payload.roleName,
        };
        state.user = userData;
        setUserData(userData);
      })
      .addCase(getProfile.rejected, (state, action) => {
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
