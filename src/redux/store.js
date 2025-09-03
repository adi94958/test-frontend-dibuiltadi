import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import customerReducer from "./slices/customerSlice";
import transactionReducer from "./slices/transactionSlice";
import summaryReducer from "./slices/summarySlice";
import sidebarReducer from "./slices/sidebarSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    customer: customerReducer,
    transaction: transactionReducer,
    summary: summaryReducer,
    sidebar: sidebarReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ["persist/PERSIST"],
        // Ignore these field paths in all actions
        ignoredActionsPaths: ["meta.arg", "payload.timestamp"],
        // Ignore these paths in the state
        ignoredPaths: ["items.dates"],
      },
    }),
  devTools: import.meta.env.MODE !== "production",
});

export default store;
