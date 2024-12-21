import type { ITimerSettings } from '../model';
import { TimerPresets } from '../model';

export const TimerPresetsConfig: Record<
  TimerPresets,
  Partial<ITimerSettings>
> = {
  [TimerPresets.CLASSIC]: {
    session: 25,
    longBreak: 15,
    shortBreak: 5,
    sessionCount: 4,
    preset: TimerPresets.CLASSIC,
  },
  [TimerPresets.DEEP_FOCUS]: {
    session: 50,
    longBreak: 20,
    shortBreak: 10,
    sessionCount: 2,
    preset: TimerPresets.DEEP_FOCUS,
  },
  [TimerPresets.QUICK_START]: {
    session: 15,
    longBreak: 10,
    shortBreak: 3,
    sessionCount: 6,
    preset: TimerPresets.QUICK_START,
  },
  [TimerPresets.CUSTOM]: {
    preset: TimerPresets.CUSTOM,
  },
};
