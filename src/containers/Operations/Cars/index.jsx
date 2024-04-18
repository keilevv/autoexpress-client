import { useEffect, useState } from "react";
/* Hooks*/
import useCars from "../../../hooks/useCars";
/* Components */
import CarsTable from "../../../components/operations/Cars/CarsTable";
import TableActions from "../../../components/operations/TableActions";
import { useSelector } from "react-redux";
import { Spin } from "antd";
import "./style.css";

function CarsContainer() {
  const user = useSelector((state) => state.auth.user);
  const { cars, count, getCars, loading } = useCars();
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  useEffect(() => {
    setPagination({ ...pagination, total: count });
  }, [count]);

  useEffect(() => {
    getCars(pagination.current, pagination.pageSize, "&archived=false");
  }, [pagination.current, pagination.pageSize, user]);

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
        <CarsTable
          cars={cars}
          getCars={getCars}
          loading={loading}
          pagination={pagination}
          setPagination={setPagination}
        />
      )}
    </div>
  );
}
export default CarsContainer;
