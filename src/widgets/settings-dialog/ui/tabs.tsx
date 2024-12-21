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
      return <TabItem>3</TabItem>;
    case SettingsTab.THEME:
      return <TabItem>4</TabItem>;
    case SettingsTab.DATA_PRIVACY:
      return <TabItem>5</TabItem>;

    default:
      return <div>Nothing</div>;
  }
};

export { Tabs };
