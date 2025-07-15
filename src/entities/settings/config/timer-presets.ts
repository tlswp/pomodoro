import { TimerPresets } from '@/shared/config/timer-presets';

import type { ITimerSettings } from '../model';

export const TimerPresetsConfig: Record<TimerPresets, Partial<ITimerSettings>> = {
  [TimerPresets.CLASSIC]: {
    session: 25 * 60 * 1000,
    longBreak: 15 * 60 * 1000,
    shortBreak: 5 * 60 * 1000,
    sessionCount: 4,
    preset: TimerPresets.CLASSIC,
  },
  [TimerPresets.DEEP_FOCUS]: {
    session: 50 * 60 * 1000,
    longBreak: 20 * 60 * 1000,
    shortBreak: 10 * 60 * 1000,
    sessionCount: 2,
    preset: TimerPresets.DEEP_FOCUS,
  },
  [TimerPresets.QUICK_START]: {
    session: 15 * 60 * 1000,
    longBreak: 10 * 60 * 1000,
    shortBreak: 3 * 60 * 1000,
    sessionCount: 6,
    preset: TimerPresets.QUICK_START,
  },
  [TimerPresets.CUSTOM]: {
    preset: TimerPresets.CUSTOM,
  },
};
