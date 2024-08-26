import { useEffect, useState } from "react";
import { redirect } from "react-router-dom";
import { Tabs } from "antd";
import StorageInventoryContainer from "./Storage";
import ConsumptionInventoryContainer from "./Consumption";
import TableMenu from "../../../components/operations/Inventory/TableMenu";
function InventoryContainer() {
  const [currentTab, setCurrentTab] = useState("storage-inventory");

  const items = [
    {
      key: "storage-inventory",
      label: <p className="font-semibold text-base">Inventario de almacén</p>,
      children: <StorageInventoryContainer />,
    },
    {
      key: "consumption-inventory",
      label: <p className="font-semibold text-base">Inventario de consumo</p>,
      children: <ConsumptionInventoryContainer />,
    },
  ];

  useEffect(() => {
    window.location.pathname.split("/").forEach((item, index) => {
      if (item === "inventory") {
        switch (window.location.pathname.split("/")[index + 1]) {
          case "storage":
            setCurrentTab("storage-inventory");
            break;
          case "consumption":
            setCurrentTab("consumption-inventory");
            break;
        }
      }
    });
  }, [window.location.pathname]);

  return (
    <div>
      <h1 className="text-2xl text-red-700 font-semibold mb-5 ">Inventario</h1>
      <TableMenu type={currentTab} />
      <Tabs
        activeKey={currentTab}
        defaultActiveKey={currentTab}
        items={items}
        onChange={(key) => {
          setCurrentTab(key);
        }}
      />
    </div>
  );
}
export default InventoryContainer;
