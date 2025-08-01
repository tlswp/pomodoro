/**
 * Calculate remaining time.
 * @param {Date} startDate - Interval start time.
 * @param {number} previouslyRemainingTime - Previously stored time.
 * @returns {number} Updated remaining time in ms.
 */
export const calculateRemainingTime = (startDate: Date, previouslyRemainingTime: number) => {
  const now = new Date();
  return previouslyRemainingTime - (now.getTime() - startDate.getTime());
};
