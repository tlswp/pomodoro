import type { ITimerSettings } from '@/entities/settings';

export const formatToMinutes = (settings: ITimerSettings) => {
  return {
    ...settings,
    session: settings.session / 1000 / 60,
    longBreak: settings.longBreak / 1000 / 60,
    shortBreak: settings.shortBreak / 1000 / 60,
  };
};
