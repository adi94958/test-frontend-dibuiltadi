import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { transactionService } from "../../services/apis/transactionService";

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
  initialState: {
    transactions: [],
    transactionDetail: null,
    pagination: null,
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
      })
      .addCase(getAllTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
      })
      .addCase(getAllTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getTransactionDetail.pending, (state) => {
        state.loading = true;
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
