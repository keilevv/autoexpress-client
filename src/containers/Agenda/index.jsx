import Dashboard from "../../components/Dashboard";
import MainLayout from "../Layout";
import useMenu from "../../hooks/useMenu";
function AgendaContainer() {
  const { defaultSelectedItem } = useMenu();
  return (
    <MainLayout defaultLocation={defaultSelectedItem}>
      <Dashboard />
    </MainLayout>
  );
}
export default AgendaContainer;
