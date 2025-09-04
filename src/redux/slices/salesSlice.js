import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { salesService } from "../../services/apis/salesCodeService";

// Async Thunk for get sales list
export const getSales = createAsyncThunk(
  "sales/getSales",
  async (_, { rejectWithValue }) => {
    try {
      const response = await salesService.getSales();
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

const salesSlice = createSlice({
  name: "sales",
  initialState: {
    salesList: [],
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
      .addCase(getSales.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSales.fulfilled, (state, action) => {
        state.loading = false;
        state.salesList = action.payload.items || [];
      })
      .addCase(getSales.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = salesSlice.actions;
export default salesSlice.reducer;
