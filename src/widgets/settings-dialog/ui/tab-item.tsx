import { ScrollArea } from '@/shared/ui/scroll-area';

import { tabsConfigObject } from '../config';
import { useSettingsDialogStore } from '../model';

interface ITabItemProps {
  children: React.ReactNode;
}

export const TabItem: React.FC<ITabItemProps> = ({ children }) => {
  const { selectedTab } = useSettingsDialogStore();
  return (
    <div className="h-full w-full pb-4">
      <div className="w-full">{tabsConfigObject[selectedTab].title}</div>
      <ScrollArea className="h-full w-full">{children}</ScrollArea>
    </div>
  );
};
