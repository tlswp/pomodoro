import { create } from 'zustand';

import type { ISoundTypeSettings } from '../type';
import type { ISoundSettings } from '../type';

interface ISoundSettingsStore {
  soundSettings: ISoundSettings;
  updateSoundSettings: (settings: Partial<ISoundSettings>) => void;
  updateSoundByType: (
    type: 'click' | 'notification',
    settings: Partial<ISoundTypeSettings>
  ) => void;
}

export const useSoundSettingsStore = create<ISoundSettingsStore>((set) => ({
  soundSettings: {
    enabled: true,
    click: { volume: 0.5, enabled: true, selectedSound: 'click' },
    notification: { volume: 0.7, enabled: true, selectedSound: 'notification' },
  },
  updateSoundSettings: (settings) =>
    set((state) => ({
      soundSettings: { ...state.soundSettings, ...settings },
    })),
  updateSoundByType: (type, settings) =>
    set((state) => ({
      soundSettings: {
        ...state.soundSettings,
        [type]: { ...state.soundSettings[type], ...settings },
      },
    })),
}));