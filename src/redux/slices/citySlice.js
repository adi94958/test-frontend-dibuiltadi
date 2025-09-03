import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { cityService } from "../../services/apis/cityService";

// Async Thunk for get cities
export const getCities = createAsyncThunk(
  "customer/getCities",
  async (_, { rejectWithValue }) => {
    try {
      const response = await cityService.getCities();
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

const citySlice = createSlice({
  name: "city",
  initialState: {
    cities: [],
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
      // Get cities cases
      .addCase(getCities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCities.fulfilled, (state, action) => {
        state.loading = false;
        state.cities = action.payload;
      })
      .addCase(getCities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = citySlice.actions;
export default citySlice.reducer;
