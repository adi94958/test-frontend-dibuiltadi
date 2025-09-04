import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { transactionService } from "../../services/apis/transactionService";

// Async Thunk for get all transactions
export const getAllTransactions = createAsyncThunk(
  "transaction/getAllTransactions",
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await transactionService.getAll(params);
      return response;
    } catch (err) {
      console.error('API Error - getAllTransactions:', err);
      if (err.response && err.response.data) {
        return rejectWithValue(err.response.data);
      } else {
        return rejectWithValue(err.message || 'Network error');
      }
    }
  }
);

// Async Thunk for get transaction detail
export const getTransactionDetail = createAsyncThunk(
  "transaction/getTransactionDetail",
  async (referenceNo, { rejectWithValue }) => {
    try {
      const response = await transactionService.getDetail(referenceNo);
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

const transactionSlice = createSlice({
  name: "transaction",
  initialState: {
    transactions: [],
    transactionDetail: null,
    pagination: {
      currentPage: 1,
      lastPage: 1,
      perPage: 10,
      total: 0,
    },
    loading: false,
    error: null,
  },
  reducers: {
    clearError(state) {
      state.error = null;
    },
    clearTransactionDetail(state) {
      state.transactionDetail = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllTransactions.fulfilled, (state, action) => {
        state.loading = false;
        // Response structure: { responseCode, responseMessage, items }
        const response = action.payload;
        
        if (response && response.items) {
          state.transactions = response.items;
          
          // Since API doesn't return pagination info, calculate it
          state.pagination = {
            currentPage: action.meta.arg?.page || 1,
            lastPage: Math.ceil(response.total / (action.meta.arg?.perPage || 10)),
            perPage: action.meta.arg?.perPage || 10,
            total: response.total, // Use total from API response
          };
        } else {
          state.transactions = [];
          state.pagination = {
            currentPage: 1,
            lastPage: 1,
            perPage: 10,
            total: 0,
          };
        }
      })
      .addCase(getAllTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getTransactionDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTransactionDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.transactionDetail = action.payload;
      })
      .addCase(getTransactionDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearTransactionDetail } = transactionSlice.actions;
export default transactionSlice.reducer;
