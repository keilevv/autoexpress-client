import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  TeamOutlined,
  HomeOutlined,
  CarOutlined,
  CalendarOutlined,
  ContainerOutlined,
  ControlOutlined,
  DatabaseOutlined,
} from "@ant-design/icons";

function useMenu() {
  const roles = useSelector((state) => state?.auth?.user?.roles);
  const [items, setItems] = useState([]);
  const [defaultSelectedHeader, setDefaultSelectedHeader] = useState("");
  const allItems = [
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

  function getMenuProps() {
    setDefaultSelectedHeader("operations");
    let items = allItems;
    if (roles && roles.includes("autodetailing-admin")) {
      items = items.filter(
        (item) => item.key !== "inventory" && item.key !== "production"
      );
      items.push({
        key: "inventory",
        label: "Almacén",
        icon: React.createElement(ContainerOutlined),
        children: [
          { key: "inventory-autoexpress", label: "Autoexpress" },
          { key: "inventory-autodetailing", label: "Autodetailing" },
        ],
      });
      items.push({
        key: "production",
        label: "Producción",
        icon: React.createElement(ControlOutlined),
        children: [
          { key: "production-autoexpress", label: "Autoexpress" },
          { key: "production-autodetailing", label: "Autodetailing" },
        ],
      });
    }
    setItems(items);
  }

  useEffect(() => {
    getMenuProps();
  }, [window.location.pathname, roles]);

  return { items, defaultSelectedHeader };
}
export default useMenu;
