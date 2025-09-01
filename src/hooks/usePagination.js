import { useState, useCallback, useMemo } from 'react';
import { 
  buildQueryParams, 
  mergeWithDefaults, 
  validatePaginationParams,
  CUSTOMER_FILTER_CONSTANTS,
  TRANSACTION_FILTER_CONSTANTS
} from '../constants/paginationConstants';

// Hook for managing pagination and filters (hanya untuk Customer dan Transaction)
export const usePagination = (type = 'customer', initialFilters = {}) => {
  // Get default filters based on type
  const getDefaultFilters = () => {
    switch (type) {
      case 'transaction':
        return TRANSACTION_FILTER_CONSTANTS.DEFAULT_FILTERS;
      case 'customer':
      default:
        return CUSTOMER_FILTER_CONSTANTS.DEFAULT_FILTERS;
    }
  };

  const defaultFilters = getDefaultFilters();
  const [filters, setFilters] = useState(
    mergeWithDefaults(initialFilters, defaultFilters)
  );

  // Update single filter
  const updateFilter = useCallback((key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      // Reset page to 1 when filtering (except when changing page itself)
      ...(key !== 'page' && { page: 1 })
    }));
  }, []);

  // Update multiple filters
  const updateFilters = useCallback((newFilters) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters,
      // Reset page to 1 when filtering
      page: 1
    }));
  }, []);

  // Reset filters to default
  const resetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, [defaultFilters]);

  // Change page
  const changePage = useCallback((page) => {
    updateFilter('page', page);
  }, [updateFilter]);

  // Change per page
  const changePerPage = useCallback((perPage) => {
    setFilters(prev => ({
      ...prev,
      perPage,
      page: 1 // Reset to first page when changing per page
    }));
  }, []);

  // Change sorting
  const changeSorting = useCallback((sortBy, sortDirection) => {
    setFilters(prev => ({
      ...prev,
      sortBy,
      sortDirection,
      page: 1 // Reset to first page when changing sort
    }));
  }, []);

  // Search function
  const search = useCallback((searchTerm) => {
    updateFilter('search', searchTerm);
  }, [updateFilter]);

  // Date range filter
  const setDateRange = useCallback((startDate, endDate) => {
    setFilters(prev => ({
      ...prev,
      startDate,
      endDate,
      page: 1
    }));
  }, []);

  // Get validated query params for API call
  const queryParams = useMemo(() => {
    const validatedFilters = validatePaginationParams(filters);
    return buildQueryParams(validatedFilters);
  }, [filters]);

  // Get current pagination info
  const paginationInfo = useMemo(() => ({
    currentPage: filters.page,
    perPage: filters.perPage,
    sortBy: filters.sortBy,
    sortDirection: filters.sortDirection
  }), [filters]);

  return {
    filters,
    queryParams,
    paginationInfo,
    updateFilter,
    updateFilters,
    resetFilters,
    changePage,
    changePerPage,
    changeSorting,
    search,
    setDateRange
  };
};

// Hook specifically for customer pagination
export const useCustomerPagination = (initialFilters = {}) => {
  return usePagination('customer', initialFilters);
};

// Hook specifically for transaction pagination
export const useTransactionPagination = (initialFilters = {}) => {
  return usePagination('transaction', initialFilters);
};

// Hook untuk Summary - TANPA pagination, hanya filter
export const useSummaryFilters = () => {
  // State untuk Daily Transactions
  const [dailyFilters, setDailyFilters] = useState({
    startDate: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
    salesCode: ''
  });

  // State untuk Monthly Transactions  
  const [monthlyFilters, setMonthlyFilters] = useState({
    startMonth: new Date(new Date().setMonth(new Date().getMonth() - 11)).toISOString().slice(0, 7),
    endMonth: new Date().toISOString().slice(0, 7),
    salesCode: ''
  });

  // State untuk Yearly Transactions
  const [yearlyFilters, setYearlyFilters] = useState({
    year: new Date().getFullYear(),
    salesCode: ''
  });

  // State untuk Top Customers
  const [topCustomersFilters, setTopCustomersFilters] = useState({
    startDate: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
    limit: 10
  });

  // Update functions
  const updateDailyFilters = useCallback((newFilters) => {
    setDailyFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  const updateMonthlyFilters = useCallback((newFilters) => {
    setMonthlyFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  const updateYearlyFilters = useCallback((newFilters) => {
    setYearlyFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  const updateTopCustomersFilters = useCallback((newFilters) => {
    setTopCustomersFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  // Get query params for each API
  const dailyQueryParams = useMemo(() => buildQueryParams(dailyFilters), [dailyFilters]);
  const monthlyQueryParams = useMemo(() => buildQueryParams(monthlyFilters), [monthlyFilters]);
  const yearlyQueryParams = useMemo(() => buildQueryParams(yearlyFilters), [yearlyFilters]);
  const topCustomersQueryParams = useMemo(() => buildQueryParams(topCustomersFilters), [topCustomersFilters]);

  return {
    // Filters
    dailyFilters,
    monthlyFilters,
    yearlyFilters,
    topCustomersFilters,
    
    // Query params
    dailyQueryParams,
    monthlyQueryParams,
    yearlyQueryParams,
    topCustomersQueryParams,
    
    // Update functions
    updateDailyFilters,
    updateMonthlyFilters,
    updateYearlyFilters,
    updateTopCustomersFilters
  };
};
