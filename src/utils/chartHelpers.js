import { formatCurrency } from "./formatHelpers";

export const createChartOptions = (
  yAxisSuffix = "B",
  multiplier = 1000000000
) => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
      labels: {
        padding: 20,
        usePointStyle: true,
      },
    },
    tooltip: {
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      titleColor: "white",
      bodyColor: "white",
      borderColor: "rgba(255, 255, 255, 0.1)",
      borderWidth: 1,
      callbacks: {
        label: function (context) {
          const value = context.parsed.y || context.parsed;
          return (
            context.dataset.label +
            ": " +
            formatCurrency((value * multiplier).toString())
          );
        },
      },
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        color: "rgba(0, 0, 0, 0.05)",
      },
      ticks: {
        callback: function (value) {
          return value.toFixed(1) + yAxisSuffix;
        },
      },
    },
  },
});

export const createDailyChartData = (dailyTransactions) => {
  if (!dailyTransactions?.items?.length) {
    return {
      labels: [],
      datasets: [
        {
          label: "Daily Transactions",
          data: [],
          borderColor: "rgb(59, 130, 246)",
          backgroundColor: "rgba(59, 130, 246, 0.1)",
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: "rgb(59, 130, 246)",
          pointBorderColor: "white",
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6,
        },
      ],
    };
  }

  return {
    labels: dailyTransactions.items.map((item) => item.date),
    datasets: [
      {
        label: "Daily Transactions",
        data: dailyTransactions.items.map(
          (item) => parseFloat(item.amount) / 1000000000
        ),
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "rgb(59, 130, 246)",
        pointBorderColor: "white",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };
};

export const createMonthlyChartData = (monthlyTransactions) => {
  if (!monthlyTransactions?.items?.length) {
    return {
      labels: [],
      datasets: [
        {
          label: "Current Year",
          data: [],
          backgroundColor: "rgba(34, 197, 94, 0.8)",
          borderColor: "rgb(34, 197, 94)",
          borderWidth: 2,
          borderRadius: 4,
        },
        {
          label: "Previous Year",
          data: [],
          backgroundColor: "rgba(156, 163, 175, 0.8)",
          borderColor: "rgb(156, 163, 175)",
          borderWidth: 2,
          borderRadius: 4,
        },
      ],
    };
  }

  return {
    labels: monthlyTransactions.items.map((item) => item.month),
    datasets: [
      {
        label: "Current Year",
        data: monthlyTransactions.items.map(
          (item) => parseFloat(item.current) / 1000000000
        ),
        backgroundColor: "rgba(34, 197, 94, 0.8)",
        borderColor: "rgb(34, 197, 94)",
        borderWidth: 2,
        borderRadius: 4,
      },
      {
        label: "Previous Year",
        data: monthlyTransactions.items.map(
          (item) => parseFloat(item.previous) / 1000000000
        ),
        backgroundColor: "rgba(156, 163, 175, 0.8)",
        borderColor: "rgb(156, 163, 175)",
        borderWidth: 2,
        borderRadius: 4,
      },
    ],
  };
};

export const createYearlyChartData = (yearlyTransactions) => {
  if (!yearlyTransactions?.current) {
    return {
      labels: ["Years"],
      datasets: [
        {
          label: "Current Year",
          data: [],
          backgroundColor: "rgba(34, 197, 94, 0.8)",
          borderColor: "rgb(34, 197, 94)",
          borderWidth: 2,
          borderRadius: 4,
        },
        {
          label: "Previous Year",
          data: [],
          backgroundColor: "rgba(156, 163, 175, 0.8)",
          borderColor: "rgb(156, 163, 175)",
          borderWidth: 2,
          borderRadius: 4,
        },
      ],
    };
  }

  return {
    labels: ["Years"],
    datasets: [
      {
        label: "Current Year",
        data: [parseFloat(yearlyTransactions.current.amount) / 1000000000000],
        backgroundColor: "rgba(34, 197, 94, 0.8)",
        borderColor: "rgb(34, 197, 94)",
        borderWidth: 2,
        borderRadius: 4,
      },
      {
        label: "Previous Year",
        data: [parseFloat(yearlyTransactions.previous.amount) / 1000000000000],
        backgroundColor: "rgba(156, 163, 175, 0.8)",
        borderColor: "rgb(156, 163, 175)",
        borderWidth: 2,
        borderRadius: 4,
      },
    ],
  };
};
