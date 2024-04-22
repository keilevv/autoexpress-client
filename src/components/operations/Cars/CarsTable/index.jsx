import { Table, Tag, Input } from "antd";
import TableMenu from "../../TableMenu";
import { useNavigate } from "react-router-dom";
import "./style.css";
/**
 * @param {{ cars: any, getCars: () => void, loading: boolean,  pagination: any, setPagination: () => void }} props
 */
function CarsTable({ cars, loading, pagination, setPagination, getCars }) {
  const navigate = useNavigate();
  const columns = [
    {
      title: "Placa",
      dataIndex: "plate",
      key: "plate",
      render: (_, { plate, carId }) => (
        <a onClick={() => navigate(`/operations/cars/${carId}`)}>
          {plate.toUpperCase()}
        </a>
      ),
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
                <a
                  style={{ color: "#1d79C4" }}
                  onClick={() => navigate(`/operations/clients/${client._id}`)}
                >
                  {(
                    client.name +
                    " " +
                    client.surname +
                    " " +
                    client.lastname
                  ).toUpperCase()}
                </a>
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "",
      dataIndex: "carId",
      key: "carId",
      render: (_, { carId }) => {
        // const ref = useRef(null);

        return (
          <TableMenu
            id={carId}
            type="cars"
            onArchive={() =>
              getCars(
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
  const dataSource = cars.map((item, key) => {
    return {
      key: key,
      plate: item.plate,
      brand: item.brand,
      model: item.model,
      color: item.color,
      clients: item.clients,
      carId: item._id,
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
