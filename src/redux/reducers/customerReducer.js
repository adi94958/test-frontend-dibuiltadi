// Customer reducer functions for handling different states

export const fetchCustomerListPending = (state) => {
  state.loading = true;
  state.error = null;
};

export const fetchCustomerListFulfilled = (state, action) => {
  state.loading = false;
  state.customerList = action.payload;
};

export const fetchCustomerListRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

export const fetchAllCustomersPending = (state) => {
  state.loading = true;
  state.error = null;
};

export const fetchAllCustomersFulfilled = (state, action) => {
  state.loading = false;
  state.customers = action.payload.data || action.payload;
  state.pagination = action.payload.meta || null;
};

export const fetchAllCustomersRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

export const fetchCustomerDetailPending = (state) => {
  state.loading = true;
  state.error = null;
};

export const fetchCustomerDetailFulfilled = (state, action) => {
  state.loading = false;
  state.customerDetail = action.payload;
};

export const fetchCustomerDetailRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

export const fetchProvincesPending = (state) => {
  state.loading = true;
  state.error = null;
};

export const fetchProvincesFulfilled = (state, action) => {
  state.loading = false;
  state.provinces = action.payload;
};

export const fetchProvincesRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

export const fetchCitiesPending = (state) => {
  state.loading = true;
  state.error = null;
};

export const fetchCitiesFulfilled = (state, action) => {
  state.loading = false;
  state.cities = action.payload;
};

export const fetchCitiesRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

export const fetchSalesPending = (state) => {
  state.loading = true;
  state.error = null;
};

export const fetchSalesFulfilled = (state, action) => {
  state.loading = false;
  state.sales = action.payload;
};

export const fetchSalesRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};