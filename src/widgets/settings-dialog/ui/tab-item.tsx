import { DialogTitle } from '@radix-ui/react-dialog';

import { ScrollArea } from '@/shared/ui/scroll-area';
import { SidebarTrigger } from '@/shared/ui/sidebar';

import { tabsConfigObject } from '../config';
import { useSettingsDialogStore } from '../model';

interface ITabItemProps {
  children: React.ReactNode;
}

export const TabItem: React.FC<ITabItemProps> = ({ children }) => {
  const { selectedTab } = useSettingsDialogStore();
  return (
    <div className="h-full w-full pb-4">
      <div className="flex w-full items-center gap-2">
        <SidebarTrigger className="md:hidden" />
        <DialogTitle>{tabsConfigObject[selectedTab].title}</DialogTitle>
      </div>
      <ScrollArea
        viewportClassName="pb-4 px-4 md:pl-0"
        className="-mx-4 mt-4 h-full w-[calc(100%+theme(spacing.10))] md:mx-0
          md:w-full"
      >
        {children}
      </ScrollArea>
    </div>
  );
};
