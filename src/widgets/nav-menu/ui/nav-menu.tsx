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
        <NavigationMenuItem>
          <NavLink to="/">
            {({ isActive }) => (
              <NavigationMenuLink
                active={isActive}
                className={navigationMenuTriggerStyle()}
              >
                Timer
              </NavigationMenuLink>
            )}
          </NavLink>
          <NavLink to="/task">
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
