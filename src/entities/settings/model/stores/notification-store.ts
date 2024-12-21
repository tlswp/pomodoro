import { create } from 'zustand';

import type { INotificationSettings } from '../type';

interface INotifySettingsStore {
  notificationSettings: INotificationSettings;
  updateNotificationSettings: (
    settings: Partial<INotificationSettings>
  ) => void;
}

export const useNotifySettingsStore = create<INotifySettingsStore>((set) => ({
  notificationSettings: {
    browser: true,
    toast: false,
  },
  updateNotificationSettings: (settings) =>
    set((state) => ({
      notificationSettings: { ...state.notificationSettings, ...settings },
    })),
}));
