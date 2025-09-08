import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import TransactionTable from "./components/TransactionTable";
import { MainLayout } from "../../components/Layouts";
import { getCurrentDateConstraints } from "../../utils/dateHelpers";

const TransactionPage = () => {
  const dispatch = useDispatch();
  const { transactions, pagination, loading, error } = useSelector(
    (state) => state.transaction
  );
  const { customerList } = useSelector((state) => state.customer);
  const { salesList } = useSelector((state) => state.sales);

  const currentMonth = new Date();
  const firstDay = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  );
  const { maxDate } = getCurrentDateConstraints();

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

  useEffect(() => {
    dispatch(getCustomerList());
    dispatch(getSales());
  }, [dispatch]);

  useEffect(() => {
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

  const breadcrumbItems = [
    { label: "Transaction Management", href: "/transaction" },
  ];

  return (
    <MainLayout
      title="Transaction Management"
      breadcrumbItems={breadcrumbItems}
    >
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

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-4 my-4 mx-4">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="w-full sm:w-64">
              <TextInput
                labelType="placeholder"
                value={filters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
                placeholder="Search by reference no..."
              />
            </div>
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

        {showFilters && (
          <div>
            <Divider />
            <div className="px-6 py-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                <TextInput
                  label="Start Date"
                  labelType="outside"
                  type="date"
                  value={filters.startDate}
                  max={maxDate}
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
                  max={maxDate}
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

                <div className="col-span-2 sm:col-span-3 lg:col-span-4 flex justify-center sm:justify-start items-center mt-2">
                  <Button
                    variant="outline"
                    onClick={handleResetFilters}
                    className="w-full sm:w-auto"
                  >
                    Reset Filters
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        <TransactionTable
          transactions={transactions}
          loading={loading}
          pagination={pagination}
          onPageChange={(page) => handleFilterChange("page", page)}
          onPerPageChange={(perPage) => handleFilterChange("perPage", perPage)}
        />
      </div>
    </MainLayout>
  );
};

export default TransactionPage;
