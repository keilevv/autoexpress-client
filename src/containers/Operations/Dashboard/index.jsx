import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useMessages from "../../../hooks/useMessages";
import MessagesTable from "../../../components/operations/Dashboard/MessagesTable";
import DashboardGrid from "../../../components/operations/Dashboard/DashboardGrid";
import "./style.css";

function DashboardContainer() {
  const user = useSelector((state) => state.auth.user);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    total: 0,
  });

  const { messages, count, getMessages, loading } = useMessages();

  useEffect(() => {
    setPagination({ ...pagination, total: count });
  }, [count]);

  useEffect(() => {
    getMessages(pagination.current, pagination.pageSize, "");
  }, [pagination.current, pagination.pageSize, user]);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Operaciones</h1>
      <div className="dashboard-grid-container">
        <DashboardGrid />
      </div>
      <h2 className="dashboard-subtitle">Mensajes</h2>
      <MessagesTable
        loading={loading}
        messages={messages}
        pagination={pagination}
        setPagination={setPagination}
      />
    </div>
  );
}
export default DashboardContainer;
