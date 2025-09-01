// Pagination and Filter Constants
export const PAGINATION_CONSTANTS = {
  // Default pagination values
  DEFAULT_PAGE: 1,
  DEFAULT_PER_PAGE: 10,
  MIN_PER_PAGE: 10,
  MAX_PER_PAGE: 100,
  
  // Per page options for UI
  PER_PAGE_OPTIONS: [10, 25, 50, 100],
  
  // Default sorting
  DEFAULT_SORT_BY: 'created_at',
  DEFAULT_SORT_DIRECTION: 'desc',
  
  // Sort directions
  SORT_DIRECTIONS: {
    ASC: 'asc',
    DESC: 'desc'
  },
  
  // Common sort fields
  SORT_FIELDS: {
    CREATED_AT: 'created_at',
    UPDATED_AT: 'updated_at',
    NAME: 'name',
    CODE: 'code',
    DATE: 'date',
    AMOUNT: 'amount'
  }
};

// Customer specific constants
export const CUSTOMER_FILTER_CONSTANTS = {
  SORT_BY_OPTIONS: [
    { value: 'created_at', label: 'Tanggal Dibuat' },
    { value: 'name', label: 'Nama' },
    { value: 'code', label: 'Kode' }
  ],
  
  // Default filter for customer
  DEFAULT_FILTERS: {
    page: PAGINATION_CONSTANTS.DEFAULT_PAGE,
    perPage: PAGINATION_CONSTANTS.DEFAULT_PER_PAGE,
    sortBy: PAGINATION_CONSTANTS.DEFAULT_SORT_BY,
    sortDirection: PAGINATION_CONSTANTS.DEFAULT_SORT_DIRECTION,
    search: '',
    startDate: '',
    endDate: '',
    provinceCode: '',
    cityCode: ''
  }
};

// Transaction specific constants
export const TRANSACTION_FILTER_CONSTANTS = {
  SORT_BY_OPTIONS: [
    { value: 'created_at', label: 'Tanggal Dibuat' }
  ],
  
  // Default filter for transaction
  DEFAULT_FILTERS: {
    page: PAGINATION_CONSTANTS.DEFAULT_PAGE,
    perPage: PAGINATION_CONSTANTS.DEFAULT_PER_PAGE,
    sortBy: PAGINATION_CONSTANTS.DEFAULT_SORT_BY,
    sortDirection: PAGINATION_CONSTANTS.DEFAULT_SORT_DIRECTION,
    search: '', // untuk pencarian reference no
    startDate: '',
    endDate: '',
    customerCode: '',
    salesCode: ''
  }
};

// Helper function to build query params
export const buildQueryParams = (filters) => {
  const params = {};
  
  Object.keys(filters).forEach(key => {
    const value = filters[key];
    // Only add non-empty values
    if (value !== null && value !== undefined && value !== '') {
      params[key] = value;
    }
  });
  
  return params;
};

// Helper function to merge filters with defaults
export const mergeWithDefaults = (filters, defaults) => {
  return { ...defaults, ...filters };
};

// Helper function to validate pagination params
export const validatePaginationParams = (params) => {
  const validated = { ...params };
  
  // Validate page
  if (!validated.page || validated.page < 1) {
    validated.page = PAGINATION_CONSTANTS.DEFAULT_PAGE;
  }
  
  // Validate perPage
  if (!validated.perPage || 
      validated.perPage < PAGINATION_CONSTANTS.MIN_PER_PAGE || 
      validated.perPage > PAGINATION_CONSTANTS.MAX_PER_PAGE) {
    validated.perPage = PAGINATION_CONSTANTS.DEFAULT_PER_PAGE;
  }
  
  // Validate sortDirection
  if (!Object.values(PAGINATION_CONSTANTS.SORT_DIRECTIONS).includes(validated.sortDirection)) {
    validated.sortDirection = PAGINATION_CONSTANTS.DEFAULT_SORT_DIRECTION;
  }
  
  return validated;
};
