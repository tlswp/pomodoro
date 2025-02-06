import { NavLink } from 'react-router';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/shared/ui/navigation-menu';

const NavMenu = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem className="pointer-events-none opacity-50">
          <NavLink to="/">
            {({ isActive }) => (
              <NavigationMenuLink
                active={isActive}
                className={navigationMenuTriggerStyle()}
              >
                Timer (soon)
              </NavigationMenuLink>
            )}
          </NavLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavLink to="/">
            {({ isActive }) => (
              <NavigationMenuLink
                active={isActive}
                className={navigationMenuTriggerStyle()}
              >
                Task List
              </NavigationMenuLink>
            )}
          </NavLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export { NavMenu };
