import { useEffect, useState } from "react";
/* Hooks*/
import useCars from "../../../hooks/useCars";
/* Components */
import CarsTable from "../../../components/operations/Cars/CarsTable";
import TableActions from "../../../components/operations/TableActions";
import { useSelector } from "react-redux";
import { Spin } from "antd";

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
    getCars(pagination.current, pagination.pageSize, "");
  }, [pagination.current, pagination.pageSize, user]);

  return (
    <div className="cars-container">
      <h1>Autos</h1>
      <TableActions />

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
