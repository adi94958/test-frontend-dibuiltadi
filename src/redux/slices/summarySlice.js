import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { summaryService } from "../../services/apis/summaryService";
import * as summaryReducers from "../reducers/summaryReducer";

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
      // Get daily transactions summary cases
      .addCase(getDailyTransactionsSummary.pending, summaryReducers.fetchDailyTransactionsPending)
      .addCase(getDailyTransactionsSummary.fulfilled, summaryReducers.fetchDailyTransactionsFulfilled)
      .addCase(getDailyTransactionsSummary.rejected, summaryReducers.fetchDailyTransactionsRejected)
      // Get monthly transactions summary cases
      .addCase(getMonthlyTransactionsSummary.pending, summaryReducers.fetchMonthlyTransactionsPending)
      .addCase(getMonthlyTransactionsSummary.fulfilled, summaryReducers.fetchMonthlyTransactionsFulfilled)
      .addCase(getMonthlyTransactionsSummary.rejected, summaryReducers.fetchMonthlyTransactionsRejected)
      // Get yearly transactions summary cases
      .addCase(getYearlyTransactionsSummary.pending, summaryReducers.fetchYearlyTransactionsPending)
      .addCase(getYearlyTransactionsSummary.fulfilled, summaryReducers.fetchYearlyTransactionsFulfilled)
      .addCase(getYearlyTransactionsSummary.rejected, summaryReducers.fetchYearlyTransactionsRejected)
      // Get top customers summary cases
      .addCase(getTopCustomersSummary.pending, summaryReducers.fetchTopCustomersPending)
      .addCase(getTopCustomersSummary.fulfilled, summaryReducers.fetchTopCustomersFulfilled)
      .addCase(getTopCustomersSummary.rejected, summaryReducers.fetchTopCustomersRejected);
  },
});

export const { clearError, clearSummaryData } = summarySlice.actions;

// Export with shorter names for easier import
export const getDailyTransactions = getDailyTransactionsSummary;
export const getMonthlyTransactions = getMonthlyTransactionsSummary;
export const getYearlyTransactions = getYearlyTransactionsSummary;
export const getTopCustomers = getTopCustomersSummary;

export default summarySlice.reducer;