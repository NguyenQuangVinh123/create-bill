const toDate = (value: Date | string) =>
  value instanceof Date ? value : new Date(value);

export const formatDate = (dateStr: Date | string) => {
  const d = toDate(dateStr);
  const date = new Date(d.getTime() + d.getTimezoneOffset() * 60000 + (7 * 60 * 60000));
  // Extract date components
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = date.getFullYear();

  // Extract time components
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  // Format as DD/MM/YYYY hh:mm
  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

export const formatDateNotHour = (dateStr: Date | string) => {
  const d = toDate(dateStr);
  const date = new Date(d.getTime() + d.getTimezoneOffset() * 60000 + (7 * 60 * 60000));
  // Extract date components
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = date.getFullYear();

  // Format as DD/MM/YYYY hh:mm
  return `${day}/${month}/${year}`;
};

export const formatWeekdayVi = (dateStr: Date | string) => {
  const d = toDate(dateStr);
  const date = new Date(d.getTime() + d.getTimezoneOffset() * 60000 + (7 * 60 * 60000));
  return date.toLocaleDateString("vi-VN", { weekday: "long" });
};