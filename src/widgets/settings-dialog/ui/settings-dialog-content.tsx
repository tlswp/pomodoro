import { DialogContent } from '@/shared/ui/dialog';
import { SidebarProvider } from '@/shared/ui/sidebar';

import { SettingsSidebar } from './sidebar';
import { Tabs } from './tabs';

const SettingsDialogContent = () => {
  return (
    <SidebarProvider>
      <DialogContent
        className="flex h-full min-h-[calc(50svh-theme(spacing.4))]
          max-w-[880px] overflow-hidden rounded-none md:h-[600px]
          md:max-h-[calc(100svh-theme(spacing.4))] md:min-w-[500px]
          md:rounded-xl"
      >
        <SettingsSidebar />
        <div className="w-full md:ml-[200px]">
          <Tabs />
        </div>
      </DialogContent>
    </SidebarProvider>
  );
};

export { SettingsDialogContent };
