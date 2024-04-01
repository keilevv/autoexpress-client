import { useEffect, useState } from "react";
/* Hooks*/
import useClient from "../../../hooks/useClient";
/* Components */
import TableActions from "../../../components/operations/TableActions";
import ClientsTable from "../../../components/operations/Clients/ClientsTable";
import { Spin } from "antd";

import { useSelector } from "react-redux";

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
    getClients(pagination.current, pagination.pageSize, "");
  }, [pagination.current, pagination.pageSize, user]);

  return (
    <div className="clients-container">
      <h1>Clientes</h1>
      <TableActions />
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
