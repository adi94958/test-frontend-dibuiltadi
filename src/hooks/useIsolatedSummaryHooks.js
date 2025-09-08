import { useState, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDefaultFilters } from "../utils/dateHelpers";

import {
  getDailyTransactionsSummary,
  getMonthlyTransactionsSummary,
  getYearlyTransactionsSummary,
  getTopCustomersSummary,
  setDailyFilters,
  setMonthlyFilters,
  setYearlyFilters,
  setTopCustomersFilters,
} from "../redux/slices/summarySlice";

const useIsolatedSection = (
  sectionName,
  setFiltersAction,
  fetchAction,
  defaultFilters
) => {
  const dispatch = useDispatch();
  const mountedRef = useRef(true);
  const [isInitialized, setIsInitialized] = useState(false);

  const sectionState = useSelector((state) => state.summary[sectionName]);
  const { data, filters, loading, error } = sectionState;

  const updateFilters = useCallback(
    (newFilters) => {
      if (!mountedRef.current) return;

      dispatch(setFiltersAction(newFilters));
      dispatch(fetchAction(newFilters));
    },
    [dispatch, setFiltersAction, fetchAction]
  );

  const resetFilters = useCallback(() => {
    if (!mountedRef.current) return;

    dispatch(setFiltersAction(defaultFilters));
    dispatch(fetchAction(defaultFilters));
  }, [dispatch, setFiltersAction, fetchAction, defaultFilters]);

  const initializeData = useCallback(() => {
    if (!mountedRef.current || isInitialized) return;

    dispatch(fetchAction(filters));
    setIsInitialized(true);
  }, [dispatch, fetchAction, filters, isInitialized]);

  const cleanup = useCallback(() => {
    mountedRef.current = false;
  }, []);

  return {
    data,
    filters,
    loading,
    error,
    updateFilters,
    resetFilters,
    initializeData,
    cleanup,
  };
};

export const useIsolatedDailyTransactions = () => {
  return useIsolatedSection(
    "dailyTransactions",
    setDailyFilters,
    getDailyTransactionsSummary,
    getDefaultFilters().daily
  );
};

export const useIsolatedMonthlyTransactions = () => {
  return useIsolatedSection(
    "monthlyTransactions",
    setMonthlyFilters,
    getMonthlyTransactionsSummary,
    getDefaultFilters().monthly
  );
};

export const useIsolatedYearlyTransactions = () => {
  return useIsolatedSection(
    "yearlyTransactions",
    setYearlyFilters,
    getYearlyTransactionsSummary,
    getDefaultFilters().yearly
  );
};

export const useIsolatedTopCustomers = () => {
  return useIsolatedSection(
    "topCustomers",
    setTopCustomersFilters,
    getTopCustomersSummary,
    getDefaultFilters().topCustomers
  );
};
