import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { ThemePresets } from '@/shared/config/theme';

import { type IThemeSettings } from '../type';

interface IThemeSettingsStore {
  themeSettings: IThemeSettings;
  updateThemeSettings: (settings: Partial<IThemeSettings>) => void;
}

export const useThemeSettingsStore = create<IThemeSettingsStore>()(
  persist(
    (set) => ({
      themeSettings: {
        theme: ThemePresets.MINIMALIST,
      },
      updateThemeSettings: (settings) =>
        set((state) => ({
          themeSettings: { ...state.themeSettings, ...settings },
        })),
    }),
    {
      name: 'theme-settings',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({ themeSettings: state.themeSettings }),
    }
  )
);
