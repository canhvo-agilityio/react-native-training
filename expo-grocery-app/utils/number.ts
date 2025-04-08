export const formatDecimalInput = (value = ''): string => {
  const numericValue = value.toString().replace(/[^0-9]/g, '');

  if (!numericValue) return '';

  return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const unformatDecimalInput = (value = ''): string => {
  const unformattedValue = value.toString().replace(/,/g, '');

  const numericValue = unformattedValue.replace(/[^0-9.]/g, '');

  return numericValue;
};
