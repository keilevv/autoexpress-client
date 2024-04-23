import { Table, Tag, Input } from "antd";
import { useNavigate } from "react-router-dom";
import TableMenu from "../../TableMenu";
/**
 * @param {{ appointments: any, getAppointments: () => void, loading: boolean, pagination: any, setPagination: () => void  }} props
 */
function AppointmentsTable({
  appointments,
  loading,
  pagination,
  setPagination,
  getAppointments,
}) {
  const navigate = useNavigate();
  const columns = [
    {
      title: "Fecha",
      dataIndex: "date",
      key: "date",
      render: (_, { appointmentId, date }) => {
        return (
          <a onClick={() => navigate(`/operations/agenda/${appointmentId}`)}>
            {date}
          </a>
        );
      },
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
        return (
          <a onClick={() => navigate(`/operations/client/${client._id}`)}>
            {client.toUpperCase()}
          </a>
        );
      },
    },
    {
      title: "Auto",
      dataIndex: "car",
      key: "car",
      render: (_, { car }) => (
        <>
          <Tag color={"geekblue"} key={car}>
            <a
              style={{ color: "#1d79C4" }}
              onClick={() => navigate(`/operations/cars/${car._id}`)}
            >
              {car.plate.toUpperCase()}
            </a>
          </Tag>
        </>
      ),
    },
    {
      title: "",
      dataIndex: "appointmentId",
      key: "appointmentId",
      render: (_, { appointmentId }) => {
        return (
          <TableMenu
            id={appointmentId}
            type="appointments"
            onArchive={() =>
              getAppointments(
                pagination.current,
                pagination.pageSize,
                "&archived=false"
              )
            }
          />
        );
      },
    },
  ];
  const dataSource = appointments.map((appointment, index) => {
    return {
      ...appointment,
      key: index,
      operator: appointment.user.username,
      client: `${appointment.client.name} ${appointment.client.surname} ${appointment.client.lastname}`,
      appointmentId: appointment._id,
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
