/**
 * Converts a time in milliseconds to a formatted string in "MM:SS" format.
 * @param {number} time - Time in milliseconds.
 * @returns {string} Formatted time string.
 */

export const formatTime = (time: number): string => {
  const minutes = time / 1000 / 60;
  const seconds = (time / 1000) % 60;
  let formattedTime = `${Math.floor(minutes).toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return formattedTime;
};
