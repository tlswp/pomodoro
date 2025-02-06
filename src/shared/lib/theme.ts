import { ThemeMode } from '../config/theme-mode';

export const getSystemTheme = () => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? ThemeMode.DARK
    : ThemeMode.LIGHT;
};
