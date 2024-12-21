import type { ThemePresets } from '@/shared/config/theme';
import type { TimerPresets } from '@/shared/config/timer-presets';

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
