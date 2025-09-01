// Summary reducer functions for handling different states

export const fetchDailyTransactionsPending = (state) => {
  state.loading = true;
  state.error = null;
};

export const fetchDailyTransactionsFulfilled = (state, action) => {
  state.loading = false;
  state.dailyTransactions = action.payload;
};

export const fetchDailyTransactionsRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

export const fetchMonthlyTransactionsPending = (state) => {
  state.loading = true;
  state.error = null;
};

export const fetchMonthlyTransactionsFulfilled = (state, action) => {
  state.loading = false;
  state.monthlyTransactions = action.payload;
};

export const fetchMonthlyTransactionsRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

export const fetchYearlyTransactionsPending = (state) => {
  state.loading = true;
  state.error = null;
};

export const fetchYearlyTransactionsFulfilled = (state, action) => {
  state.loading = false;
  state.yearlyTransactions = action.payload;
};

export const fetchYearlyTransactionsRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

export const fetchTopCustomersPending = (state) => {
  state.loading = true;
  state.error = null;
};

export const fetchTopCustomersFulfilled = (state, action) => {
  state.loading = false;
  state.topCustomers = action.payload;
};

export const fetchTopCustomersRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};