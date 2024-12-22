import { useEffect } from 'react';

import { useThemeSettingsStore } from '@/entities/settings';
import { themeClasses } from '@/shared/config/theme';

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
    const possibleThemes = Object.values(themeClasses);
    possibleThemes.forEach((t) => document.body.classList.remove(t));
    document.body.classList.add(themeClasses[themeSettings.theme]);
  }, [themeSettings]);

  return <>{children}</>;
}
