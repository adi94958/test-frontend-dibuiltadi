import {
  Card,
  Button,
  TextInput,
  SelectInput,
  Loading,
} from "../../../components/Elements";
import { Line } from "react-chartjs-2";
import { Chart, Filler } from "chart.js";
Chart.register(Filler);
import { getCurrentDateConstraints } from "../../../utils/dateHelpers";

const ChartSection = ({
  title,
  children,
  chartData,
  chartOptions,
  loading,
  ChartComponent = Line,
  showChart = true,
}) => {
  return (
    <Card variant="solid" heading={title}>
      {children}
      {showChart && (
        <div className="mt-6 h-80 flex items-center justify-center">
          {loading ? (
            <Loading />
          ) : (
            <ChartComponent data={chartData} options={chartOptions} />
          )}
        </div>
      )}
    </Card>
  );
};

const createSalesOptions = (salesList = []) => [
  { value: "", label: "All Sales" },
  ...salesList.map((sales) => ({
    value: sales.code,
    label: sales.name,
  })),
];

const FilterContainer = ({ children }) => (
  <div className="grid grid-cols-2 sm:flex sm:flex-row sm:items-center sm:justify-end gap-3 sm:gap-4">
    {children}
  </div>
);

export const DailyChartFilters = ({
  filters,
  onFilterChange,
  onReset,
  salesList = [],
}) => {
  const { maxDate } = getCurrentDateConstraints();

  return (
    <FilterContainer>
      <TextInput
        type="date"
        label="Start date"
        labelType="outside"
        value={filters.startDate}
        max={maxDate}
        onChange={(e) =>
          onFilterChange({ ...filters, startDate: e.target.value })
        }
      />
      <TextInput
        type="date"
        label="End date"
        labelType="outside"
        value={filters.endDate}
        max={maxDate}
        onChange={(e) =>
          onFilterChange({ ...filters, endDate: e.target.value })
        }
      />
      <SelectInput
        id="sales-code"
        name="salesCode"
        label="Sales"
        labelType="outside"
        value={filters.salesCode || ""}
        onChange={(e) =>
          onFilterChange({ ...filters, salesCode: e.target.value })
        }
        options={createSalesOptions(salesList)}
        className="sm:w-40"
      />
      <div className="col-span-2 sm:col-span-1 sm:mt-0">
        <Button
          variant="outline"
          className="w-full sm:w-auto mt-3"
          onClick={onReset}
        >
          Reset
        </Button>
      </div>
    </FilterContainer>
  );
};

export const MonthlyChartFilters = ({
  filters,
  onFilterChange,
  onReset,
  salesList = [],
}) => {
  const { maxMonth } = getCurrentDateConstraints();

  return (
    <FilterContainer>
      <TextInput
        type="month"
        label="Start month"
        labelType="outside"
        value={filters.startMonth}
        max={maxMonth}
        onChange={(e) =>
          onFilterChange({ ...filters, startMonth: e.target.value })
        }
      />
      <TextInput
        type="month"
        label="End month"
        labelType="outside"
        value={filters.endMonth}
        max={maxMonth}
        onChange={(e) =>
          onFilterChange({ ...filters, endMonth: e.target.value })
        }
      />
      <SelectInput
        id="sales-code"
        name="salesCode"
        label="Sales"
        labelType="outside"
        value={filters.salesCode || ""}
        onChange={(e) =>
          onFilterChange({ ...filters, salesCode: e.target.value })
        }
        options={createSalesOptions(salesList)}
        className="sm:w-40"
      />
      <div className="col-span-2 sm:col-span-1 sm:mt-0">
        <Button
          variant="outline"
          className="w-full sm:w-auto mt-3"
          onClick={onReset}
        >
          Reset
        </Button>
      </div>
    </FilterContainer>
  );
};

export const YearlyChartFilters = ({
  filters,
  onFilterChange,
  onReset,
  salesList = [],
}) => {
  const { maxYear } = getCurrentDateConstraints();

  return (
    <FilterContainer>
      <TextInput
        type="number"
        label="Year"
        labelType="outside"
        value={filters.year}
        onChange={(e) => onFilterChange({ ...filters, year: e.target.value })}
        className="sm:w-32"
        min="2015"
        max={maxYear}
        step="1"
        placeholder="YYYY"
      />
      <SelectInput
        id="sales-code"
        name="salesCode"
        label="Sales"
        labelType="outside"
        value={filters.salesCode || ""}
        onChange={(e) =>
          onFilterChange({ ...filters, salesCode: e.target.value })
        }
        options={createSalesOptions(salesList)}
        className="sm:w-40"
      />
      <div className="col-span-2 sm:col-span-1 sm:mt-0">
        <Button
          variant="outline"
          className="w-full sm:w-auto mt-3"
          onClick={onReset}
        >
          Reset
        </Button>
      </div>
    </FilterContainer>
  );
};

export const TopCustomersFilters = ({ filters, onFilterChange, onReset }) => {
  const { maxDate } = getCurrentDateConstraints();

  const limitOptions = [
    { value: "5", label: "Top 5" },
    { value: "10", label: "Top 10" },
    { value: "15", label: "Top 15" },
    { value: "20", label: "Top 20" },
  ];

  return (
    <div className="grid grid-cols-2 sm:flex sm:flex-row sm:items-center sm:justify-end gap-3 sm:gap-4 mb-4">
      <TextInput
        type="date"
        label="Start date"
        labelType="outside"
        value={filters.startDate}
        max={maxDate}
        onChange={(e) =>
          onFilterChange({ ...filters, startDate: e.target.value })
        }
      />
      <TextInput
        type="date"
        label="End date"
        labelType="outside"
        value={filters.endDate}
        max={maxDate}
        onChange={(e) =>
          onFilterChange({ ...filters, endDate: e.target.value })
        }
      />
      <SelectInput
        id="limit"
        name="limit"
        label="Limit"
        labelType="outside"
        options={limitOptions}
        value={filters.limit}
        onChange={(e) => onFilterChange({ ...filters, limit: e.target.value })}
        className="sm:w-28"
      />
      <div className="col-span-2 sm:col-span-1 sm:mt-0">
        <Button
          variant="outline"
          className="w-full sm:w-auto mt-3"
          onClick={onReset}
        >
          Reset
        </Button>
      </div>
    </div>
  );
};

export default ChartSection;
