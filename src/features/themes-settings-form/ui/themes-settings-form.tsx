import { useThemeSettingsStore } from '@/entities/settings/model';
import { themeClasses, type ThemePresets } from '@/shared/config/theme';

import { themePreviewList } from '../config';
import { ThemeItem } from './theme-item';

const ThemesSettingsForm = () => {
  const { themeSettings, updateThemeSettings } = useThemeSettingsStore();

  const handleThemeChange = (theme: ThemePresets) => {
    updateThemeSettings({ theme });
    document.body.className = themeClasses[theme];
  };
  return (
    <div>
      <div className="max-w-72 text-sm text-muted-foreground">
        Pick a timer style that matches your vibe and keeps you motivated.
      </div>
      <div className="mt-9 flex flex-wrap gap-4">
        {themePreviewList.map((theme) => (
          <ThemeItem
            selected={theme.value === themeSettings.theme}
            onClick={handleThemeChange}
            key={theme.value}
            {...theme}
          />
        ))}
      </div>
    </div>
  );
};

export { ThemesSettingsForm };
