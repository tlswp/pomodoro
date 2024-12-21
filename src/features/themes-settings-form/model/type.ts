import type { ThemePresets } from '@/shared/config/theme';

export interface IThemePreview {
  label: string;
  value: ThemePresets;
  colors: {
    border: string;
    from: string;
    to: string;
  };
}
