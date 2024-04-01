import Dashboard from "../../components/operations/Dashboard";
import MainLayout from "../Layout";
import useMenu from "../../hooks/useMenu";
function OperationsContainer() {
  const { defaultSelectedItem } = useMenu();
  return (
    <MainLayout defaultLocation={defaultSelectedItem}>
      <Dashboard />
    </MainLayout>
  );
}
export default OperationsContainer;
