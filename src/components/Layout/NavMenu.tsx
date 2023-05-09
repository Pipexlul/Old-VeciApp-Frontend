import { Menu } from "antd";
import type { MenuProps } from "antd";

import items from "./NavData/NavMenuItems";

interface NavMenuProps {
  items: MenuProps["items"];
}

const NavMenu: React.FC<NavMenuProps> = ({ items }) => {
  return (
    <Menu
      className="hidden w-auto bg-transparent lg:flex"
      mode="horizontal"
      theme="dark"
      items={items}
    />
  );
};

export default NavMenu;
