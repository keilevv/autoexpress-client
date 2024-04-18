import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
/* Components */
import { Spin } from "antd";
import MainLayout from "../Layout";
import AgendaTable from "../../components/agenda/Agenda/AgendaTable";
import TableActions from "../../components/operations/TableActions";
/* Hooks */
import useAppointment from "../../hooks/useAppointment";
import useMenu from "../../hooks/useMenu";
import "./style.css";

function AgendaContainer() {
  const user = useSelector((state) => state.auth.user);
  const { appointments, loading, getAppointments, count } = useAppointment();
  const { defaultSelectedItem } = useMenu();
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  useEffect(() => {
    setPagination({ ...pagination, total: count });
  }, [count]);

  useEffect(() => {
    getAppointments(pagination.current, pagination.pageSize, "&archived=false");
  }, [pagination.current, pagination.pageSize, user]);

  const handleSearch = (value) => {
    getAppointments(
      pagination.current,
      pagination.pageSize,
      "&client=" + value
    );
  };

  return (
    <div className="agenda-container">
      <h1 className="agenda-container-title">Agenda</h1>
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
          pagination={pagination}
          setPagination={setPagination}
        />
      )}
    </div>
  );
}
export default AgendaContainer;
