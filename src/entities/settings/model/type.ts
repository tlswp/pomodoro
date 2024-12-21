import type { ThemePresets } from '@/shared/config/theme';

export enum TimerPresets {
  CLASSIC = 'CLASSIC',
  DEEP_FOCUS = 'DEEP_FOCUS',
  QUICK_START = 'QUICK_START',
  CUSTOM = 'CUSTOM',
}

export interface ITimerSettings {
  session: number;
  longBreak: number;
  shortBreak: number;
  sessionCount: number;
  autoPlaySession: boolean;
  autoPlayBreak: boolean;
  preset: TimerPresets;
}

export interface INotificationSettings {
  browser: boolean;
  toast?: boolean;
}

export interface ISoundTypeSettings {
  volume: number;
  enabled: boolean;
  selectedSound: string;
}

export interface ISoundSettings {
  enabled: boolean;
  click: ISoundTypeSettings;
  notification: ISoundTypeSettings;
}

export interface IThemeSettings {
  theme: ThemePresets;
}
