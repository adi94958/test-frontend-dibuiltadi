// Format number without decimal places
export const formatNumber = (number) => {
  if (number === null || number === undefined || isNaN(number)) return "0";
  return new Intl.NumberFormat("id-ID", {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(parseFloat(number));
};

// Format currency to Indonesian Rupiah
export const formatCurrency = (amount) => {
  const formattedNumber = formatNumber(amount);
  return `Rp ${formattedNumber}`;
};

// Format date to Indonesian locale
export const formatDate = (dateString) => {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleDateString("id-ID");
};
