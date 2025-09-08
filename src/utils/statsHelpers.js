export const calculateDailyStats = (dailyTransactions, dailyFilters) => {
  let dailyTotal = "0";
  let dateRange = "";

  if (dailyTransactions?.items?.length) {
    const items = dailyTransactions.items;

    // Calculate total for the selected date range
    const totalAmount = items.reduce((sum, item) => {
      return sum + parseFloat(item.amount || 0);
    }, 0);

    dailyTotal = totalAmount.toString();
  }

  // Format date range for display
  if (dailyFilters?.startDate && dailyFilters?.endDate) {
    const startDate = new Date(dailyFilters.startDate);
    const endDate = new Date(dailyFilters.endDate);

    const formatDateForDisplay = (date) => {
      return date.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    };

    const startFormatted = formatDateForDisplay(startDate);
    const endFormatted = formatDateForDisplay(endDate);

    if (dailyFilters.startDate === dailyFilters.endDate) {
      dateRange = startFormatted;
    } else {
      dateRange = `${startFormatted} - ${endFormatted}`;
    }
  }

  return { total: dailyTotal, dateRange };
};

export const calculateMonthlyStats = (monthlyTransactions, monthlyFilters) => {
  let monthlyTotal = "0";
  let monthlyGrowth = "0";
  let monthlyPeriod = "";

  if (monthlyTransactions?.items?.length) {
    const items = monthlyTransactions.items;

    // Calculate total for the selected month range (akumulasi semua bulan)
    const totalCurrentAmount = items.reduce((sum, item) => {
      return sum + parseFloat(item.current || 0);
    }, 0);

    const totalPreviousAmount = items.reduce((sum, item) => {
      return sum + parseFloat(item.previous || 0);
    }, 0);

    monthlyTotal = totalCurrentAmount.toString();

    // Calculate growth based on total accumulated amounts
    if (totalPreviousAmount > 0) {
      monthlyGrowth = (
        ((totalCurrentAmount - totalPreviousAmount) / totalPreviousAmount) *
        100
      ).toFixed(1);
    }
  }

  // Format period display for card
  if (monthlyFilters?.startMonth && monthlyFilters?.endMonth) {
    const startDate = new Date(monthlyFilters.startMonth + "-01");
    const endDate = new Date(monthlyFilters.endMonth + "-01");

    const startYear = startDate.getFullYear();
    const endYear = endDate.getFullYear();
    const startMonth = startDate.toLocaleString("id-ID", { month: "short" });
    const endMonth = endDate.toLocaleString("id-ID", { month: "short" });

    if (startYear === endYear) {
      if (monthlyFilters.startMonth === monthlyFilters.endMonth) {
        monthlyPeriod = `${startMonth} ${startYear}`;
      } else {
        monthlyPeriod = `${startMonth} - ${endMonth} ${startYear}`;
      }
    } else {
      monthlyPeriod = `${startMonth} ${startYear} - ${endMonth} ${endYear}`;
    }
  }

  return { total: monthlyTotal, growth: monthlyGrowth, monthlyPeriod };
};

export const calculateYearlyStats = (yearlyTransactions, yearlyFilters) => {
  let yearlyTotal = "0";
  let yearlyGrowth = "0";
  let yoyGrowth = "0";
  let selectedYear = "";

  const year = yearlyFilters?.year
    ? parseInt(yearlyFilters.year)
    : new Date().getFullYear();
  selectedYear = year.toString();

  if (yearlyTransactions?.current?.amount) {
    // Use the data from the selected year filter
    yearlyTotal = yearlyTransactions.current.amount;
    yearlyGrowth = yearlyTransactions.percentage
      ? parseFloat(yearlyTransactions.percentage).toFixed(1)
      : "0";
    yoyGrowth = yearlyTransactions.percentage
      ? parseFloat(yearlyTransactions.percentage).toFixed(1)
      : "0";
  }

  return { total: yearlyTotal, growth: yearlyGrowth, yoyGrowth, selectedYear };
};

export const calculateStatsCards = (
  dailyTransactions,
  monthlyTransactions,
  yearlyTransactions,
  dailyFilters,
  monthlyFilters,
  yearlyFilters
) => {
  const daily = calculateDailyStats(dailyTransactions, dailyFilters);
  const monthly = calculateMonthlyStats(monthlyTransactions, monthlyFilters);
  const yearly = calculateYearlyStats(yearlyTransactions, yearlyFilters);

  return {
    daily,
    monthly,
    yearly: {
      total: yearly.total,
      growth: yearly.growth,
      selectedYear: yearly.selectedYear,
    },
    yoyGrowth: yearly.yoyGrowth,
  };
};
