import { useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Text } from "../../components/Elements";
import { MainLayout } from "../../components/Layouts";
import { getSales } from "../../redux/slices/salesSlice";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";

import {
  useIsolatedDailyTransactions,
  useIsolatedMonthlyTransactions,
  useIsolatedYearlyTransactions,
  useIsolatedTopCustomers,
} from "../../hooks/useIsolatedSummaryHooks";

import { calculateStatsCards } from "../../utils/statsHelpers";
import {
  createChartOptions,
  createDailyChartData,
  createMonthlyChartData,
  createYearlyChartData,
} from "../../utils/chartHelpers";

import {
  StatsCards,
  ChartSection,
  DailyChartFilters,
  MonthlyChartFilters,
  YearlyChartFilters,
  TopCustomersFilters,
  YearlyStats,
  MonthlyStats,
} from "./Components";

import TopCustomersTable from "./Components/TopCustomersTable";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const SummaryPage = () => {
  const dispatch = useDispatch();
  const { salesList } = useSelector((state) => state.sales);

  const dailySection = useIsolatedDailyTransactions();
  const monthlySection = useIsolatedMonthlyTransactions();
  const yearlySection = useIsolatedYearlyTransactions();
  const topCustomersSection = useIsolatedTopCustomers();

  const breadcrumbItems = [];

  useEffect(() => {
    dispatch(getSales());
  }, [dispatch]);

  if (!dailySection.isInitialized) {
    dailySection.initializeData();
  }
  if (!monthlySection.isInitialized) {
    monthlySection.initializeData();
  }
  if (!yearlySection.isInitialized) {
    yearlySection.initializeData();
  }
  if (!topCustomersSection.isInitialized) {
    topCustomersSection.initializeData();
  }

  const statsCards = useMemo(() => {
    return calculateStatsCards(
      dailySection.data,
      monthlySection.data,
      yearlySection.data,
      dailySection.filters,
      monthlySection.filters,
      yearlySection.filters
    );
  }, [
    dailySection.data,
    monthlySection.data,
    yearlySection.data,
    dailySection.filters,
    monthlySection.filters,
    yearlySection.filters,
  ]);

  const dailyChartData = useMemo(
    () => createDailyChartData(dailySection.data),
    [dailySection.data]
  );
  const monthlyChartData = useMemo(
    () => createMonthlyChartData(monthlySection.data),
    [monthlySection.data]
  );
  const yearlyChartData = useMemo(
    () => createYearlyChartData(yearlySection.data),
    [yearlySection.data]
  );

  const chartOptions = createChartOptions();
  const yearlyChartOptions = createChartOptions("T", 1000000000000);

  const error =
    dailySection.error ||
    monthlySection.error ||
    yearlySection.error ||
    topCustomersSection.error;

  if (error) {
    return (
      <MainLayout
        title="Dashboard Overview"
        caption="Transaction Summary"
        breadcrumbItems={breadcrumbItems}
      >
        <div className="flex justify-center items-center h-64">
          <Text variant="body" color="danger">
            Error loading data: {error}
          </Text>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout
      title="Dashboard Overview"
      caption="Transaction Summary"
      breadcrumbItems={breadcrumbItems}
    >
      <div className="space-y-7">
        <StatsCards statsCards={statsCards} />
        <ChartSection
          title="Daily Transactions"
          chartData={dailyChartData}
          chartOptions={chartOptions}
          loading={dailySection.loading}
          ChartComponent={Line}
        >
          <DailyChartFilters
            filters={dailySection.filters}
            onFilterChange={dailySection.updateFilters}
            onReset={dailySection.resetFilters}
            salesList={salesList}
          />
        </ChartSection>
        <ChartSection
          title="Monthly Transactions"
          chartData={monthlyChartData}
          chartOptions={chartOptions}
          loading={monthlySection.loading}
          ChartComponent={Bar}
        >
          <MonthlyChartFilters
            filters={monthlySection.filters}
            onFilterChange={monthlySection.updateFilters}
            onReset={monthlySection.resetFilters}
            salesList={salesList}
          />
          <MonthlyStats
            monthlyTransactions={monthlySection.data}
            loading={monthlySection.loading}
            monthlyFilters={monthlySection.filters}
          />
        </ChartSection>
        <ChartSection
          title="Yearly Transactions"
          chartData={yearlyChartData}
          chartOptions={yearlyChartOptions}
          loading={yearlySection.loading}
          ChartComponent={Bar}
        >
          <YearlyChartFilters
            filters={yearlySection.filters}
            onFilterChange={yearlySection.updateFilters}
            onReset={yearlySection.resetFilters}
            salesList={salesList}
          />
          <YearlyStats
            yearlyTransactions={yearlySection.data}
            loading={yearlySection.loading}
          />
        </ChartSection>
        <ChartSection title="Top Customers" showChart={false}>
          <TopCustomersFilters
            filters={topCustomersSection.filters}
            onFilterChange={topCustomersSection.updateFilters}
            onReset={topCustomersSection.resetFilters}
          />
          <TopCustomersTable
            data={topCustomersSection.data?.items}
            loading={topCustomersSection.loading}
          />
        </ChartSection>
      </div>
    </MainLayout>
  );
};

export default SummaryPage;
