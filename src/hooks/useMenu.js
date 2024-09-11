import {
  TeamOutlined,
  HomeOutlined,
  CarOutlined,
  CalendarOutlined,
  ContainerOutlined,
  ControlOutlined,
  DatabaseOutlined,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";

function useMenu() {
  const [items, setItems] = useState([]);
  const [defaultSelectedHeader, setDefaultSelectedHeader] = useState("");

  function getMenuProps() {
    const currentItems = [
      {
        key: "operations",
        label: "Inicio",
        icon: React.createElement(HomeOutlined),
      },
      {
        key: "agenda",
        label: "Agenda",
        icon: React.createElement(CalendarOutlined),
      },
      {
        key: "inventory",
        label: "Almacén",
        icon: React.createElement(ContainerOutlined),
      },
      {
        key: "production",
        label: "Producción",
        icon: React.createElement(ControlOutlined),
      },
      {
        key: "database",
        label: "Base de datos",
        icon: React.createElement(DatabaseOutlined),
        children: [
          {
            key: "cars",
            label: "Autos",
            icon: React.createElement(CarOutlined),
          },
          {
            key: "clients",
            label: "Clientes",
            icon: React.createElement(TeamOutlined),
          },
        ],
      },
    ];
    setDefaultSelectedHeader("operations");
    setItems(currentItems);
  }

  useEffect(() => {
    getMenuProps();
  }, [window.location.pathname]);

  return { items, defaultSelectedHeader };
}
export default useMenu;
