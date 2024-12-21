import { DialogContent } from '@/shared/ui/dialog';
import { SidebarProvider } from '@/shared/ui/sidebar';

import { SettingsSidebar } from './sidebar';
import { Tabs } from './tabs';

const SettingsDialogContent = () => {
  return (
    <SidebarProvider>
      <DialogContent
        className="flex h-[calc(100svh-theme(spacing.4))] min-w-[500px]
          max-w-[880px] overflow-hidden lg:max-h-[calc(50svh-theme(spacing.4))]"
      >
        <SettingsSidebar />
        <div className="ml-[200px] w-full">
          <Tabs />
        </div>
      </DialogContent>
    </SidebarProvider>
  );
};

export { SettingsDialogContent };
