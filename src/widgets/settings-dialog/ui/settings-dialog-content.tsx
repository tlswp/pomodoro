import { DialogContent } from '@/shared/ui/dialog';
import { SidebarProvider } from '@/shared/ui/sidebar';

import { SettingsSidebar } from './sidebar';
import { Tabs } from './tabs';

const SettingsDialogContent = () => {
  return (
    <DialogContent
      className="flex h-full min-h-[calc(50svh-theme(spacing.4))] max-w-[880px]
        overflow-hidden rounded-none md:h-[600px]
        md:max-h-[calc(100svh-theme(spacing.4))] md:min-w-[500px] md:rounded-xl"
    >
      <SidebarProvider
        style={
          {
            '--sidebar-width': '220px',
            '--sidebar-width-mobile': '220px',
          } as React.CSSProperties
        }
      >
        <SettingsSidebar />
        <div className="w-full">
          <Tabs />
        </div>
      </SidebarProvider>
    </DialogContent>
  );
};

export { SettingsDialogContent };
