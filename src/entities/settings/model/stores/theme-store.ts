import { create } from 'zustand';

import { type IThemeSettings, ThemePresets } from '../type';

interface IThemeSettingsStore {
  themeSettings: IThemeSettings;
  updateThemeSettings: (settings: Partial<IThemeSettings>) => void;
}

export const useThemeSettingsStore = create<IThemeSettingsStore>((set) => ({
  themeSettings: {
    theme: ThemePresets.MINIMALIST,
  },
  updateThemeSettings: (settings) =>
    set((state) => ({
      themeSettings: { ...state.themeSettings, ...settings },
    })),
}));
