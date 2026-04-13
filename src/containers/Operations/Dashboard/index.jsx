import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useMessages from "../../../hooks/useMessages";
import useDashboard from "../../../hooks/useDashboard";
import MessagesTable from "../../../components/operations/Dashboard/MessagesTable";
import DashboardGrid from "../../../components/operations/Dashboard/DashboardGrid";
import "./style.css";

function DashboardContainer() {
  const user = useSelector((state) => state.auth.user);
  const [selectedOwner, setSelectedOwner] = useState("autoexpress");
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    total: 0,
  });

  const { messages, count: messagesCount, getMessages, loading: messagesLoading } = useMessages();
  const { dashboardData, getDashboardData, loading: dashboardLoading } = useDashboard();

  useEffect(() => {
    setPagination({ ...pagination, total: messagesCount });
  }, [messagesCount]);

  useEffect(() => {
    getMessages(pagination.current, pagination.pageSize, "");
  }, [pagination.current, pagination.pageSize, user]);

  useEffect(() => {
    getDashboardData(selectedOwner);
  }, [getDashboardData, selectedOwner]);

  return (
    <div>
      <h1 className="text-2xl text-red-700 font-semibold mb-5 ">Operaciones</h1>
      <div className="dashboard-grid-container mb-8">
        <DashboardGrid
          data={dashboardData}
          loading={dashboardLoading}
          selectedOwner={selectedOwner}
          setSelectedOwner={setSelectedOwner}
        />
      </div>
      <h2 className="text-xl text-red-700 font-semibold mb-4">Mensajes Recientes</h2>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <MessagesTable
          loading={messagesLoading}
          messages={messages}
          pagination={pagination}
          setPagination={setPagination}
        />
      </div>
    </div>
  );
}
export default DashboardContainer;
