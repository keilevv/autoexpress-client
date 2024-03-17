import { useEffect } from "react";
/* Containers*/
import MainLayout from "../../Layout";
/* Hooks*/
import useCars from "../../../hooks/useCars";
/* Components */
import Cars from "../../../components/operations/Cars";
import { useSelector } from "react-redux";

function CarsContainer() {
  const user = useSelector((state) => state.auth.user);
  const { cars, getCars, loading } = useCars();

  useEffect(() => {
    getCars();
  }, [user]);

  return <Cars cars={cars} getCars={getCars} loading={loading} />;
}
export default CarsContainer;
