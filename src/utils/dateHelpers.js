export const formatDate = (year, month, day) => {
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(
    2,
    "0"
  )}`;
};

export const formatMonth = (year, month) => {
  return `${year}-${String(month).padStart(2, "0")}`;
};

export const toApiDateFormat = (dateInput) => {
  const d = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
  const day = String(d.getDate()).padStart(2, "0");
  const month = d.toLocaleString("en-US", { month: "short" });
  const year = String(d.getFullYear()).slice(-2);
  return `${day} ${month} ${year}`;
};

export const getDefaultFilters = () => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;
  const currentDate = now.getDate();

  return {
    daily: {
      startDate: formatDate(currentYear, currentMonth, 1),
      endDate: formatDate(currentYear, currentMonth, currentDate),
    },
    monthly: {
      startMonth: formatMonth(currentYear, 1),
      endMonth: formatMonth(currentYear, currentMonth),
    },
    yearly: {
      year: currentYear.toString(),
    },
    topCustomers: {
      startDate: formatDate(currentYear, 1, 1),
      endDate: formatDate(currentYear, currentMonth, currentDate),
      limit: "5",
    },
  };
};

export const getCurrentDateConstraints = () => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;
  const currentDate = now.getDate();

  return {
    maxDate: formatDate(currentYear, currentMonth, currentDate),
    maxMonth: formatMonth(currentYear, currentMonth),
    maxYear: currentYear.toString(),
  };
};
