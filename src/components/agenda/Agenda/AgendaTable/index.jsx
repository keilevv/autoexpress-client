import { Table, Tag, Input } from "antd";
/**
 * @param {{ appointments: any, getAppointments: () => void, loading: boolean, pagination: any, setPagination: () => void  }} props
 */
function AppointmentsTable({
  appointments,
  loading,
  pagination,
  setPagination,
}) {
  const columns = [
    {
      title: "Fecha",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Hora",
      dataIndex: "time",
      key: "time",
    },

    {
      title: "Operario",
      dataIndex: "operator",
      key: "operator",
    },
    {
      title: "Cliente",
      dataIndex: "client",
      key: "client",
      render: (_, { client }) => {
        return <>{client.toUpperCase()}</>;
      },
    },
    {
      title: "Auto",
      dataIndex: "car",
      key: "car",
      render: (_, { car }) => (
        <>
          <Tag color={"geekblue"} key={car.plate}>
            {car.plate}
          </Tag>
        </>
      ),
    },
  ];
  const dataSource = appointments.map((appointment, index) => {
    return {
      ...appointment,
      key: index,
      operator: appointment.user.username,
      client: `${appointment.client.name} ${appointment.client.surname} ${appointment.client.lastname}`,
    };
  });
  const handleTableChange = (newPagination) => {
    setPagination(newPagination);
  };

  return (
    <>
      <div className="table-container">
        <Table
          dataSource={dataSource}
          columns={columns}
          loading={loading}
          pagination={pagination}
          onChange={handleTableChange}
        />
      </div>
    </>
  );
}

export default AppointmentsTable;
