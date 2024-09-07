import {
  TeamOutlined,
  HomeOutlined,
  CarOutlined,
  CalendarOutlined,
  ContainerOutlined,
  ControlOutlined,
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
      { key: "cars", label: "Autos", icon: React.createElement(CarOutlined) },
      {
        key: "clients",
        label: "Clientes",
        icon: React.createElement(TeamOutlined),
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
