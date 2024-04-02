import { useState, useEffect } from "react";
import { Table, Tag } from "antd";
import "./style.css";
/**
 * @param {{ clients: any, getClients: () => void, loading: boolean, pagination: any, setPagination: () => void, setPagination: () => void , handleGetClients: () => void }} props
 */
function ClientsTable({ clients, loading, pagination, setPagination }) {
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
        <div className="car-tags-container">
          {cars.map((car) => {
            return (
              <Tag color={"geekblue"} key={car._id}>
                {car.plate.toUpperCase()}
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
  ];

  const handleTableChange = (newPagination) => {
    setPagination(newPagination);
  };

  const dataSource = clients.map((item, index) => {
    return {
      key: index,
      full_name: item.name + " " + item.surname + " " + item.lastname,
      cars: item.cars,
      email: item.email,
      telephone_number: item.telephone_number,
    };
  });

  return (
    <>
      <div className="table-container">
        <Table
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
