import { useEffect } from "react";
/* Hooks*/
import useCars from "../../../hooks/useCars";
/* Components */
import CarsTable from "../../../components/operations/Cars/CarsTable";
import TableActions from "../../../components/operations/TableActions";
import { useSelector } from "react-redux";

function CarsContainer() {
  const user = useSelector((state) => state.auth.user);
  const { cars, getCars, loading } = useCars();

  useEffect(() => {
    getCars();
  }, [user]);

  return (
    <div className="cars-container">
      <h1>Autos</h1>
      <TableActions />
      <CarsTable cars={cars} getCars={getCars} loading={loading} />
    </div>
  );
}
export default CarsContainer;
