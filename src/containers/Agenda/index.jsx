import { useEffect } from "react";
import { useSelector } from "react-redux";
/* Components */
import { Spin } from "antd";
import MainLayout from "../Layout";
import AgendaTable from "../../components/agenda/Agenda/AgendaTable";
import TableActions from "../../components/operations/TableActions";
/* Hooks */
import useAppointment from "../../hooks/useAppointment";
import useMenu from "../../hooks/useMenu";

function AgendaContainer() {
  const user = useSelector((state) => state.auth.user);
  const { appointments, loading, getAppointments } = useAppointment();
  const { defaultSelectedItem } = useMenu();

  useEffect(() => {
    getAppointments();
  }, [user]);
  return (
    <MainLayout defaultLocation={defaultSelectedItem}>
      <h1>Agenda</h1>
      <TableActions />
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Spin size="large" style={{ marginTop: "50px" }} />
        </div>
      ) : (
        <AgendaTable
          appointments={appointments}
          getAppointments={getAppointments}
          loading={loading}
        />
      )}
    </MainLayout>
  );
}
export default AgendaContainer;
