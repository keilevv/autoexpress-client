import { FaUsers, FaUserCog, FaWhatsapp } from "react-icons/fa";
import { FaBuildingUser } from "react-icons/fa6";

import { Menu } from "antd";
import { useEffect } from "react";
const items = [
  {
    key: "company-settings",
    label: <p className="text-base font-semibold">Compañía</p>,
    icon: <FaBuildingUser />,
    children: [
      {
        key: "employees",
        label: "Empleados",
        icon: <FaUsers />,
      },
      {
        key: "whatsapp-bot",
        label: "WhatsApp Bot",
        icon: <FaWhatsapp />,
      },
    ],
  },
  {
    key: "user",
    label: <p className="text-base font-semibold">Usuario</p>,
    icon: <FaUserCog />,
    disabled: true,
  },
];

const defaultItem = items[0].children[0];

const SettingsMenu = ({ onSelectMenuOption, setTitle }) => {
  const onClick = (e) => {
    let title = {};
    items.map((item) => {
      if (item.key === e.key) {
        title = item;
      }
      if (item.children && item.children.length > 0) {
        item.children.find((child) => {
          if (child.key === e.key) {
            title = child;
          }
        });
      }
    });
    setTitle(title);
    onSelectMenuOption(e.key);
  };

  useEffect(() => {
    setTitle(defaultItem);
  }, []);
  return (
    <Menu
      mode="inline"
      onClick={onClick}
      defaultSelectedKeys={[defaultItem.key]}
      defaultOpenKeys={["company-settings"]}
      items={items}
      className="max-w-[300px] bg-white"
    />
  );
};
export default SettingsMenu;
