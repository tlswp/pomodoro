export const formatNumber = (value: string | number, min: number, max: number) => {
  const number = Number(value);

  if (isNaN(number)) {
    return min;
  }

  if (number < min) {
    return min;
  }

  if (number > max) {
    return max;
  }

  return number;
};
