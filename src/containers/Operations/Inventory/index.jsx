import { useState } from "react";
import { Tabs } from "antd";
import StorageInventoryContainer from "./Storage";
import ConsumptionInventoryContainer from "./Consumption";
import TableMenu from "../../../components/operations/Inventory/TableMenu";
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
      children: <ConsumptionInventoryContainer />,
    },
  ];
  return (
    <div>
      <h1 className="text-2xl text-red-700 font-semibold mb-5 ">Inventario</h1>
      <TableMenu type={currentTab} />
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
