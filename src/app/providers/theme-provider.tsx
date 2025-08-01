import { useEffect } from 'react';

import { useThemeSettingsStore } from '@/entities/settings';
import { themeClasses } from '@/shared/config/theme';
import { ThemeMode, themeModeConfig } from '@/shared/config/theme-mode';
import { getSystemTheme } from '@/shared/lib/theme';

interface ThemeProviderProps {
  children?: React.ReactNode;
}

/**
 * ThemeProvider component to manage and apply theme changes.
 *
 * This component automatically updates the theme class on the `<body>` element
 * whenever the theme settings change. It is not mandatory to wrap your entire
 * application with this component to change the theme. Simply updating the
 * `themeSettings` in the store will apply the new theme globally.
 *
 * @param {React.ReactNode} [children] - Optional child components to render inside the provider.
 */

export function ThemeProvider({ children }: ThemeProviderProps) {
  const { themeSettings } = useThemeSettingsStore();

  useEffect(() => {
    const applyTheme = () => {
      const possibleThemes = Object.values(themeClasses);
      possibleThemes.forEach((t) => document.body.classList.remove(t));

      document.body.classList.add(themeClasses[themeSettings.theme]);

      Object.values(themeModeConfig).forEach((modeClass) => document.body.classList.remove(modeClass));

      if (themeSettings.mode === ThemeMode.SYSTEM) {
        document.body.classList.add(themeModeConfig[getSystemTheme()]);
      } else {
        document.body.classList.add(themeModeConfig[themeSettings.mode]);
      }
    };

    applyTheme();

    if (themeSettings.mode === ThemeMode.SYSTEM) {
      const darkMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

      const handleSystemThemeChange = () => {
        applyTheme();
      };

      darkMediaQuery.addEventListener('change', handleSystemThemeChange);

      return () => {
        darkMediaQuery.removeEventListener('change', handleSystemThemeChange);
      };
    }
  }, [themeSettings]);

  return <>{children}</>;
}
