import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FunnelIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { getAllCustomers, clearError } from "../../redux/slices/customerSlice";
import {
  Button,
  TextInput,
  Text,
  SelectInput,
  Divider,
} from "../../components/Elements";
import { DataTable } from "../../components/Fragments";
import { MainLayout } from "../../components/Layouts";
import { formatDate } from "../../utils/formatHelpers";
import { EyeIcon, PencilIcon, PlusIcon } from "@heroicons/react/24/outline";
import { getProvinces } from "../../redux/slices/provinceSlice";
import { getCities } from "../../redux/slices/citySlice";

const CustomerPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { customers, pagination, loading, error } = useSelector(
    (state) => state.customer
  );

  const { provincesList } = useSelector((state) => state.province);
  const { citiesList } = useSelector((state) => state.city);

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
    provinceCode: "",
    cityCode: "",
  });

  const [showFilters, setShowFilters] = useState(false);

  // Load provinces and cities for filters
  useEffect(() => {
    dispatch(getProvinces());
    dispatch(getCities());
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

    dispatch(getAllCustomers(cleanParams));
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
      provinceCode: "",
      cityCode: "",
    });
  };

  // Table columns
  const columns = [
    {
      key: "code",
      title: "Code",
      width: "15%",
      render: (value) => (
        <Text variant="body" color="primary">
          {value}
        </Text>
      ),
    },
    {
      key: "name",
      title: "Name",
      width: "25%",
      render: (value) => <Text variant="body">{value || "-"}</Text>,
    },
    {
      key: "city",
      title: "City",
      width: "20%",
      render: (value) => <Text variant="caption">{value || "-"}</Text>,
    },
    {
      key: "province",
      title: "Province",
      width: "20%",
      render: (value) => <Text variant="caption">{value || "-"}</Text>,
    },
    {
      key: "createdAt",
      title: "Created At",
      width: "12%",
      render: (value) => <Text variant="caption">{formatDate(value)}</Text>,
    },
    {
      key: "actions",
      title: "Actions",
      width: "8%",
      render: (value, row) => (
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            color="primary"
            icon={<EyeIcon className="w-4 h-4" />}
            onClick={() => navigate(`/customers/detail/${row.code}`)}
          />
          <Button
            variant="outline"
            size="sm"
            color="success"
            icon={<PencilIcon className="w-4 h-4" />}
            onClick={() => navigate(`/customers/edit/${row.code}`)}
          />
        </div>
      ),
    },
  ];

  const breadcrumbItems = [{ label: "Customer Management", href: "/customer" }];

  return (
    <MainLayout title="Customer Management" breadcrumbItems={breadcrumbItems}>
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
                placeholder="Search by customer name..."
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
            <Button
              variant="solid"
              onClick={() => navigate("/customers/add")}
              className="flex items-center gap-2"
            >
              <PlusCircleIcon className="w-6 h-6" />
              Add Customer
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
                  id="province-code"
                  name="provinceCode"
                  label="Province"
                  labelType="outside"
                  value={filters.provinceCode}
                  onChange={(e) =>
                    handleFilterChange("provinceCode", e.target.value)
                  }
                  options={[
                    { value: "", label: "All Provinces" },
                    ...(provincesList || []).map((province) => ({
                      value: province.code,
                      label: province.name,
                    })),
                  ]}
                  className="mb-0"
                />
                <SelectInput
                  id="city-code"
                  name="cityCode"
                  label="City"
                  labelType="outside"
                  value={filters.cityCode}
                  onChange={(e) =>
                    handleFilterChange("cityCode", e.target.value)
                  }
                  options={[
                    { value: "", label: "All Cities" },
                    ...(citiesList || []).map((city) => ({
                      value: city.code,
                      label: city.name,
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
                    { value: "name", label: "Name" },
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
          data={customers}
          loading={loading}
          emptyMessage="No customers found. Try adjusting your filters."
          pagination={pagination}
          onPageChange={(page) => handleFilterChange("page", page)}
          onPerPageChange={(perPage) => handleFilterChange("perPage", perPage)}
          showPagination={true}
        />
      </div>
    </MainLayout>
  );
};

export default CustomerPage;
