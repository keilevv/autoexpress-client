import { useEffect, useState } from "react";
import { getFilterString } from "../../../helpers";
/* Hooks*/
import useCars from "../../../hooks/useCars";
/* Components */
import CarsTable from "../../../components/operations/Cars/CarsTable";
import TableActions from "../../../components/operations/TableActions";
import { useSelector } from "react-redux";
import { Tabs } from "antd";
import "./style.css";

function CarsContainer() {
  const [currentTab, setCurrentTab] = useState("active");
  const user = useSelector((state) => state.auth.user);
  const [searchValue, setSearchValue] = useState(null);
  const { cars, count, getCars, loading } = useCars();
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const items = [
    {
      key: "active",
      label: "Activos",
      children: (
        <CarsTable
          pagination={pagination}
          setPagination={setPagination}
          cars={cars}
          getCars={getCars}
          loading={loading}
        />
      ),
    },
    {
      key: "archived",
      label: "Archivados",
      children: (
        <CarsTable
          pagination={pagination}
          setPagination={setPagination}
          cars={cars}
          getCars={getCars}
          loading={loading}
        />
      ),
    },
  ];

  useEffect(() => {
    setPagination({ ...pagination, total: count });
  }, [count]);

  useEffect(() => {
    getCars(
      pagination.current,
      pagination.pageSize,
      `&archived=${currentTab === "archived"}`
    );
  }, [pagination.current, pagination.pageSize, user, currentTab]);

  const handleSearch = (value) => {
    setSearchValue(value);
    getCars(
      pagination.current,
      pagination.pageSize,
      `&archived=${currentTab === "archived"}&plate=${value}`
    );
  };

  const handleApplyFilters = (values) => {
    getCars(
      pagination.current,
      pagination.pageSize,
      `&archived=${currentTab === "archived"}${
        searchValue ? "&plate=" + searchValue : ""
      }${getFilterString(values)}`
    );
  };

  return (
    <div className="cars-container">
      <h1 className="text-2xl text-red-700 font-semibold mb-5 ">Autos</h1>
      <TableActions
        tab={currentTab}
        onSearch={handleSearch}
        type="cars"
        onApplyFilters={(values) => {
          handleApplyFilters(values);
        }}
      />

      <Tabs
        activeKey={currentTab}
        items={items}
        onChange={(key) => {
          setCurrentTab(key);
        }}
      />
    </div>
  );
}
export default CarsContainer;
