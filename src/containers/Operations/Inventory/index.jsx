import { useState } from "react";
import { Tabs } from "antd";
import StorageInventoryContainer from "./Storage";
import StorageMenu from "../../../components/operations/Inventory/StorageMenu";
function InventoryContainer() {
  const [currentTab, setCurrentTab] = useState("storage-inventory");

  const items = [
    {
      key: "storage-inventory",
      label: "Inventario principal",
      children: <StorageInventoryContainer />,
    },
    {
      key: "consumption-inventory",
      label: "Inventario de consumo",
      children: <div> Inventario de consumos</div>,
    },
  ];
  return (
    <div>
      <h1 className="text-2xl text-red-700 font-semibold mb-5 ">Inventario</h1>
      <StorageMenu />
      <Tabs
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
