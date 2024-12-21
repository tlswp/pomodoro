import {
  BellIcon,
  ClockIcon,
  DatabaseIcon,
  ImageIcon,
  MusicIcon,
} from 'lucide-react';

import type { ISettingsTab } from '../model';
import { SettingsTab } from '../model';

export const tabsConfig: ISettingsTab[] = [
  {
    title: 'Timer',
    key: SettingsTab.TIMER,
    icon: ClockIcon,
  },
  {
    title: 'Notifications',
    key: SettingsTab.NOTIFICATION,
    icon: BellIcon,
  },
  {
    title: 'Sounds',
    key: SettingsTab.SOUND,
    icon: MusicIcon,
  },
  {
    title: 'Themes',
    key: SettingsTab.THEME,
    icon: ImageIcon,
  },
  {
    title: 'Data and Privacy',
    key: SettingsTab.DATA_PRIVACY,
    icon: DatabaseIcon,
  },
];

export const tabsConfigObject = Object.fromEntries(
  tabsConfig.map((item) => [item.key, item])
) as Record<SettingsTab, ISettingsTab>;
