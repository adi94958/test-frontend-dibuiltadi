import { formatCurrency } from "../../../utils/formatHelpers";

const MonthlyStats = ({ monthlyTransactions, loading, monthlyFilters }) => {
  if (loading || !monthlyTransactions?.items?.length) {
    return null;
  }

  const items = monthlyTransactions.items;

  const totalCurrentAmount = items.reduce((sum, item) => sum + parseFloat(item.current || 0), 0);
  const totalPreviousAmount = items.reduce((sum, item) => sum + parseFloat(item.previous || 0), 0);

  const growthPercentage = totalPreviousAmount > 0
    ? (((totalCurrentAmount - totalPreviousAmount) / totalPreviousAmount) * 100).toFixed(1)
    : "0";

  const formatPeriod = () => {
    if (!monthlyFilters?.startMonth || !monthlyFilters?.endMonth) {
      return "Selected Period";
    }

    const startDate = new Date(monthlyFilters.startMonth + "-01");
    const endDate = new Date(monthlyFilters.endMonth + "-01");
    const startYear = startDate.getFullYear();
    const endYear = endDate.getFullYear();
    const startMonth = startDate.toLocaleString("en-US", { month: "short" });
    const endMonth = endDate.toLocaleString("en-US", { month: "short" });

    if (startYear === endYear) {
      return monthlyFilters.startMonth === monthlyFilters.endMonth
        ? `${startMonth} ${startYear}`
        : `${startMonth} - ${endMonth} ${startYear}`;
    }
    return `${startMonth} ${startYear} - ${endMonth} ${endYear}`;
  };

  const periodDisplay = formatPeriod();
  const previousPeriodDisplay = periodDisplay.replace(/\d{4}/g, (year) => (parseInt(year) - 1).toString());

  const StatCard = ({ title, period, amount, textColor = "text-gray-700" }) => (
    <div className="flex-1 bg-gray-50 rounded-lg p-4 flex flex-col items-center justify-center">
      <span className="text-xs text-gray-500 mb-1">{title}</span>
      <span className="text-xs text-gray-400 mb-1">{period}</span>
      <span className={`text-lg font-bold ${textColor}`}>
        {formatCurrency(amount.toString())}
      </span>
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row gap-4 mt-6">
      <StatCard
        title="Current Period"
        period={periodDisplay}
        amount={totalCurrentAmount}
        textColor="text-blue-700"
      />
      <StatCard
        title="Previous Period"
        period={previousPeriodDisplay}
        amount={totalPreviousAmount}
      />
      <div className="flex-1 bg-gray-50 rounded-lg p-4 flex flex-col items-center justify-center">
        <span className="text-xs text-gray-500 mb-1">Growth</span>
        <span className="text-xs text-gray-400 mb-1">vs Previous Year</span>
        <span className={`text-lg font-bold ${parseFloat(growthPercentage) >= 0 ? "text-green-600" : "text-red-600"}`}>
          {growthPercentage}%
        </span>
      </div>
    </div>
  );
};

export default MonthlyStats;
