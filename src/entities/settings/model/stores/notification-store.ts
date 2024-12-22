import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { INotificationSettings } from '../type';

interface INotifySettingsStore {
  notificationSettings: INotificationSettings;
  updateNotificationSettings: (
    settings: Partial<INotificationSettings>
  ) => void;
}

export const useNotifySettingsStore = create<INotifySettingsStore>()(
  persist(
    (set) => ({
      notificationSettings: {
        browser: true,
        toast: false,
      },
      updateNotificationSettings: (settings) =>
        set((state) => ({
          notificationSettings: { ...state.notificationSettings, ...settings },
        })),
    }),
    {
      name: 'notification-settings',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        notificationSettings: state.notificationSettings,
      }),
    }
  )
);
