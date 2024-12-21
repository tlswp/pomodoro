import { create } from 'zustand';

import { SettingsTab } from './type';

interface ISettingsDialogStore {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedTab: SettingsTab;
  setSelectedTab: (tab: SettingsTab) => void;
}

export const useSettingsDialogStore = create<ISettingsDialogStore>((set) => ({
  open: false,
  setOpen: (open: boolean) => set({ open }),
  selectedTab: SettingsTab.TIMER,
  setSelectedTab: (tab: SettingsTab) => set({ selectedTab: tab }),
}));
