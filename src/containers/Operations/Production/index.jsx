import { useEffect, useState, useCallback } from "react";
import { Tabs, Input } from "antd";
import JobsContainer from "./Jobs";
import ProductionOptions from "../../../components/operations/Production/Options";
import _debounce from "lodash/debounce";
import { getFilterString } from "../../../helpers";

function ProductionContainer({ owner }) {
  const [currentTab, setCurrentTab] = useState("job-orders");
  const [refresh, setRefresh] = useState(0);
  const [searchValue, setSearchValue] = useState(null);
  const [filterString, setFilterString] = useState("");
  const items = [
    {
      key: "job-orders",
      label: <p className="font-semibold text-base"> Órdenes de trabajo</p>,
      children: (
        <JobsContainer
          owner={owner}
          refresh={refresh}
          searchValue={currentTab === "job-orders" ? searchValue : null}
          filterString={currentTab === "job-orders" ? filterString : null}
        />
      ),
    },
    // {
    //   key: "quality-control",
    //   label: <p className="font-semibold text-base"> Control de calidad</p>,
    //   children: (
    //     <JobsContainer
    //       refresh={refresh}
    //       searchValue={currentTab === "storage-inventory" ? searchValue : null}
    //     />
    //   ),
    // },
  ];

  useEffect(() => {
    window.location.pathname.split("/").forEach((item, index) => {
      if (item === "production") {
        switch (window.location.pathname.split("/")[index + 1]) {
          case "job-orders":
            setCurrentTab("job-orders");
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

  function onApplyFilters(values) {
    if (Object.values(values).length > 0) {
      setFilterString(getFilterString(values));
    } else {
      setFilterString("");
    }
  }

  return (
    <div>
      <h1 className="text-2xl text-red-700 font-semibold mb-5 ">
        Producción{" "}
        {owner ? owner.charAt(0).toUpperCase() + owner.slice(1) : null}
      </h1>
      <div className="flex flex-col md:flex-row gap-5 mb-4">
        <ProductionOptions
          owner={owner}
          onSearch={(value) => {
            debounceFn(value);
          }}
          onApplyFilters={onApplyFilters}
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
