import Dashboard from "../../components/operations/Dashboard";
import MainLayout from "../Layout";
import useMenu from "../../hooks/useMenu";
function DashboardContainer() {
  const { defaultSelectedItem } = useMenu();
  return (
    <MainLayout defaultLocation={defaultSelectedItem}>
      <Dashboard />
    </MainLayout>
  );
}
export default DashboardContainer;
