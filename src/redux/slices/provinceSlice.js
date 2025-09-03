import { provinceService } from "../../services/apis/provinceService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Async Thunk for get provinces
export const getProvinces = createAsyncThunk(
  "customer/getProvinces",
  async (_, { rejectWithValue }) => {
    try {
      const response = await provinceService.getProvinces();
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

const provinceSlice = createSlice({
  name: "province",
  initialState: {
    provinces: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get provinces cases
      .addCase(getProvinces.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProvinces.fulfilled, (state, action) => {
        state.loading = false;
        state.provinces = action.payload;
      })
      .addCase(getProvinces.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = provinceSlice.actions;
export default provinceSlice.reducer;
