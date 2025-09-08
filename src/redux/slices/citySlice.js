import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { cityService } from "../../services/apis/cityService";

export const getCities = createAsyncThunk(
  "customer/getCities",
  async (_, { rejectWithValue }) => {
    try {
      const response = await cityService.getCities();
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

const citySlice = createSlice({
  name: "city",
  initialState: {
    citiesList: [],
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
      .addCase(getCities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCities.fulfilled, (state, action) => {
        state.loading = false;
        state.citiesList = action.payload.items || [];
      })
      .addCase(getCities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = citySlice.actions;
export default citySlice.reducer;
