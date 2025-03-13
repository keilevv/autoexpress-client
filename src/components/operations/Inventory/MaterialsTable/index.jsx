import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Popover, notification } from "antd";
import InventoryTableMenu from "../TableMenu";
import useInventory from "../../../../hooks/useInventory";
import { unitOptions } from "../../../../helpers/constants";
import { formatToCurrency, formatNumber } from "../../../../helpers";
/**
 * @param {{ type: string, data: any[], loading: boolean, pagination: any, setPagination: () => void, setPagination: () => void , handleGetClients: () => void }} props
 */
function MaterialsTable({
  data,
  loading,
  pagination,
  setPagination,
  getMaterials,
  type = "storage",
  owner,
}) {
  const [tableData, setTableData] = useState([]);
  const {
    updateStorageMaterial,
    updateConsumptionMaterial,
    loading: loadingUpdate,
  } = useInventory();
  const navigate = useNavigate();

  const handleArchiveMaterial = (item) => {
    if (type === "storage") {
      updateStorageMaterial(item.key, { archived: !item.archived })
        .then((response) => {
          if (response) {
            notification.success({
              message: "Material archivado exitosamente",
              description: `${response.data.results.item} Ref. #${response.data.results.reference}`,
            });
            getMaterials(1, 10, `&archived=false&owner=${owner}`);
          }
        })
        .catch((err) => {
          notification.error({
            message: "Error archivando material",
            description: err.message || err.message._message,
          });
        });
    }
    if (type === "consumption") {
      updateConsumptionMaterial(item.key, { archived: !item.archived })
        .then((response) => {
          if (response) {
            notification.success({
              message: "Material archivado exitosamente",
              // description: `${response.data.results.item} - ${response.data.results.reference}`,
            });
            getMaterials(1, 10, `&archived=false&owner=${owner}`);
          }
        })
        .catch((err) => {
          notification.error({
            message: "Error archivando material",
            description: err.message || err.message._message,
          });
        });
    }
  };

  useEffect(() => {
    if (type === "storage") {
      const storageTableData = data.map((item, index) => {
        return {
          key: item._id,
          name: item.name,
          reference: item.reference,
          unit: item.unit,
          price: item.price,
          quantity: item.quantity,
          caution_quantity: item.caution_quantity,
        };
      });
      setTableData(storageTableData);
    } else if (type === "consumption") {
      const consumptionTableData = data.map((item) => {
        return {
          key: item._id,
          reference: item.material.reference,
          unit: item.material.unit,
          name: item.material.name,
          quantity: item.quantity,
          price: item.material.price,
          caution_quantity: item.material.caution_quantity,
        };
      });
      setTableData(consumptionTableData);
    }
  }, [data, type]);

  const columns = [
    {
      title: "Material",
      dataIndex: "name",
      key: "name",
      render: (item, { key }) => {
        return (
          <a
            onClick={() =>
              navigate(`/operations/inventory/material/${type}/${key}`)
            }
          >
            {String(item).toUpperCase()}
          </a>
        );
      },
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
      render: (item) => {
        return unitOptions.find((unit) => unit.value === item).label;
      },
    },
    {
      title: "Precio",
      dataIndex: "price",
      key: "price",
      render: (item) => {
        return formatToCurrency(item);
      },
    },
    {
      title: "Cantidad",
      dataIndex: "quantity",
      key: "quantity",
      render: (quantity) => {
        return <p>{formatNumber(quantity)}</p>
      },
    },
    {
      title: "",
      dataIndex: "",
      key: "",
      width: "100px",
      render: (item) => {
        const handleOnEdit = () => {
          navigate(`/operations/inventory/material/${type}/${item.key}`);
        };
        return (
          <InventoryTableMenu
            loading={loadingUpdate}
            onEdit={handleOnEdit}
            onArchive={() => {
              handleArchiveMaterial(item);
            }}
          />
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
          rowClassName={(item) => { if(item.caution_quantity){
            if(item.quantity <= item.caution_quantity){
              return "bg-yellow-50"
            }
          }}}
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

export default MaterialsTable;
