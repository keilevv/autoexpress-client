import { useEffect } from "react";
/* Containers*/
import MainLayout from "../../Layout";
/* Hooks*/
import useMenu from "../../../hooks/useMenu";
import useCars from "../../../hooks/useCars";
/* Components */
import Cars from "../../../components/operations/Cars";
import { useSelector } from "react-redux";

function CarsContainer() {
  const user = useSelector((state) => state.auth.user);
  const { cars, getCars } = useCars();
  const { defaultSelectedItem } = useMenu();

  useEffect(() => {
    getCars();
  }, []);

  return (
    <MainLayout defaultLocation={defaultSelectedItem}>
      <Cars />
    </MainLayout>
  );
}
export default CarsContainer;
