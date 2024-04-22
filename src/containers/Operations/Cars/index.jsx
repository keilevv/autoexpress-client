import { useEffect, useState } from "react";
/* Hooks*/
import useCars from "../../../hooks/useCars";
/* Components */
import CarsTable from "../../../components/operations/Cars/CarsTable";
import TableActions from "../../../components/operations/TableActions";
import { useSelector } from "react-redux";
import { Spin, Tabs } from "antd";
import "./style.css";

function CarsContainer() {
  const [currentTab, setCurrentTab] = useState("all");
  const user = useSelector((state) => state.auth.user);
  const { cars, count, getCars, loading } = useCars();
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const items = [
    {
      key: "all",
      label: "Todos",
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
    getCars(pagination.current, pagination.pageSize, "&plate=" + value);
  };

  return (
    <div className="cars-container">
      <h1 className="cars-container-title">Autos</h1>
      <TableActions onSearch={handleSearch} type="cars" />

      {loading ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Spin size="large" style={{ marginTop: "50px" }} />
        </div>
      ) : (
        <Tabs
          activeKey={currentTab}
          items={items}
          onChange={(key) => {
            setCurrentTab(key);
          }}
        />
      )}
    </div>
  );
}
export default CarsContainer;
