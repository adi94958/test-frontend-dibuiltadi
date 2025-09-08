import { provinceService } from "../../services/apis/provinceService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getProvinces = createAsyncThunk(
  "customer/getProvinces",
  async (_, { rejectWithValue }) => {
    try {
      const response = await provinceService.getProvinces();
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

const provinceSlice = createSlice({
  name: "province",
  initialState: {
    provincesList: [],
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
      .addCase(getProvinces.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProvinces.fulfilled, (state, action) => {
        state.loading = false;
        state.provincesList = action.payload.items || [];
      })
      .addCase(getProvinces.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = provinceSlice.actions;
export default provinceSlice.reducer;
