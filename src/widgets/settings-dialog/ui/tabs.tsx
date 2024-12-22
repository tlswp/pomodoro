import { SoundSettingsForm } from '@/features/sound-settings-form';
import { ThemesSettingsForm } from '@/features/themes-settings-form';

import { SettingsTab, useSettingsDialogStore } from '../model';
import { TabItem } from './tab-item';

const Tabs = () => {
  const { selectedTab } = useSettingsDialogStore();
  switch (selectedTab) {
    case SettingsTab.TIMER:
      return <TabItem>1</TabItem>;
    case SettingsTab.NOTIFICATION:
      return <TabItem>2</TabItem>;
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
