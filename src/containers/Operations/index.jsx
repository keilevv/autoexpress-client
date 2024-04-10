import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Dashboard from "../../components/operations/Dashboard";
import MainLayout from "../Layout";
import MessagesTable from "../../components/operations/Dashboard/MessagesTable";
import useMessages from "../../hooks/useMessages";
import useMenu from "../../hooks/useMenu";
function OperationsContainer() {
  const user = useSelector((state) => state.auth.user);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
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
    <MainLayout defaultLocation={defaultSelectedItem}>
      <Dashboard />
    </MainLayout>
  );
}
export default OperationsContainer;
