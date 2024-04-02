import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Dashboard from "../../../components/operations/Dashboard";
import useMessages from "../../../hooks/useMessages";
import MessagesTable from "../../../components/operations/Dashboard/MessagesTable";

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
      <Dashboard />
      <h2>Mensajes</h2>
      <MessagesTable
        messages={messages}
        pagination={pagination}
        setPagination={setPagination}
      />
    </div>
  );
}
export default DashboardContainer;
