import { minutesToMs } from '@/shared/lib/time-convert';

import { TimerType } from '../model';

/**
 * Get the duration for the specified timer type.
 * @param {TimerType} timerType - Current interval type.
 * @param {Object} settings - Timer settings.
 * @returns {number} Duration in milliseconds.
 */
export const getDurationForType = (timerType: TimerType, settings: any) => {
  const { session, shortBreak, longBreak } = settings;
  switch (timerType) {
    case TimerType.SESSION:
      return minutesToMs(session);
    case TimerType.SHORT_BREAK:
      return minutesToMs(shortBreak);
    case TimerType.LONG_BREAK:
      return minutesToMs(longBreak);
    default:
      return 0;
  }
};
