import { useEffect } from "react";
/* Hooks*/
import useClient from "../../../hooks/useClient";
/* Components */
import TableActions from "../../../components/operations/TableActions";
import ClientsTable from "../../../components/operations/Clients/ClientsTable";
import { Spin } from "antd";

import { useSelector } from "react-redux";

function ClientsContainer() {
  const user = useSelector((state) => state.auth.user);
  const { clients, getClients, loading, getClientListByName } = useClient();

  useEffect(() => {
    getClients();
  }, [user]);

  function handleSearchClient(nameValue) {
    if (!nameValue) {
      getClients();
      return;
    }
    getClientListByName(nameValue);
  }
  return (
    <div className="clients-container">
      <h1>Clientes</h1>
      <TableActions onSearch={handleSearchClient} />
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Spin size="large" style={{ marginTop: "50px" }} />
        </div>
      ) : (
        <ClientsTable
          clients={clients}
          getClients={getClients}
          loading={loading}
        />
      )}
    </div>
  );
}
export default ClientsContainer;
