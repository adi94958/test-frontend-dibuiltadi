import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { summaryService } from "../../services/apis/summaryService";

const initialState = {
  dailyTransactions: [],
  monthlyTransactions: [],
  yearlyTransactions: [],
  topCustomers: [],
  loading: false,
  error: null,
};

// Async Thunk for get daily transactions summary
export const getDailyTransactionsSummary = createAsyncThunk(
  "summary/getDailyTransactionsSummary",
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await summaryService.getDailyTransactions(params);
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

// Async Thunk for get monthly transactions summary
export const getMonthlyTransactionsSummary = createAsyncThunk(
  "summary/getMonthlyTransactionsSummary",
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await summaryService.getMonthlyTransactions(params);
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

// Async Thunk for get yearly transactions summary
export const getYearlyTransactionsSummary = createAsyncThunk(
  "summary/getYearlyTransactionsSummary",
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await summaryService.getYearlyTransactions(params);
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

// Async Thunk for get top customers summary
export const getTopCustomersSummary = createAsyncThunk(
  "summary/getTopCustomersSummary",
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await summaryService.getTopCustomers(params);
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

const summarySlice = createSlice({
  name: "summary",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
    clearSummaryData(state) {
      state.dailyTransactions = [];
      state.monthlyTransactions = [];
      state.yearlyTransactions = [];
      state.topCustomers = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDailyTransactionsSummary.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDailyTransactionsSummary.fulfilled, (state, action) => {
        state.loading = false;
        state.dailyTransactions = action.payload;
      })
      .addCase(getDailyTransactionsSummary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getMonthlyTransactionsSummary.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMonthlyTransactionsSummary.fulfilled, (state, action) => {
        state.loading = false;
        state.monthlyTransactions = action.payload;
      })
      .addCase(getMonthlyTransactionsSummary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getYearlyTransactionsSummary.pending, (state) => {
        state.loading = true;
      })
      .addCase(getYearlyTransactionsSummary.fulfilled, (state, action) => {
        state.loading = false;
        state.yearlyTransactions = action.payload;
      })
      .addCase(getYearlyTransactionsSummary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getTopCustomersSummary.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTopCustomersSummary.fulfilled, (state, action) => {
        state.loading = false;
        state.topCustomers = action.payload;
      })
      .addCase(getTopCustomersSummary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearSummaryData } = summarySlice.actions;
export default summarySlice.reducer;
