import { formatCurrency } from "../../../utils/formatHelpers";

const YearlyStats = ({ yearlyTransactions, loading }) => {
  if (
    loading ||
    !yearlyTransactions?.current ||
    !yearlyTransactions?.previous
  ) {
    return null;
  }

  return (
    <div className="flex flex-col md:flex-row gap-4 mt-6">
      <div className="flex-1 bg-gray-50 rounded-lg p-4 flex flex-col items-center justify-center">
        <span className="text-xs text-gray-500 mb-1">
          Current Year ({yearlyTransactions.current.year})
        </span>
        <span className="text-lg font-bold text-blue-700">
          {formatCurrency(yearlyTransactions.current.amount)}
        </span>
      </div>
      <div className="flex-1 bg-gray-50 rounded-lg p-4 flex flex-col items-center justify-center">
        <span className="text-xs text-gray-500 mb-1">
          Previous Year ({yearlyTransactions.previous.year})
        </span>
        <span className="text-lg font-bold text-gray-700">
          {formatCurrency(yearlyTransactions.previous.amount)}
        </span>
      </div>
      <div className="flex-1 bg-gray-50 rounded-lg p-4 flex flex-col items-center justify-center">
        <span className="text-xs text-gray-500 mb-1">Growth</span>
        <span
          className={`text-lg font-bold ${
            parseFloat(yearlyTransactions.percentage) >= 0
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {yearlyTransactions.percentage}%
        </span>
      </div>
    </div>
  );
};

export default YearlyStats;
