import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
/* Components */
import { Tabs } from "antd";
import AgendaTable from "../../../components/operations/Agenda/AgendaTable";
import TableActions from "../../../components/operations/TableActions";
/* Hooks */
import useAppointment from "../../../hooks/useAppointment";
import useMenu from "../../../hooks/useMenu";
import "./style.css";

function AgendaContainer() {
  const [currentTab, setCurrentTab] = useState("active");
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
    getAppointments(
      pagination.current,
      pagination.pageSize,
      `&archived=${currentTab === "archived"}`
    );
  }, [pagination.current, pagination.pageSize, user, currentTab]);

  const handleSearch = (value) => {
    getAppointments(
      pagination.current,
      pagination.pageSize,
      "&full_name=" + value
    );
  };

  const items = [
    {
      key: "active",
      label: "Activas",
      children: (
        <AgendaTable
          appointments={appointments}
          getAppointments={getAppointments}
          loading={loading}
          pagination={pagination}
          setPagination={setPagination}
        />
      ),
    },
    {
      key: "archived",
      label: "Archivadas",
      children: (
        <AgendaTable
          appointments={appointments}
          getAppointments={getAppointments}
          loading={loading}
          pagination={pagination}
          setPagination={setPagination}
        />
      ),
    },
  ];

  return (
    <div>
      <h1 className="text-2xl text-red-700 font-semibold mb-5 ">Agenda</h1>
      <TableActions onSearch={handleSearch} type="appointments" />
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
export default AgendaContainer;
