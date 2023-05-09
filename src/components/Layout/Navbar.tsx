import { useState } from "react";

import { Layout, Button, Dropdown } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";

import NavMenu from "./NavMenu";
import items from "./NavData/NavMenuItems";

const { Header } = Layout;

const Navbar: React.FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const itemsForMenu: MenuProps["items"] = items.map((item, idx) => {
    return {
      key: idx,
      label: item,
    };
  });

  const toggleMenu = (): void => {
    setCollapsed(!collapsed);
  };

  return (
    <Header className="flex justify-between items-center bg-green-600">
      <div className="text-white text-2xl font-bold ml-6">VeciApp</div>
      <div className="mr-6 lg:hidden">
        <Dropdown trigger={["click"]} menu={{ items: itemsForMenu }}>
          <Button
            className="text-white"
            type="text"
            icon={<MenuOutlined />}
            onClick={toggleMenu}
          />
        </Dropdown>
      </div>
      <NavMenu items={itemsForMenu} />
    </Header>
  );
};

export default Navbar;
