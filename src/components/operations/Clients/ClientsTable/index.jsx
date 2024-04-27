import { Table, Tag } from "antd";
import TableMenu from "../../TableMenu";
import { useNavigate } from "react-router-dom";

import "./style.css";
/**
 * @param {{ clients: any, getClients: () => void, loading: boolean, pagination: any, setPagination: () => void, setPagination: () => void , handleGetClients: () => void }} props
 */
function ClientsTable({
  clients,
  loading,
  pagination,
  setPagination,
  getClients,
}) {
  const navigate = useNavigate();
  const columns = [
    {
      title: "Nombre",
      dataIndex: "full_name",
      key: "full_name",
      render: (_, { clientId, full_name }) => (
        <a onClick={() => navigate(`/operations/clients/${clientId}`)}>
          {full_name.toUpperCase()}
        </a>
      ),
    },
    {
      title: "Autos",
      dataIndex: "cars",
      key: "cars",
      render: (_, { cars }) => (
        <div className="car-tags-container">
          {cars.map((car) => {
            return (
              <Tag color={"geekblue"} key={car}>
                <a
                  style={{ color: "#1d79C4" }}
                  onClick={() => navigate(`/operations/cars/${car._id}`)}
                >
                  {car.plate.toUpperCase()}
                </a>
              </Tag>
            );
          })}
        </div>
      ),
    },
    {
      title: "Correo",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Teléfono",
      dataIndex: "telephone_number",
      key: "telephone_number",
    },
    {
      title: "",
      dataIndex: "clientId",
      key: "clientId",
      render: (_, { clientId, archived }) => {
        return (
          <TableMenu
            isArchived={archived}
            id={clientId}
            type="clients"
            onArchive={() =>
              getClients(
                pagination.current,
                pagination.pageSize,
                `&archived=${archived}`
              )
            }
          />
        );
      },
    },
  ];

  const handleTableChange = (newPagination) => {
    setPagination(newPagination);
  };

  const dataSource = clients.map((item, index) => {
    return {
      ...item,
      key: item._id,
      full_name: item.name + " " + item.surname + " " + item.lastname,
      cars: item.cars,
      email: item.email,
      telephone_number: item.telephone_number,
      clientId: item._id,
    };
  });

  return (
    <>
      <div className="table-container">
        <Table
          loading={loading}
          dataSource={dataSource}
          columns={columns}
          pagination={pagination}
          onChange={handleTableChange}
        />
      </div>
    </>
  );
}

export default ClientsTable;
