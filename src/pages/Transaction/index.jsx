import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { EyeIcon, FunnelIcon } from "@heroicons/react/24/outline";
import {
  getAllTransactions,
  clearError,
} from "../../redux/slices/transactionSlice";
import { getCustomerList } from "../../redux/slices/customerSlice";
import { getSales } from "../../redux/slices/salesSlice";
import {
  Button,
  TextInput,
  Text,
  SelectInput,
  Divider,
} from "../../components/Elements";
import { DataTable } from "../../components/Fragments";
import { MainLayout } from "../../components/Layouts";
import { formatCurrency, formatDate } from "../../utils/formatHelpers";

const TransactionPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { transactions, pagination, loading, error } = useSelector(
    (state) => state.transaction
  );
  const { customerList } = useSelector((state) => state.customer);
  const { salesList } = useSelector((state) => state.sales);

  // Get current month dates
  const currentMonth = new Date();
  const firstDay = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  );

  const [filters, setFilters] = useState({
    page: 1,
    perPage: 10,
    sortBy: "created_at",
    sortDirection: "desc",
    search: "",
    startDate: firstDay.toISOString().split("T")[0],
    endDate: new Date().toISOString().split("T")[0],
    customerCode: "",
    salesCode: "",
  });

  const [showFilters, setShowFilters] = useState(false);

  // Load customer and sales data on component mount
  useEffect(() => {
    dispatch(getCustomerList());
    dispatch(getSales());
  }, [dispatch]);

  // Load data when filters change
  useEffect(() => {
    // Clean empty params
    const cleanParams = Object.entries(filters).reduce((acc, [key, value]) => {
      if (["startDate", "endDate"].includes(key) || value) {
        acc[key] = value;
      }
      return acc;
    }, {});

    dispatch(getAllTransactions(cleanParams));
  }, [dispatch, filters]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: key !== "page" ? 1 : value,
    }));
  };

  const handleResetFilters = () => {
    setFilters({
      page: 1,
      perPage: 10,
      sortBy: "created_at",
      sortDirection: "desc",
      search: "",
      startDate: firstDay.toISOString().split("T")[0],
      endDate: new Date().toISOString().split("T")[0],
      customerCode: "",
      salesCode: "",
    });
  };

  // Table columns
  const columns = [
    {
      key: "referenceNo",
      title: "Reference No",
      width: "15%",
      render: (value) => (
        <Text variant="body" color="primary">
          {value}
        </Text>
      ),
    },
    {
      key: "customer",
      title: "Customer",
      width: "25%",
      render: (customer) => (
        <div>
          <Text variant="body">{customer?.name || "-"}</Text>
          <Text variant="caption">{customer?.code || "-"}</Text>
        </div>
      ),
    },
    {
      key: "sales",
      title: "Sales",
      width: "15%",
      render: (value) => <Text variant="caption">{value}</Text>,
    },
    {
      key: "amountTotal",
      title: "Amount Total",
      width: "15%",
      render: (value) => <Text variant="body">{formatCurrency(value)}</Text>,
    },
    {
      key: "dateOrder",
      title: "Order Date",
      width: "12%",
      render: (value) => <Text variant="caption">{formatDate(value)}</Text>,
    },
    {
      key: "dateDue",
      title: "Due Date",
      width: "12%",
      render: (value) => <Text variant="caption">{formatDate(value)}</Text>,
    },
    {
      key: "actions",
      title: "Actions",
      width: "6%",
      render: (value, row) => (
        <Button
          variant="outline"
          size="sm"
          color="primary"
          icon={<EyeIcon className="w-4 h-4" />}
          onClick={() => navigate(`/transaction/detail/${row.referenceNo}`)}
        />
      ),
    },
  ];

  const breadcrumbItems = [
    { label: "Transaction Management", href: "/transaction" },
  ];

  return (
    <MainLayout
      title="Transaction Management"
      breadcrumbItems={breadcrumbItems}
    >
      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <Text variant="body" color="danger" className="font-medium mb-2">
            Error: {typeof error === "string" ? error : "Something went wrong"}
          </Text>
          <Button
            variant="outline"
            size="sm"
            onClick={() => dispatch(clearError())}
          >
            Dismiss
          </Button>
        </div>
      )}

      {/* Main Container */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Search and Filters Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-4 my-4 mx-4">
          {/* Search and Filter Toggle - Right side */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            {/* Search */}
            <div className="w-full sm:w-64">
              <TextInput
                labelType="placeholder"
                value={filters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
                placeholder="Search by reference no..."
              />
            </div>
            {/* Filter Toggle */}
            <Button
              variant="solid"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <FunnelIcon className="w-4 h-4" />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </Button>
          </div>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div>
            <Divider />
            <div className="px-6 py-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <TextInput
                  label="Start Date"
                  labelType="outside"
                  type="date"
                  value={filters.startDate}
                  onChange={(e) =>
                    handleFilterChange("startDate", e.target.value)
                  }
                  className="mb-0"
                />
                <TextInput
                  label="End Date"
                  labelType="outside"
                  type="date"
                  value={filters.endDate}
                  onChange={(e) =>
                    handleFilterChange("endDate", e.target.value)
                  }
                  className="mb-0"
                />

                <SelectInput
                  id="sales-code"
                  name="salesCode"
                  label="Sales"
                  labelType="outside"
                  value={filters.salesCode}
                  onChange={(e) =>
                    handleFilterChange("salesCode", e.target.value)
                  }
                  options={[
                    { value: "", label: "All Sales" },
                    ...(salesList || []).map((sales) => ({
                      value: sales.code,
                      label: sales.name,
                    })),
                  ]}
                  className="mb-0"
                />

                <SelectInput
                  id="customer-code"
                  name="customerCode"
                  label="Customer"
                  labelType="outside"
                  value={filters.customerCode}
                  onChange={(e) =>
                    handleFilterChange("customerCode", e.target.value)
                  }
                  options={[
                    { value: "", label: "All Customers" },
                    ...(customerList || []).map((customer) => ({
                      value: customer.code,
                      label: customer.name,
                    })),
                  ]}
                  className="mb-0"
                />
                {/* Sort Options */}
                <SelectInput
                  id="sort-by"
                  name="sortBy"
                  label="Sort By"
                  labelType="outside"
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange("sortBy", e.target.value)}
                  options={[
                    { value: "created_at", label: "Created At" },
                    { value: "date_order", label: "Order Date" },
                  ]}
                  className="mb-0"
                />

                <SelectInput
                  id="sort-direction"
                  name="sortDirection"
                  label="Sort Direction"
                  labelType="outside"
                  value={filters.sortDirection}
                  onChange={(e) =>
                    handleFilterChange("sortDirection", e.target.value)
                  }
                  options={[
                    { value: "desc", label: "Descending" },
                    { value: "asc", label: "Ascending" },
                  ]}
                  className="mb-0"
                />

                <div className="flex justify-center md:justify-start items-center mt-3">
                  <Button variant="outline" onClick={handleResetFilters}>
                    Reset Filters
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Data Table */}
        <DataTable
          columns={columns}
          data={transactions}
          loading={loading}
          emptyMessage="No transactions found. Try adjusting your filters."
          pagination={pagination}
          onPageChange={(page) => handleFilterChange("page", page)}
          onPerPageChange={(perPage) => handleFilterChange("perPage", perPage)}
          showPagination={true}
        />
      </div>
    </MainLayout>
  );
};

export default TransactionPage;
