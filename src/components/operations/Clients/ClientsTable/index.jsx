import { useState, useEffect } from "react";
import { Table, Tag } from "antd";
/**
 * @param {{ clients: any, getClients: () => void, loading: boolean }} props
 */
function ClientsTable({ clients, getClients, loading }) {
  const [data, setData] = useState([]);
  const columns = [
    {
      title: "Nombre",
      dataIndex: "full_name",
      key: "full_name",
    },
    {
      title: "Autos",
      dataIndex: "cars",
      key: "cars",
      render: (_, { cars }) => (
        <>
          {cars.map((car) => {
            return (
              <Tag color={"geekblue"} key={car._id}>
                {car.plate.toUpperCase()}
              </Tag>
            );
          })}
        </>
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
  ];

  useEffect(() => {
    if (clients.length) {
      const dataSource = clients.map((item, index) => {
        return {
          key: index,
          full_name: item.name + " " + item.surname + " " + item.lastname,
          cars: item.cars,
          email: item.email,
          telephone_number: item.telephone_number,
        };
      });
      setData(dataSource);
    }
  }, [clients]);

  return (
    <>
      <div className="table-container">
        <Table dataSource={data} columns={columns} />
      </div>
    </>
  );
}

export default ClientsTable;
