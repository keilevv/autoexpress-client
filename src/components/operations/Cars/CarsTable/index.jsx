import { Table, Tag, Input } from "antd";
import "./style.css";
/**
 * @param {{ cars: any, getCars: () => void, loading: boolean,  pagination: any, setPagination: () => void }} props
 */
function CarsTable({ cars, loading, pagination, setPagination }) {
  const columns = [
    {
      title: "Placa",
      dataIndex: "plate",
      key: "plate",
    },
    {
      title: "Marca",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "Modelo",
      dataIndex: "model",
      key: "model",
    },

    {
      title: "Color",
      dataIndex: "color",
      key: "color",
    },
    {
      title: "Clientes",
      dataIndex: "clients",
      key: "clients",
      render: (_, { clients }) => (
        <>
          {clients.map((client) => {
            return (
              <Tag color={"geekblue"} key={client}>
                {(
                  client.name +
                  " " +
                  client.surname +
                  " " +
                  client.lastname
                ).toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
  ];
  const dataSource = cars.map((item, key) => {
    return {
      key: key,
      plate: item.plate,
      brand: item.brand,
      model: item.model,
      color: item.color,
      clients: item.clients,
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

export default CarsTable;
