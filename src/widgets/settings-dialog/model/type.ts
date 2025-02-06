export enum SettingsTab {
  TIMER = 'TIMER',
  NOTIFICATION = 'NOTIFICATION',
  SOUND = 'SOUND',
  THEME = 'THEME',
  DATA_PRIVACY = 'DATA_PRIVACY',
}

export interface ISettingsTab {
  key: SettingsTab;
  title: string;
  icon?: React.FC<{}>;
}
