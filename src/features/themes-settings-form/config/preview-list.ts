import { ThemePresets } from '@/shared/config/theme';

import type { IThemePreview } from '../model';

export const themePreviewList: IThemePreview[] = [
  {
    label: 'Minimalist',
    value: ThemePresets.MINIMALIST,
    colors: {
      border: '#475569',
      from: '#39475B',
      to: '#627289',
    },
  },
  {
    label: 'Pomodoro',
    value: ThemePresets.POMODORO,
    colors: {
      border: '#BE123C',
      from: '#BE123C',
      to: '#FDA4AF',
    },
  },
  {
    label: 'Retro',
    value: ThemePresets.RETRO,
    colors: {
      border: '#57534E',
      from: '#57534E',
      to: '#D6D3D1',
    },
  },
  {
    label: 'Neon Lights',
    value: ThemePresets.NEON_LIGHTS,
    colors: {
      border: '#A78BFA',
      from: '#A78BFA',
      to: '#99F6E4',
    },
  },
  {
    label: 'Playful',
    value: ThemePresets.PLAYFUL,
    colors: {
      border: '#F472B6',
      from: '#FBCFE8',
      to: '#F472B6',
    },
  },
];
