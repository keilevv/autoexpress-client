import { useEffect, useState, useCallback } from "react";
import { Tabs, Input } from "antd";
import StorageInventoryContainer from "./Storage";
import ConsumptionInventoryContainer from "./Consumption";
import TableMenu from "../../../components/operations/Inventory/TableMenu";
import _debounce from "lodash/debounce";
function InventoryContainer() {
  const [currentTab, setCurrentTab] = useState("storage-inventory");
  const [refresh, setRefresh] = useState(0);
  const [searchValue, setSearchValue] = useState(null);
  const items = [
    {
      key: "storage-inventory",
      label: <p className="font-semibold text-base">Inventario de almacén</p>,
      children: (
        <StorageInventoryContainer
          refresh={refresh}
          searchValue={currentTab === "storage-inventory" ? searchValue : null}
        />
      ),
    },
    {
      key: "consumption-inventory",
      label: <p className="font-semibold text-base">Inventario de consumo</p>,
      children: (
        <ConsumptionInventoryContainer
          refresh={refresh}
          searchValue={
            currentTab === "consumption-inventory" ? searchValue : null
          }
        />
      ),
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

  function handleSetSearchValue(value) {
    setSearchValue(value);
  }
  const debounceFn = useCallback(_debounce(handleSetSearchValue, 300), []);

  useEffect(() => {
    setSearchValue(null);
  }, [currentTab]);
  return (
    <div>
      <h1 className="text-2xl text-red-700 font-semibold mb-5 ">Almacén</h1>
      <div className="flex h-[32px] gap-5 mb-4">
        <Input
          className="w-full max-w-[183px]"
          placeholder="Buscar por nombre"
          disabled={currentTab !== "storage-inventory"}
          onChange={(e) => {
            debounceFn(e.target.value);
          }}
        />
        <TableMenu
          type={currentTab}
          onFinish={() => {
            setRefresh(refresh + 1);
          }}
        />
      </div>
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
