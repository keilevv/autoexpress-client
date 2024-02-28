import { TeamOutlined, HomeOutlined, CarOutlined, ScheduleOutlined, SettingOutlined, CalendarOutlined, DollarCircleOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";


function useMenu() {
  const [items, setItems] = useState([]);
  const [defaultSelectedHeader, setDefaultSelectedHeader] = useState("");

  function getMenuProps() {
    if (window.location.pathname.includes("operations") || window.location.pathname === "/") {
      const currentItems = [{ key: "operations", label: "Inicio", icon: React.createElement(HomeOutlined) },
      { key: "jobs", label: "Trabajos", icon: React.createElement(ScheduleOutlined) },
      { key: "cars", label: "Autos", icon: React.createElement(CarOutlined) },
      { key: "operators", label: "Operadores", icon: React.createElement(TeamOutlined) },
      { key: "settings", label: "Configuracion", icon: React.createElement(SettingOutlined) }];
      setDefaultSelectedHeader("operations")
      setItems(currentItems);
    }
    if (window.location.pathname.includes("agenda") || window.location.pathname === "/agenda") {
      const currentItems = [{ key: "agenda", label: "Agenda", icon: React.createElement(CalendarOutlined) }]
      setDefaultSelectedHeader("agenda")
      setItems(currentItems)
    }

    if (window.location.pathname.includes("billing") || window.location.pathname === "/billing") {
      const currentItems = [{ key: "billing", label: "Facturacion", icon: React.createElement(DollarCircleOutlined) }]
      setDefaultSelectedHeader("billing")
      setItems(currentItems)
    }
  }

  useEffect(() => {
    getMenuProps()
  }, [window.location.pathname])

  return { items, defaultSelectedHeader }
}
export default useMenu;