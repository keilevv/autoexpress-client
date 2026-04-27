import { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { Tabs, Input, Breadcrumb } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import StorageInventoryContainer from "./Storage";
import ConsumptionInventoryContainer from "./Consumption";
import InventoryRequest from "./Requests/InventoryRequest";
import Options from "../../../components/operations/Inventory/Options";
import _debounce from "lodash/debounce";
import { useSelector } from "react-redux";
import InventoryRequestsContainer from "./Requests";

function InventoryContainer() {
  const { owner = "autoexpress" } = useParams();
  const [currentTab, setCurrentTab] = useState(null);
  const [refresh, setRefresh] = useState(0);
  const [searchValue, setSearchValue] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);

  const isAddConsumption = location.pathname.includes("/consumption/add");

  const items = useMemo(() => {
    const allItems = [
      {
        key: "storage",
        label: <p className="font-semibold text-base">Inventario de almacén</p>,
        children: (
          <StorageInventoryContainer
            owner={owner}
            refresh={refresh}
            searchValue={currentTab === "storage" ? searchValue : null}
            currentTab={currentTab}
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
            currentTab={currentTab}
          />
        ),
      },
      {
        key: "requests",
        label: (
          <p className="font-semibold text-base">
            {user?.roles.includes("admin") ? "Solicitudes" : "Mis solicitudes"}
          </p>
        ),
        children: (
          <InventoryRequestsContainer
            owner={owner}
            refresh={refresh}
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
          />
        ),
      },
    ];

    let filteredItems = allItems;
    if (owner === "autodetailing") {
      filteredItems = allItems.filter(
        (item) =>
          item.key !== "sales" &&
          item.key !== "consumption" &&
          item.key !== "requests",
      );
    }

    if (!user?.roles.includes("admin")) {
      filteredItems = filteredItems.filter((item) => item.key !== "storage");
    }

    return filteredItems;
  }, [owner, refresh, searchValue, user, currentTab, isAddConsumption]);

  useEffect(() => {
    const pathParts = location.pathname.split("/").filter(Boolean);
    const lastPart = pathParts[pathParts.length - 1];
    const isAdmin = user?.roles.includes("admin");

    const validTabs = items.map((i) => i.key);

    let tabToSet = "consumption"; // Default tab

    if (validTabs.includes(lastPart)) {
      tabToSet = lastPart;
    } else if (isAdmin && (lastPart === owner || lastPart === "inventory")) {
      tabToSet = "storage";
    }

    // Ensure non-admins don't get stuck on storage if they land there
    if (!isAdmin && tabToSet === "storage") {
      tabToSet = "consumption";
    }

    if (tabToSet !== currentTab) {
      setCurrentTab(tabToSet);
    }
  }, [location.pathname, user, items, owner, currentTab]);

  function handleSetSearchValue(value) {
    setSearchValue(value);
  }
  const debounceFn = useCallback(_debounce(handleSetSearchValue, 300), []);

  useEffect(() => {
    setSearchValue(null);
  }, [currentTab]);

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
                      navigate(`/operations/inventory/${owner}/requests`)
                    }
                  >
                    {user?.roles.includes("admin")
                      ? "Solicitudes"
                      : "Mis solicitudes"}
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
        items={items}
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
