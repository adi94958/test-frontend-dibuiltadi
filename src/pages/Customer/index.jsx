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
import { MainLayout } from "../../components/Layouts";
import { getCurrentDateConstraints } from "../../utils/dateHelpers";
import { getProvinces } from "../../redux/slices/provinceSlice";
import { getCities } from "../../redux/slices/citySlice";
import CustomerTable from "./components/CustomerTable";

const CustomerPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { customers, pagination, loading, error } = useSelector(
    (state) => state.customer
  );

  const { provincesList } = useSelector((state) => state.province);
  const { citiesList } = useSelector((state) => state.city);

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
    provinceCode: "",
    cityCode: "",
  });

  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    dispatch(getProvinces());
    dispatch(getCities());
  }, [dispatch]);

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

  const breadcrumbItems = [{ label: "Customer Management", href: "/customer" }];

  return (
    <MainLayout title="Customer Management" breadcrumbItems={breadcrumbItems}>
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
        <div className="px-4 py-4">
          {/* Mobile Layout - Grid untuk search, filter button, dan add button */}
          <div className="grid grid-cols-1 sm:hidden gap-3 mb-4">
            <TextInput
              labelType="placeholder"
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              placeholder="Search by customer name..."
            />
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="solid"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center justify-center gap-2"
              >
                <FunnelIcon className="w-4 h-4" />
                {showFilters ? "Hide" : "Filter"}
              </Button>
              <Button
                variant="solid"
                onClick={() => navigate("/customers/add")}
                className="flex items-center justify-center gap-2"
              >
                <PlusCircleIcon className="w-5 h-5" />
                Add
              </Button>
            </div>
          </div>

          {/* Desktop Layout - Original */}
          <div className="hidden sm:flex sm:flex-row sm:items-center sm:justify-end gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="w-full sm:w-64">
                <TextInput
                  labelType="placeholder"
                  value={filters.search}
                  onChange={(e) => handleFilterChange("search", e.target.value)}
                  placeholder="Search by customer name..."
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

        <CustomerTable
          customers={customers}
          loading={loading}
          pagination={pagination}
          onPageChange={(page) => handleFilterChange("page", page)}
          onPerPageChange={(perPage) => handleFilterChange("perPage", perPage)}
        />
      </div>
    </MainLayout>
  );
};

export default CustomerPage;
