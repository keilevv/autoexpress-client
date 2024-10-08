import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getFilterString } from "../../../helpers";
/* Hooks*/
import useClient from "../../../hooks/useClient";
/* Components */
import TableActions from "../../../components/operations/TableActions";
import ClientsTable from "../../../components/operations/Clients/ClientsTable";
import { Tabs } from "antd";
import "./style.css";

function ClientsContainer() {
  const [searchValue, setSearchValue] = useState(null);
  const [currentTab, setCurrentTab] = useState("active");
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
    getClients(
      pagination.current,
      pagination.pageSize,
      `&archived=${currentTab === "archived"}`
    );
  }, [pagination.current, pagination.pageSize, user, currentTab]);

  const handleSearch = (value) => {
    setSearchValue(value);
    getClients(
      pagination.current,
      pagination.pageSize,
      `&archived=${currentTab === "archived"}&full_name=${value}`
    );
  };

  const handleApplyFilters = (values) => {
    getClients(
      pagination.current,
      pagination.pageSize,
      `&archived=${currentTab === "archived"}${
        searchValue ? "&full_name=" + searchValue : ""
      }${getFilterString(values)}`
    );
  };

  const items = [
    {
      key: "active",
      label: <p className="font-semibold text-base">Activos</p>,
      children: (
        <div className="bg-gray-100 rounded-lg">
          <ClientsTable
            pagination={pagination}
            setPagination={setPagination}
            clients={clients}
            getClients={getClients}
            loading={loading}
          />
        </div>
      ),
    },
    {
      key: "archived",
      label: <p className="font-semibold text-base">Archivados</p>,
      children: (
        <div className="bg-gray-100 rounded-lg">
          <ClientsTable
            pagination={pagination}
            setPagination={setPagination}
            clients={clients}
            getClients={getClients}
            loading={loading}
          />
        </div>
      ),
    },
  ];
  return (
    <div>
      <h1 className="text-2xl text-red-700 font-semibold mb-5 ">Clientes</h1>
      <TableActions
        onSearch={handleSearch}
        type="clients"
        onApplyFilters={handleApplyFilters}
      />
      <Tabs
        activeKey={currentTab}
        items={items}
        onChange={(key) => {
          setCurrentTab(key);
        }}
      />
    </div>
  );
}
export default ClientsContainer;
