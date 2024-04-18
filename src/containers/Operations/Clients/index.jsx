import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
/* Hooks*/
import useClient from "../../../hooks/useClient";
/* Components */
import TableActions from "../../../components/operations/TableActions";
import ClientsTable from "../../../components/operations/Clients/ClientsTable";
import { Spin } from "antd";
import "./style.css";

function ClientsContainer() {
  const user = useSelector((state) => state.auth.user);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const { clients, count, getClients, loading } = useClient();

  useEffect(() => {
    setPagination({ ...pagination, total: count });
  }, [count]);

  useEffect(() => {
    getClients(pagination.current, pagination.pageSize, "&archived=false");
  }, [pagination.current, pagination.pageSize, user]);

  const handleSearch = (value) => {
    getClients(pagination.current, pagination.pageSize, "&name=" + value);
  };

  return (
    <div className="clients-container">
      <h1 className="clients-container-title">Clientes</h1>
      <TableActions onSearch={handleSearch} type="clients" />
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Spin size="large" style={{ marginTop: "50px" }} />
        </div>
      ) : (
        <ClientsTable
          pagination={pagination}
          setPagination={setPagination}
          clients={clients}
          getClients={getClients}
          loading={loading}
        />
      )}
    </div>
  );
}
export default ClientsContainer;
