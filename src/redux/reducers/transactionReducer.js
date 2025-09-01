// Transaction reducer functions for handling different states

export const fetchAllTransactionsPending = (state) => {
  state.loading = true;
  state.error = null;
};

export const fetchAllTransactionsFulfilled = (state, action) => {
  state.loading = false;
  state.transactions = action.payload.data || action.payload;
  state.pagination = action.payload.meta || null;
};

export const fetchAllTransactionsRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

export const fetchTransactionDetailPending = (state) => {
  state.loading = true;
  state.error = null;
};

export const fetchTransactionDetailFulfilled = (state, action) => {
  state.loading = false;
  state.transactionDetail = action.payload;
};

export const fetchTransactionDetailRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};