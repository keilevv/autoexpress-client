import { useState, useEffect } from "react";
import { Table, Popover, Avatar, Tag } from "antd";
import { FiMessageSquare, FiMail, FiPhone, FiUser } from "react-icons/fi";
import "./style.css";
/**
 * @param {{ messages: any[], loading: boolean, pagination: any, setPagination: () => void, setPagination: () => void , handleGetClients: () => void }} props
 */
function MessagesTable({ messages, loading, pagination, setPagination }) {
  const columns = [
    {
      title: "Remitente",
      dataIndex: "name",
      key: "name",
      render: (text) => (
        <div className="flex items-center gap-3">
          <Avatar className="bg-red-50 text-red-600" icon={<FiUser />} />
          <span className="font-medium text-gray-800">{text}</span>
        </div>
      ),
    },
    {
      title: "Contacto",
      dataIndex: "contact",
      key: "contact",
      render: (_, record) => (
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FiMail className="text-gray-400" />
            <a href={`mailto:${record.email}`} className="text-blue-600 hover:underline">{record.email}</a>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FiPhone className="text-gray-400" />
            <a href={`tel:${record.telephone_number}`} className="text-gray-600 hover:text-gray-800">{record.telephone_number}</a>
          </div>
        </div>
      )
    },
    {
      title: "Mensaje",
      dataIndex: "message",
      key: "message",
      render: (_, { message }) => {
        const content = (
          <div className="max-w-sm p-2 text-gray-700 whitespace-pre-wrap">
            <p>{message}</p>
          </div>
        );
        return (
          <Popover content={content} title={<span className="font-semibold text-gray-800">Mensaje de cliente</span>} trigger="click" placement="left">
             <div className="flex items-center gap-2 text-blue-600 hover:text-blue-800 cursor-pointer font-medium bg-blue-50 px-3 py-1.5 rounded-full w-fit hover:bg-blue-100 transition-colors">
               <FiMessageSquare />
               <span>Ver mensaje</span>
             </div>
          </Popover>
        );
      },
    },
  ];

  const handleTableChange = (newPagination) => {
    setPagination(newPagination);
  };

  const dataSource = messages.map((item, index) => {
    return {
      key: item._id || index,
      name: item.name,
      email: item.email,
      telephone_number: item.telephone_number,
      message: item.message,
    };
  });

  return (
    <div className="w-full overflow-x-auto">
      <Table
        loading={loading}
        dataSource={dataSource}
        columns={columns}
        pagination={pagination}
        onChange={handleTableChange}
        rowClassName="hover:bg-gray-50 transition-colors"
      />
    </div>
  );
}

export default MessagesTable;
