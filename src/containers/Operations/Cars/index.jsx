import { useEffect } from "react";
/* Hooks*/
import useCars from "../../../hooks/useCars";
/* Components */
import CarsTable from "../../../components/operations/Cars/CarsTable";
import TableActions from "../../../components/operations/TableActions";
import { useSelector } from "react-redux";
import { Spin } from "antd";

function CarsContainer() {
  const user = useSelector((state) => state.auth.user);
  const { cars, getCars, getCarListByPlate, loading } = useCars();

  useEffect(() => {
    getCars();
  }, [user]);

  function handleSearchCar(plateValue) {
    if (!plateValue) {
      getCars();
      return;
    }
    getCarListByPlate(plateValue);
  }

  return (
    <div className="cars-container">
      <h1>Autos</h1>
      <TableActions onSearch={handleSearchCar} />

      {loading ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Spin size="large" style={{ marginTop: "50px" }} />
        </div>
      ) : (
        <CarsTable cars={cars} getCars={getCars} loading={loading} />
      )}
    </div>
  );
}
export default CarsContainer;
