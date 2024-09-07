import { useEffect, useState, useCallback } from "react";
import { Tabs, Input } from "antd";
import JobsContainer from "./Jobs";

import ProductionOptions from "../../../components/operations/Production/Options";
import _debounce from "lodash/debounce";
function ProductionContainer() {
  const [currentTab, setCurrentTab] = useState("all");
  const [refresh, setRefresh] = useState(0);
  const [searchValue, setSearchValue] = useState(null);
  const items = [
    {
      key: "all",
      label: <p className="font-semibold text-base">Todas las O.T.</p>,
      children: (
        <JobsContainer
          refresh={refresh}
          searchValue={currentTab === "storage-inventory" ? searchValue : null}
        />
      ),
    },
    {
      key: "actives",
      label: <p className="font-semibold text-base">O.T. activas</p>,
      children: (
        <JobsContainer
          refresh={refresh}
          searchValue={currentTab === "storage-inventory" ? searchValue : null}
        />
      ),
    },
    {
      key: "finished",
      label: <p className="font-semibold text-base">O.T. terminadas</p>,
      children: (
        <JobsContainer
          refresh={refresh}
          searchValue={currentTab === "storage-inventory" ? searchValue : null}
        />
      ),
    },
  ];

  useEffect(() => {
    window.location.pathname.split("/").forEach((item, index) => {
      if (item === "production") {
        switch (window.location.pathname.split("/")[index + 1]) {
          case "all":
            setCurrentTab("all");
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
      <h1 className="text-2xl text-red-700 font-semibold mb-5 ">Producción</h1>
      <div className="flex flex-col md:flex-row gap-5 mb-4">
        <Input
          className="w-full max-w-[183px] max-h-[32px]"
          placeholder="Buscar por nombre"
          onChange={(e) => {
            debounceFn(e.target.value);
          }}
        />
        <ProductionOptions
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
export default ProductionContainer;
