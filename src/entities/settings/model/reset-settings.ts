import { defaultSettings } from '../config/default-settings';
import { useNotifySettingsStore } from './stores/notification-store';
import { useSoundSettingsStore } from './stores/sound-store';
import { useThemeSettingsStore } from './stores/theme-store';
import { useTimerSettingsStore } from './stores/timer-store';

export const resetSettings = () => {
  useTimerSettingsStore
    .getState()
    .updateTimerSettings(defaultSettings.timerSettings);
  useNotifySettingsStore
    .getState()
    .updateNotificationSettings(defaultSettings.notificationSettings);
  useSoundSettingsStore
    .getState()
    .updateSoundSettings(defaultSettings.soundSettings);
  useThemeSettingsStore
    .getState()
    .updateThemeSettings(defaultSettings.themeSettings);
};
