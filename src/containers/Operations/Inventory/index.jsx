import { useEffect, useState, useCallback } from "react";
import { Tabs, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import StorageInventoryContainer from "./Storage";
import ConsumptionInventoryContainer from "./Consumption";
import SalesInventoryContainer from "./Sales";
import Options from "../../../components/operations/Inventory/Options";
import _debounce from "lodash/debounce";
function InventoryContainer() {
  const [currentTab, setCurrentTab] = useState("storage-inventory");
  const [owner, setOwner] = useState("autoexpress");
  const [refresh, setRefresh] = useState(0);
  const [searchValue, setSearchValue] = useState(null);
  const items = [
    {
      key: "storage-inventory",
      label: <p className="font-semibold text-base">Inventario de almacén</p>,
      children: (
        <StorageInventoryContainer
          owner={owner}
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
          owner={owner}
          refresh={refresh}
          searchValue={
            currentTab === "consumption-inventory" ? searchValue : null
          }
        />
      ),
    },
    {
      key: "sales",
      label: <p className="font-semibold text-base">Ventas</p>,
      children: (
        <SalesInventoryContainer
          refresh={refresh}
          searchValue={currentTab === "sales" ? searchValue : null}
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

  useEffect(() => {
    getInventoryOwner();
  }, [window.location.pathname]);

  function getInventoryOwner() {
    const splitItems = window.location.pathname
      .split("/")
      .filter((item) => item !== "");

    splitItems.forEach((item, index) => {
      if (item === "inventory" && index + 1 < splitItems.length) {
        setOwner(splitItems[index + 1]);
      }
    });
  }

  return (
    <div>
      <h1 className="text-2xl text-red-700 font-semibold mb-5 ">
        Almacén {owner.charAt(0).toUpperCase() + owner.slice(1)}
      </h1>
      <div className="flex flex-col md:flex-row gap-5 mb-4">
        <Input
          prefix={<SearchOutlined className="text-gray-500 mx-[6px]" />}
          className="w-full max-h-[32px] "
          placeholder={currentTab === "sales" ? "Cliente..." : "Material..."}
          onChange={(e) => {
            debounceFn(e.target.value);
          }}
        />
        <Options
          owner={owner}
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
