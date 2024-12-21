import { create } from 'zustand';

import type { ITimerSettings } from '../type';
import { TimerPresets } from '../type';

interface ITimerSettingsStore {
  timerSettings: ITimerSettings;
  updateTimerSettings: (settings: Partial<ITimerSettings>) => void;
}

export const useTimerSettingsStore = create<ITimerSettingsStore>((set) => ({
  timerSettings: {
    session: 25,
    longBreak: 15,
    shortBreak: 5,
    sessionCount: 4,
    autoPlaySession: false,
    autoPlayBreak: false,
    preset: TimerPresets.CLASSIC,
  },
  updateTimerSettings: (settings) =>
    set((state) => ({
      timerSettings: { ...state.timerSettings, ...settings },
    })),
}));