import React from "react";
import { SettingOutlined, UserOutlined, TeamOutlined } from "@ant-design/icons";
import { Menu } from "antd";
const items = [
  {
    key: "company-settings",
    label: <p className="text-base font-semibold">Compañía</p>,
    icon: <SettingOutlined />,
    children: [
      {
        key: "employees",
        label: "Empleados",
        icon: <TeamOutlined />,
      },
    ],
  },
  {
    key: "user",
    label: <p className="text-base font-semibold">Usuario</p>,
    icon: <UserOutlined />,
    disabled: true,
  },
];
const SettingsMenu = ({ onSelectMenuOption }) => {
  const onClick = (e) => {
    onSelectMenuOption(e.key);
  };
  return (
    <Menu
      mode="inline"
      onClick={onClick}
      defaultSelectedKeys={["employees"]}
      defaultOpenKeys={["company-settings"]}
      items={items}
      openKeys={["company-settings"]}
      className="max-w-[300px] bg-white"
    />
  );
};
export default SettingsMenu;
