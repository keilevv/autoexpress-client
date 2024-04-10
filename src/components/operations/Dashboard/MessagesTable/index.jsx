import { useState, useEffect } from "react";
import { Table, Popover } from "antd";
import "./style.css";
import { size } from "lodash";
/**
 * @param {{ messages: any[], loading: boolean, pagination: any, setPagination: () => void, setPagination: () => void , handleGetClients: () => void }} props
 */
function MessagesTable({ messages, loading, pagination, setPagination }) {
  const columns = [
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
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
      title: "Mensaje",
      dataIndex: "message",
      key: "message",
      render: (_, { message }) => {
        const content = (
          <div className="message-content">
            <p>{message}</p>
          </div>
        );
        return (
          <div className="popover-container">
            <Popover content={content} title="Mensaje">
              <p className="message-popover-text">Ver mensaje</p>
            </Popover>
          </div>
        );
      },
    },
  ];

  const handleTableChange = (newPagination) => {
    setPagination(newPagination);
  };

  const dataSource = messages.map((item, index) => {
    return {
      key: index,
      name: item.name,
      email: item.email,
      telephone_number: item.telephone_number,
      message: item.message,
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

export default MessagesTable;
