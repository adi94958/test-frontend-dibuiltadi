import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  customerService,
  customerListService,
} from "../../services/apis/customerService";

// Async Thunk for get customer list (simple list)
export const getCustomerList = createAsyncThunk(
  "customer/getCustomerList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await customerListService.getCustomerList();
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

// Async Thunk for get all customers with pagination
export const getAllCustomers = createAsyncThunk(
  "customer/getAllCustomers",
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await customerService.getCustomers(params);
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

// Async Thunk for get customer detail
export const getCustomerDetail = createAsyncThunk(
  "customer/getCustomerDetail",
  async (id, { rejectWithValue }) => {
    try {
      const response = await customerService.getCustomerDetail(id);
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

// Async Thunk fot store customer
export const storeCustomer = createAsyncThunk(
  "customer/storeCustomer",
  async (customerData, { rejectWithValue }) => {
    try {
      const response = await customerService.storeCustomer(customerData);
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

const customerSlice = createSlice({
  name: "customer",
  initialState: {
    customers: [],
    customerList: [],
    customerDetail: null,
    pagination: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearError(state) {
      state.error = null;
    },
    clearCustomerDetail(state) {
      state.customerDetail = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Customer List
      .addCase(getCustomerList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCustomerList.fulfilled, (state, action) => {
        state.loading = false;
        state.customerList = action.payload.items || [];
      })
      .addCase(getCustomerList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get All Customers
      .addCase(getAllCustomers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllCustomers.fulfilled, (state, action) => {
        state.loading = false;
        // Response structure: { responseCode, responseMessage, items }
        const response = action.payload;
        
        if (response && response.items) {
          state.customers = response.items;
          
          // Since API doesn't return pagination info, calculate it
          state.pagination = {
            currentPage: action.meta.arg?.page || 1,
            lastPage: Math.ceil(response.total / (action.meta.arg?.perPage || 10)),
            perPage: action.meta.arg?.perPage || 10,
            total: response.total, // Use total from API response
          };
        } else {
          state.customers = [];
          state.pagination = {
            currentPage: 1,
            lastPage: 1,
            perPage: 10,
            total: 0,
          };
        }
      })
      .addCase(getAllCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get Customer Detail
      .addCase(getCustomerDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCustomerDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.customerDetail = action.payload;
      })
      .addCase(getCustomerDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearCustomerDetail } = customerSlice.actions;
export default customerSlice.reducer;
