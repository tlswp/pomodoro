import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { TimerPresets } from '@/shared/config/timer-presets';

import { TimerPresetsConfig } from '../../config';
import { type ITimerSettings } from '../type';

interface ITimerSettingsStore {
  timerSettings: ITimerSettings;
  updateTimerSettings: (settings: Partial<ITimerSettings>) => void;
  updateSettingsByType: (type: TimerPresets) => void;
}

export const useTimerSettingsStore = create<ITimerSettingsStore>()(
  persist(
    (set) => ({
      timerSettings: {
        session: 25 * 60 * 1000,
        longBreak: 15 * 60 * 1000,
        shortBreak: 5 * 60 * 1000,
        sessionCount: 4,
        preset: TimerPresets.CLASSIC,
        autoPlaySession: false,
        autoPlayBreak: false,
      },
      updateTimerSettings: (settings) =>
        set((state) => ({
          timerSettings: { ...state.timerSettings, ...settings },
        })),
      updateSettingsByType: (type: TimerPresets) =>
        set((state) => ({
          timerSettings: {
            ...state.timerSettings,
            ...TimerPresetsConfig[type],
          },
        })),
    }),
    {
      name: 'timer-settings',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({ timerSettings: state.timerSettings }),
    }
  )
);
