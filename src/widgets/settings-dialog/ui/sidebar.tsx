import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/shared/ui/sidebar';

import { tabsConfig } from '../config';
import { SettingsTab, useSettingsDialogStore } from '../model';

export function SettingsSidebar() {
  const { selectedTab, setSelectedTab } = useSettingsDialogStore();
  return (
    <Sidebar className="h-full w-[224px]">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Settings</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {tabsConfig.map((item) => (
                <SidebarMenuItem key={item.key}>
                  <SidebarMenuButton
                    disabled={item.key === SettingsTab.DATA_PRIVACY}
                    isActive={selectedTab === item.key}
                    onClick={() => setSelectedTab(item.key)}
                  >
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
