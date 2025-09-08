import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { summaryService } from "../../services/apis/summaryService";
import { getDefaultFilters } from "../../utils/dateHelpers";

const initialState = {
  // Daily Transactions Section
  dailyTransactions: {
    data: {},
    filters: getDefaultFilters().daily,
    loading: false,
    error: null,
    lastUpdated: null,
  },
  // Monthly Transactions Section
  monthlyTransactions: {
    data: {},
    filters: getDefaultFilters().monthly,
    loading: false,
    error: null,
    lastUpdated: null,
  },
  // Yearly Transactions Section
  yearlyTransactions: {
    data: {},
    filters: getDefaultFilters().yearly,
    loading: false,
    error: null,
    lastUpdated: null,
  },
  // Top Customers Section
  topCustomers: {
    data: {},
    filters: getDefaultFilters().topCustomers,
    loading: false,
    error: null,
    lastUpdated: null,
  },
};

// Daily Transactions Async Thunk
export const getDailyTransactionsSummary = createAsyncThunk(
  "summary/getDailyTransactionsSummary",
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await summaryService.getDailyTransactions(params);
      return response;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Monthly Transactions Async Thunk
export const getMonthlyTransactionsSummary = createAsyncThunk(
  "summary/getMonthlyTransactionsSummary",
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await summaryService.getMonthlyTransactions(params);
      return response;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Yearly Transactions Async Thunk
export const getYearlyTransactionsSummary = createAsyncThunk(
  "summary/getYearlyTransactionsSummary",
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await summaryService.getYearlyTransactions(params);
      return response;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Top Customers Async Thunk
export const getTopCustomersSummary = createAsyncThunk(
  "summary/getTopCustomersSummary",
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await summaryService.getTopCustomers(params);
      return response;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const summarySlice = createSlice({
  name: "summary",
  initialState,
  reducers: {
    // Daily Transactions Actions
    setDailyFilters: (state, action) => {
      state.dailyTransactions.filters = action.payload;
    },
    resetDailyFilters: (state) => {
      state.dailyTransactions.filters = getDefaultFilters().daily;
    },
    clearDailyError: (state) => {
      state.dailyTransactions.error = null;
    },
    clearDailyData: (state) => {
      state.dailyTransactions.data = {};
    },

    // Monthly Transactions Actions
    setMonthlyFilters: (state, action) => {
      state.monthlyTransactions.filters = action.payload;
    },
    resetMonthlyFilters: (state) => {
      state.monthlyTransactions.filters = getDefaultFilters().monthly;
    },
    clearMonthlyError: (state) => {
      state.monthlyTransactions.error = null;
    },
    clearMonthlyData: (state) => {
      state.monthlyTransactions.data = {};
    },

    // Yearly Transactions Actions
    setYearlyFilters: (state, action) => {
      state.yearlyTransactions.filters = action.payload;
    },
    resetYearlyFilters: (state) => {
      state.yearlyTransactions.filters = getDefaultFilters().yearly;
    },
    clearYearlyError: (state) => {
      state.yearlyTransactions.error = null;
    },
    clearYearlyData: (state) => {
      state.yearlyTransactions.data = {};
    },

    // Top Customers Actions
    setTopCustomersFilters: (state, action) => {
      state.topCustomers.filters = action.payload;
    },
    resetTopCustomersFilters: (state) => {
      state.topCustomers.filters = getDefaultFilters().topCustomers;
    },
    clearTopCustomersError: (state) => {
      state.topCustomers.error = null;
    },
    clearTopCustomersData: (state) => {
      state.topCustomers.data = {};
    },

    // Global Actions
    clearError(state) {
      state.dailyTransactions.error = null;
      state.monthlyTransactions.error = null;
      state.yearlyTransactions.error = null;
      state.topCustomers.error = null;
    },
    clearSummaryData(state) {
      state.dailyTransactions.data = {};
      state.monthlyTransactions.data = {};
      state.yearlyTransactions.data = {};
      state.topCustomers.data = {};
    },
  },
  extraReducers: (builder) => {
    builder
      // Daily Transactions
      .addCase(getDailyTransactionsSummary.pending, (state) => {
        state.dailyTransactions.loading = true;
        state.dailyTransactions.error = null;
      })
      .addCase(getDailyTransactionsSummary.fulfilled, (state, action) => {
        state.dailyTransactions.loading = false;
        state.dailyTransactions.data = action.payload;
        state.dailyTransactions.lastUpdated = new Date().toISOString();
      })
      .addCase(getDailyTransactionsSummary.rejected, (state, action) => {
        state.dailyTransactions.loading = false;
        state.dailyTransactions.error = action.payload;
      })

      // Monthly Transactions
      .addCase(getMonthlyTransactionsSummary.pending, (state) => {
        state.monthlyTransactions.loading = true;
        state.monthlyTransactions.error = null;
      })
      .addCase(getMonthlyTransactionsSummary.fulfilled, (state, action) => {
        state.monthlyTransactions.loading = false;
        state.monthlyTransactions.data = action.payload;
        state.monthlyTransactions.lastUpdated = new Date().toISOString();
      })
      .addCase(getMonthlyTransactionsSummary.rejected, (state, action) => {
        state.monthlyTransactions.loading = false;
        state.monthlyTransactions.error = action.payload;
      })

      // Yearly Transactions
      .addCase(getYearlyTransactionsSummary.pending, (state) => {
        state.yearlyTransactions.loading = true;
        state.yearlyTransactions.error = null;
      })
      .addCase(getYearlyTransactionsSummary.fulfilled, (state, action) => {
        state.yearlyTransactions.loading = false;
        state.yearlyTransactions.data = action.payload;
        state.yearlyTransactions.lastUpdated = new Date().toISOString();
      })
      .addCase(getYearlyTransactionsSummary.rejected, (state, action) => {
        state.yearlyTransactions.loading = false;
        state.yearlyTransactions.error = action.payload;
      })

      // Top Customers
      .addCase(getTopCustomersSummary.pending, (state) => {
        state.topCustomers.loading = true;
        state.topCustomers.error = null;
      })
      .addCase(getTopCustomersSummary.fulfilled, (state, action) => {
        state.topCustomers.loading = false;
        state.topCustomers.data = action.payload;
        state.topCustomers.lastUpdated = new Date().toISOString();
      })
      .addCase(getTopCustomersSummary.rejected, (state, action) => {
        state.topCustomers.loading = false;
        state.topCustomers.error = action.payload;
      });
  },
});

export const {
  // Daily Transactions Actions
  setDailyFilters,
  resetDailyFilters,
  clearDailyError,
  clearDailyData,
  // Monthly Transactions Actions
  setMonthlyFilters,
  resetMonthlyFilters,
  clearMonthlyError,
  clearMonthlyData,
  // Yearly Transactions Actions
  setYearlyFilters,
  resetYearlyFilters,
  clearYearlyError,
  clearYearlyData,
  // Top Customers Actions
  setTopCustomersFilters,
  resetTopCustomersFilters,
  clearTopCustomersError,
  clearTopCustomersData,
  // Global Actions
  clearError,
  clearSummaryData,
} = summarySlice.actions;

export default summarySlice.reducer;
