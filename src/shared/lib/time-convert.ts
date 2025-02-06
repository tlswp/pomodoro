/**
 * Convert minutes to milliseconds.
 * @param {number} minutes - Minutes value.
 * @returns {number} Milliseconds.
 */
export const minutesToMs = (minutes: number) => minutes * 60 * 1000;

/**
 * Convert milliseconds to minutes.
 * @param {number} ms - Milliseconds value.
 * @returns {number} Minutes.
 */
export const msToMinutes = (ms: number) => ms / 60 / 1000;
