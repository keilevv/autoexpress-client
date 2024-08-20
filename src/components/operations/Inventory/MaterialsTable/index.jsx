import { useState, useEffect } from "react";
import { Table, Popover } from "antd";
import "./style.css";
import { size } from "lodash";
/**
 * @param {{ data: any[], loading: boolean, pagination: any, setPagination: () => void, setPagination: () => void , handleGetClients: () => void }} props
 */
function MaterialsTable({ data, loading, pagination, setPagination }) {
  const columns = [
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
  ];

  const handleTableChange = (newPagination) => {
    setPagination(newPagination);
  };

  const dataSource = data.map((item, index) => {
    return {
      key: index,
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
