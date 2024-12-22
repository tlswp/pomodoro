/**
 * Return numbered value
 * @param value - Value to mask
 */
const maskNumber = (value: string | number) => {
  return value.toString().replace(/[^0-9]/g, '');
};

export { maskNumber };
