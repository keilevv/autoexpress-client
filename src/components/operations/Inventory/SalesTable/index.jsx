import { useState, useEffect } from "react";
import { Table, notification } from "antd";
import TableMenu from "../TableMenu";
import useInventory from "../../../../hooks/useInventory";
import { formatToCurrency } from "../../../../helpers";
import dayjs from "dayjs";
import "./style.css";
/**
 * @param {{ data: any[], loading: boolean, pagination: any, setPagination: () => void, setPagination: () => void , handleGetClients: () => void }} props
 */
function SalesTable({
  data,
  loading,
  pagination,
  setPagination,
  getMaterials,
}) {
  const [tableData, setTableData] = useState([]);
  const { updateSale } = useInventory();

  const handleArchiveMaterial = (item) => {
    updateSale(item.key, { archived: !item.archived })
      .then((response) => {
        if (response) {
          notification.success({
            message: "Material archivado exitosamente",
            description: `${response.data.results.item} Ref. #${response.data.results.reference}`,
          });
          getMaterials();
        }
      })
      .catch((err) => {
        notification.error({
          message: "Error archivando material",
          description: err.message || err.message._message,
        });
      });
  };

  useEffect(() => {
    const salesTableData = data.map((item, index) => {
      return {
        key: item._id,
        customer_name: item.customer_name,
        materials: item.materials,
        total_price: item.total_price,
        user: item.user,
        created_date: item.created_date,
      };
    });
    setTableData(salesTableData);
  }, [data]);

  const columns = [
    {
      title: "Cliente",
      dataIndex: "customer_name",
      key: "customer_name",
      render: (item, { key }) => {
        return <p className="font-semibold">{String(item).toUpperCase()}</p>;
      },
    },
    {
      title: "Usuario",
      dataIndex: "user",
      key: "user",
      render: (item) => {
        return <p> {String(item.username).toUpperCase()}</p>;
      },
    },
    {
      title: "Materiales vendidos",
      dataIndex: "materials",
      width: "20%",
      key: "materials",
      render: (item) => {
        return (
          <div className="flex flex-col gap-1 overflow-y-scroll max-h-[100px] p-2 rounded">
            {item.map((item) => {
              return (
                <div
                  key={item.consumption_material_id}
                  className="flex flex-col gap-1 bg-gray-200 p-2 rounded mb-2"
                >
                  <p className="font-semibold">
                    {item.storage_material.name} x {item.quantity}
                  </p>
                  <p>{formatToCurrency(item.price)}</p>
                </div>
              );
            })}
          </div>
        );
      },
    },
    {
      title: "Precio total",
      dataIndex: "total_price",
      key: "total_price",
      render: (item) => {
        return formatToCurrency(item);
      },
    },
    {
      title: "Fecha y hora",
      dataIndex: "created_date",
      key: "created_date",
      render: (item) => {
        return (
          <p className="font-semibold">
            {dayjs(item).format("DD/MM/YYYY HH:mm")}
          </p>
        );
      },
    },
  ];

  const handleTableChange = (newPagination) => {
    setPagination(newPagination);
  };

  return (
    <>
      <div className="table-container">
        <Table
          loading={loading}
          dataSource={tableData}
          columns={columns}
          pagination={pagination}
          onChange={handleTableChange}
        />
      </div>
    </>
  );
}

export default SalesTable;
