import { useEffect, useState, useCallback } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Tabs, Input, Breadcrumb } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import StorageInventoryContainer from "./Storage";
import ConsumptionInventoryContainer from "./Consumption";
import InventoryRequest from "./Consumption/InventoryRequest";
import Options from "../../../components/operations/Inventory/Options";
import _debounce from "lodash/debounce";
import { useSelector } from "react-redux";

function InventoryContainer({ owner }) {
  const [currentTab, setCurrentTab] = useState("storage");
  const [refresh, setRefresh] = useState(0);
  const [searchValue, setSearchValue] = useState(null);
  const [tabs, setTabs] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);

  const isAddConsumption = location.pathname.includes("/consumption/add");

  useEffect(() => {
    switch (owner) {
      case "autodetailing":
        setTabs(items.filter((item) => item.key !== "sales"));
        break;
      default:
        setTabs(items);
        break;
    }
    if (!user?.roles.includes("admin")) {
      setTabs(items.filter((item) => item.key !== "storage"));
    }
  }, [owner, refresh, searchValue, user, location.pathname]);

  const items = [
    {
      key: "storage",
      label: <p className="font-semibold text-base">Inventario de almacén</p>,
      children: (
        <StorageInventoryContainer
          owner={owner}
          refresh={refresh}
          searchValue={currentTab === "storage" ? searchValue : null}
        />
      ),
    },
    {
      key: "consumption",
      label: <p className="font-semibold text-base">Inventario de consumo</p>,
      children: isAddConsumption ? (
        <InventoryRequest owner={owner} />
      ) : (
        <ConsumptionInventoryContainer
          owner={owner}
          refresh={refresh}
          searchValue={currentTab === "consumption" ? searchValue : null}
        />
      ),
    },
    // {
    //   key: "sales",
    //   label: <p className="font-semibold text-base">Ventas</p>,
    //   children: (
    //     <SalesInventoryContainer
    //       refresh={refresh}
    //       searchValue={currentTab === "sales" ? searchValue : null}
    //     />
    //   ),
    // },
  ];

  useEffect(() => {
    window.location.pathname.split("/").forEach((item, index) => {
      if (!user?.roles.includes("admin")) {
        setCurrentTab("consumption");
      }
      if (item === "inventory") {
        switch (window.location.pathname.split("/")[index + 1]) {
          case "storage":
            setCurrentTab("storage");
            break;
          case "consumption":
            setCurrentTab("consumption");
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
    getCurrentTab();
  }, [window.location.pathname]);

  function getCurrentTab() {
    const splitItems = window.location.pathname
      .split("/")
      .filter((item) => item !== "");

    if (splitItems.includes("consumption")) {
      setCurrentTab("consumption");
    } else if (splitItems.includes("storage")) {
      setCurrentTab("storage");
    }
  }

  return (
    <div>
      <h1 className="text-2xl text-red-700 font-semibold mb-5 ">
        Almacén {owner.charAt(0).toUpperCase() + owner.slice(1)}
      </h1>
      <div className="flex flex-col md:flex-row gap-5 mb-4">
        {isAddConsumption && (
          <Breadcrumb
            items={[
              {
                title: (
                  <a onClick={() => navigate("/operations")}>Operaciones</a>
                ),
              },
              {
                title: (
                  <a onClick={() => navigate(`/operations/inventory/${owner}`)}>
                    Inventario
                  </a>
                ),
              },
              {
                title: (
                  <a
                    onClick={() =>
                      navigate(`/operations/inventory/${owner}/consumption`)
                    }
                  >
                    Consumo
                  </a>
                ),
              },
              {
                title: (
                  <p className="text text-red-700 font-semibold">
                    Solicitar materiales
                  </p>
                ),
              },
            ]}
          />
        )}
        {!isAddConsumption && (
          <Input
            prefix={<SearchOutlined className="text-gray-500 mx-[6px]" />}
            className="w-full max-h-[32px] "
            placeholder={currentTab === "sales" ? "Cliente..." : "Material..."}
            onChange={(e) => {
              debounceFn(e.target.value);
            }}
          />
        )}
        {!isAddConsumption && (
          <Options
            owner={owner}
            type={currentTab}
            onFinish={() => {
              setRefresh(refresh + 1);
            }}
          />
        )}
      </div>
      <Tabs
        activeKey={currentTab}
        defaultActiveKey={currentTab}
        items={tabs}
        onChange={(key) => {
          setCurrentTab(key);
          navigate(`/operations/inventory${owner ? `/${owner}/${key}` : ``}`, {
            replace: true,
          });
        }}
      />
    </div>
  );
}
export default InventoryContainer;
