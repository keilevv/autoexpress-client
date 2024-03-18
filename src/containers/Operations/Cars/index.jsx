import { useEffect } from "react";
/* Containers*/
import MainLayout from "../../Layout";
/* Hooks*/
import useCars from "../../../hooks/useCars";
/* Components */
import CarsTable from "../../../components/operations/Cars/CarsTable";
import { useSelector } from "react-redux";

function CarsContainer() {
  const user = useSelector((state) => state.auth.user);
  const { cars, getCars, loading } = useCars();

  useEffect(() => {
    getCars();
  }, [user]);

  return <CarsTable cars={cars} getCars={getCars} loading={loading} />;
}
export default CarsContainer;
