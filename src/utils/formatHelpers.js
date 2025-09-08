export const formatNumber = (number) => {
  if (number === null || number === undefined || isNaN(number)) return "0";
  return new Intl.NumberFormat("id-ID", {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(parseFloat(number));
};

export const formatCurrency = (amount) => {
  const formattedNumber = formatNumber(amount);
  return `Rp ${formattedNumber}`;
};

export const formatDate = (dateString) => {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleDateString("id-ID");
};
