import React, { useEffect, useState } from "react";
import { Table, Typography, Tag, Space } from "antd";
import moment from "moment";
import useInventory from "../../../../hooks/useInventory";

const { Title, Text } = Typography;

const DischargesList = () => {
  const { getDischarges, discharges, dischargesCount, loading } = useInventory();
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  useEffect(() => {
    getDischarges(pagination.current, pagination.pageSize);
  }, [pagination.current, pagination.pageSize, getDischarges]);

  useEffect(() => {
    setPagination((prev) => ({ ...prev, total: dischargesCount }));
  }, [dischargesCount]);

  const columns = [
    {
      title: "Fecha",
      dataIndex: "created_date",
      key: "created_date",
      render: (date) => moment(date).format("DD/MM/YYYY HH:mm"),
    },
    {
      title: "Usuario",
      dataIndex: "user",
      key: "user",
      render: (user) => (user ? `${user.name} ${user.last_name}` : "Sistema"),
    },
    {
      title: "Servicios",
      dataIndex: "services",
      key: "services",
      render: (services) => (
        <Space direction="vertical" size="small">
          {services.map((s, index) => {
            const counts = [];
            if (s.small_car) counts.push(`${s.small_car} Auto P.`);
            if (s.large_car) counts.push(`${s.large_car} Auto G.`);
            if (s.small_truck) counts.push(`${s.small_truck} Cam. P.`);
            if (s.large_truck) counts.push(`${s.large_truck} Cam. G.`);
            
            return (
              <div key={index}>
                <Text strong>{s.service?.name}</Text>
                <div className="text-xs text-gray-500">{counts.join(", ")}</div>
              </div>
            );
          })}
        </Space>
      ),
    },
    {
      title: "Materiales Descargados",
      dataIndex: "materials_recipe",
      key: "materials_recipe",
      render: (materials) => (
        <div className="max-h-32 overflow-y-auto">
          {materials.map((m, index) => (
            <div key={index} className="mb-1 text-sm flex items-center justify-between gap-2">
              <Text className="truncate max-w-[150px]" title={m.material?.name}>{m.material?.name}</Text>
              <div>
                <Tag color="blue">{m.consumed_grams.toFixed(2)} g</Tag>
                <Tag color="orange">-{m.quantity_subtracted.toFixed(2)} {m.material?.unit || "u"}</Tag>
              </div>
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-4 border-b border-gray-100">
        <Title level={4} className="!mb-0">Historial de Descargas</Title>
      </div>
      <Table
        columns={columns}
        dataSource={discharges}
        rowKey="_id"
        loading={loading}
        pagination={{
          ...pagination,
          onChange: (page, pageSize) => setPagination({ ...pagination, current: page, pageSize }),
        }}
        size="middle"
        scroll={{ x: 800 }}
      />
    </div>
  );
};

export default DischargesList;
