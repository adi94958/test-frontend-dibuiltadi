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

// Async Thunk for get all customers with pagination
export const getAllCustomers = createAsyncThunk(
  "customer/getAllCustomers",
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await customerService.getCustomers(params);
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

// Async Thunk for get customer detail
export const getCustomerDetail = createAsyncThunk(
  "customer/getCustomerDetail",
  async (id, { rejectWithValue }) => {
    try {
      const response = await customerService.getCustomerDetail(id);
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

// Async Thunk fot store customer
export const storeCustomer = createAsyncThunk(
  "customer/storeCustomer",
  async (customerData, { rejectWithValue }) => {
    try {
      const response = await customerService.storeCustomer(customerData);
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
    builder;
  },
});

export const { clearError, clearCustomerDetail } = customerSlice.actions;
export default customerSlice.reducer;
