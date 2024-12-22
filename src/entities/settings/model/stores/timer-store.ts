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
