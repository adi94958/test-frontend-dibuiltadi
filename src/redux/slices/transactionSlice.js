import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { transactionService } from "../../services/apis/transactionService";
import * as transactionReducers from "../reducers/transactionReducer";

const initialState = {
  transactions: [],
  transactionDetail: null,
  pagination: null,
  loading: false,
  error: null,
};

// Async Thunk for get all transactions
export const getAllTransactions = createAsyncThunk(
  "transaction/getAllTransactions",
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await transactionService.getTransactions(params);
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

// Async Thunk for get transaction detail
export const getTransactionDetail = createAsyncThunk(
  "transaction/getTransactionDetail",
  async (id, { rejectWithValue }) => {
    try {
      const response = await transactionService.getTransactionDetail(id);
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

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
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
      // Get all transactions cases
      .addCase(getAllTransactions.pending, transactionReducers.fetchAllTransactionsPending)
      .addCase(getAllTransactions.fulfilled, transactionReducers.fetchAllTransactionsFulfilled)
      .addCase(getAllTransactions.rejected, transactionReducers.fetchAllTransactionsRejected)
      // Get transaction detail cases
      .addCase(getTransactionDetail.pending, transactionReducers.fetchTransactionDetailPending)
      .addCase(getTransactionDetail.fulfilled, transactionReducers.fetchTransactionDetailFulfilled)
      .addCase(getTransactionDetail.rejected, transactionReducers.fetchTransactionDetailRejected);
  },
});

export const { clearError, clearTransactionDetail } = transactionSlice.actions;
export default transactionSlice.reducer;