import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { 
  customerService, 
  provinceService, 
  cityService, 
  salesService,
  customerListService 
} from "../../services/apis/customerService";
import * as customerReducers from "../reducers/customerReducer";

const initialState = {
  customers: [],
  customerList: [],
  customerDetail: null,
  provinces: [],
  cities: [],
  sales: [],
  pagination: null,
  loading: false,
  error: null,
};

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

// Async Thunk for get provinces
export const getProvinces = createAsyncThunk(
  "customer/getProvinces",
  async (_, { rejectWithValue }) => {
    try {
      const response = await provinceService.getProvinces();
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

// Async Thunk for get cities
export const getCities = createAsyncThunk(
  "customer/getCities",
  async (_, { rejectWithValue }) => {
    try {
      const response = await cityService.getCities();
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

// Async Thunk for get sales
export const getSales = createAsyncThunk(
  "customer/getSales",
  async (_, { rejectWithValue }) => {
    try {
      const response = await salesService.getSales();
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
  initialState,
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
      // Get customer list cases
      .addCase(getCustomerList.pending, customerReducers.fetchCustomerListPending)
      .addCase(getCustomerList.fulfilled, customerReducers.fetchCustomerListFulfilled)
      .addCase(getCustomerList.rejected, customerReducers.fetchCustomerListRejected)
      // Get all customers cases
      .addCase(getAllCustomers.pending, customerReducers.fetchAllCustomersPending)
      .addCase(getAllCustomers.fulfilled, customerReducers.fetchAllCustomersFulfilled)
      .addCase(getAllCustomers.rejected, customerReducers.fetchAllCustomersRejected)
      // Get customer detail cases
      .addCase(getCustomerDetail.pending, customerReducers.fetchCustomerDetailPending)
      .addCase(getCustomerDetail.fulfilled, customerReducers.fetchCustomerDetailFulfilled)
      .addCase(getCustomerDetail.rejected, customerReducers.fetchCustomerDetailRejected)
      // Get provinces cases
      .addCase(getProvinces.pending, customerReducers.fetchProvincesPending)
      .addCase(getProvinces.fulfilled, customerReducers.fetchProvincesFulfilled)
      .addCase(getProvinces.rejected, customerReducers.fetchProvincesRejected)
      // Get cities cases
      .addCase(getCities.pending, customerReducers.fetchCitiesPending)
      .addCase(getCities.fulfilled, customerReducers.fetchCitiesFulfilled)
      .addCase(getCities.rejected, customerReducers.fetchCitiesRejected)
      // Get sales cases
      .addCase(getSales.pending, customerReducers.fetchSalesPending)
      .addCase(getSales.fulfilled, customerReducers.fetchSalesFulfilled)
      .addCase(getSales.rejected, customerReducers.fetchSalesRejected);
  },
});

export const { clearError, clearCustomerDetail } = customerSlice.actions;
export default customerSlice.reducer;