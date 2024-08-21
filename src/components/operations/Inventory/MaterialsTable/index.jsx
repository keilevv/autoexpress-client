import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Popover, notification } from "antd";
import MaterialTableMenu from "./Menu";
import useInventory from "../../../../hooks/useInventory";
/**
 * @param {{ data: any[], loading: boolean, pagination: any, setPagination: () => void, setPagination: () => void , handleGetClients: () => void }} props
 */
function MaterialsTable({
  data,
  loading,
  pagination,
  setPagination,
  getMaterials,
  type = "storage",
}) {
  const [columns, setColumns] = useState([]);
  const { updateStorageMaterial } = useInventory();
  const navigate = useNavigate();

  useEffect(() => {
    if (type !== "storage") {
      setColumns(columns.filter((c) => c.dataIndex !== "price"));
    } else {
      setColumns(defaultColumns);
    }
  }, [type]);
  const defaultColumns = [
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Referencia",
      dataIndex: "reference",
      key: "reference",
    },
    {
      title: "Unidad",
      dataIndex: "unit",
      key: "unit",
    },
    {
      title: "Precio",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Cantidad",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "",
      dataIndex: "",
      key: "",
      render: (item) => {
        const handleOnEdit = () => {
          navigate(`/operations/inventory/material/${item.key}`);
        };
        return (
          <MaterialTableMenu
            onEdit={handleOnEdit}
            onArchive={() => {
              updateStorageMaterial(item.key, { archived: !item.archived })
                .then((response) => {
                  if (response) {
                    notification.success({
                      message: "Material archivado exitosamente",
                      description: `${response.data.results.name} - ${response.data.results.reference}`,
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
            }}
          />
        );
      },
    },
  ];

  const handleTableChange = (newPagination) => {
    setPagination(newPagination);
  };

  const dataSource = data.map((item, index) => {
    return {
      key: item._id,
      name: item.name,
      reference: item.reference,
      unit: item.unit,
      price: item.price,
      quantity: item.quantity,
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

export default MaterialsTable;
