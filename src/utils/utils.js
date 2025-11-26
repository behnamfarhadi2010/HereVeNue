export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatCurrency = (amount) => {
  const numericAmount = parseFloat(amount);
  if (isNaN(numericAmount)) return "$0.00";

  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
  }).format(numericAmount);
};

export const formatTime = (timestamp) => {
  return new Date(timestamp).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};
