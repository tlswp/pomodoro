import type { ITimerSettings } from '@/entities/settings';

export const formatToMinutesByKey = (
  key: keyof ITimerSettings,
  value: ITimerSettings[keyof ITimerSettings]
) => {
  switch (key) {
    case 'session':
    case 'longBreak':
    case 'shortBreak':
      return (typeof value === 'number' ? value : 1000 * 60) / 1000 / 60;
    default:
      return value;
  }
};
