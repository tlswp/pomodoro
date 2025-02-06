import { SettingsTab, useSettingsDialogStore } from '../model';
import { NotifySettingsForm } from './forms/notify-settings-form';
import { SoundSettingsForm } from './forms/sound-settings-form';
import { ThemesSettingsForm } from './forms/themes-settings-form';
import { TimerSettingsForm } from './forms/timer-settings-form';
import { TabItem } from './tab-item';

const Tabs = () => {
  const { selectedTab } = useSettingsDialogStore();
  switch (selectedTab) {
    case SettingsTab.TIMER:
      return (
        <TabItem>
          <TimerSettingsForm />
        </TabItem>
      );
    case SettingsTab.NOTIFICATION:
      return (
        <TabItem>
          <NotifySettingsForm />
        </TabItem>
      );
    case SettingsTab.SOUND:
      return (
        <TabItem>
          <SoundSettingsForm />
        </TabItem>
      );
    case SettingsTab.THEME:
      return (
        <TabItem>
          <ThemesSettingsForm />
        </TabItem>
      );
    case SettingsTab.DATA_PRIVACY:
      return <TabItem>5</TabItem>;

    default:
      return <div>Nothing</div>;
  }
};

export { Tabs };
