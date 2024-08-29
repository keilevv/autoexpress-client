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
    <div>
      <h1 className="text-2xl text-red-700 font-semibold mb-5 ">Operaciones</h1>
      <div className="dashboard-grid-container">
        <DashboardGrid />
      </div>
      <h2 className="text-xl text-red-700 font-semibold mb-5">Mensajes</h2>
      <div className="bg-gray-100 rounded-lg">
        <MessagesTable
          loading={loading}
          messages={messages}
          pagination={pagination}
          setPagination={setPagination}
        />
      </div>
    </div>
  );
}
export default DashboardContainer;
