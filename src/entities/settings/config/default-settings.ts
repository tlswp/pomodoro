import { ThemePresets, TimerPresets } from '../model';
import { TimerPresetsConfig } from './timer-presets';

export const defaultSettings = {
  timerSettings: TimerPresetsConfig[TimerPresets.CLASSIC],
  notificationSettings: {
    browser: true,
    toast: false,
  },
  soundSettings: {
    enabled: true,
    click: { volume: 0.5, enabled: true, selectedSound: 'click' },
    notification: { volume: 0.7, enabled: true, selectedSound: 'notification' },
  },
  themeSettings: {
    theme: ThemePresets.MINIMALIST,
  },
};