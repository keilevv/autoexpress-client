import { Table, Tag, Input } from "antd";
/**
 * @param {{ appointments: any, getAppointments: () => void, loading: boolean }} props
 */
function AppointmentsTable({ appointments, getAppointments, loading }) {
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

  return (
    <>
      <div className="table-container">
        <Table dataSource={dataSource} columns={columns} loading={loading} />
      </div>
    </>
  );
}

export default AppointmentsTable;
