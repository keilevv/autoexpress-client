import { useState, useMemo } from "react";
import { Table, InputNumber, Card, Typography, Divider, Button, Space, Tag, Input } from "antd";
import { CalculatorOutlined, ReloadOutlined, SearchOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const StockSimulation = ({ services, storageMaterials }) => {
  const [quantities, setQuantities] = useState({}); // { [serviceId]: { small_car: 0, large_car: 0, small_truck: 0, large_truck: 0 } }
  const [materialSearch, setMaterialSearch] = useState("");
  const [materialPagination, setMaterialPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const handleQuantityChange = (serviceId, type, value) => {
    setQuantities((prev) => ({
      ...prev,
      [serviceId]: {
        ...(prev[serviceId] || { small_car: 0, large_car: 0, small_truck: 0, large_truck: 0 }),
        [type]: value,
      },
    }));
  };

  const resetQuantities = () => {
    setQuantities({});
  };

  const simulatedMaterials = useMemo(() => {
    // 1. Calculate total consumption per material
    const totalConsumption = {}; // { [materialId]: grams }

    Object.entries(quantities).forEach(([serviceId, counts]) => {
      const service = services.find((s) => s._id === serviceId);
      if (!service) return;

      service.materials?.forEach((m) => {
        const materialId = m.material?._id || m.material;
        
        // Calculate consumption based on per-category grams
        const consumedGrams = 
          (counts.small_car || 0) * (m.small_car_grams || 0) +
          (counts.large_car || 0) * (m.large_car_grams || 0) +
          (counts.small_truck || 0) * (m.small_truck_grams || 0) +
          (counts.large_truck || 0) * (m.large_truck_grams || 0);

        totalConsumption[materialId] = (totalConsumption[materialId] || 0) + consumedGrams;
      });
    });

    // 2. Apply consumption to current materials
    return storageMaterials.map((material) => {
      const consumedGrams = totalConsumption[material._id] || 0;
      let newQuantity = material.quantity;

      if (material.is_gram_consumed) {
        // formula: quantity_in_grams/normalized_weight
        const currentGrams = material.quantity_in_grams || 0;
        const remainingGrams = Math.max(0, currentGrams - consumedGrams);
        newQuantity = remainingGrams / (material.normalized_weight || 1);
      }

      return {
        ...material,
        simulated_quantity: newQuantity,
        consumed_grams: consumedGrams,
      };
    });
  }, [quantities, services, storageMaterials]);

  const filteredSimulatedMaterials = useMemo(() => {
    return simulatedMaterials.filter(
      (m) =>
        m.name?.toLowerCase().includes(materialSearch.toLowerCase()) ||
        m.reference?.toLowerCase().includes(materialSearch.toLowerCase())
    );
  }, [simulatedMaterials, materialSearch]);

  const serviceColumns = [
    { 
      title: "Servicio", 
      dataIndex: "name", 
      key: "name",
      render: (text) => <strong>{text}</strong>
    },
    {
      title: "Carro Peq.",
      key: "small_car",
      render: (_, record) => (
        <InputNumber
          min={0}
          value={quantities[record._id]?.small_car || 0}
          onChange={(v) => handleQuantityChange(record._id, "small_car", v)}
          style={{ width: "100%" }}
        />
      ),
    },
    {
      title: "Carro Gde.",
      key: "large_car",
      render: (_, record) => (
        <InputNumber
          min={0}
          value={quantities[record._id]?.large_car || 0}
          onChange={(v) => handleQuantityChange(record._id, "large_car", v)}
          style={{ width: "100%" }}
        />
      ),
    },
    {
      title: "Camioneta Peq.",
      key: "small_truck",
      render: (_, record) => (
        <InputNumber
          min={0}
          value={quantities[record._id]?.small_truck || 0}
          onChange={(v) => handleQuantityChange(record._id, "small_truck", v)}
          style={{ width: "100%" }}
        />
      ),
    },
    {
      title: "Camioneta Gde.",
      key: "large_truck",
      render: (_, record) => (
        <InputNumber
          min={0}
          value={quantities[record._id]?.large_truck || 0}
          onChange={(v) => handleQuantityChange(record._id, "large_truck", v)}
          style={{ width: "100%" }}
        />
      ),
    },
  ];

  const materialColumns = [
    { title: "Material", dataIndex: "name", key: "name" },
    { title: "Referencia", dataIndex: "reference", key: "reference" },
    {
      title: "Stock Actual",
      dataIndex: "quantity",
      key: "quantity",
      render: (q) => q?.toFixed(2) || "0.00",
    },
    {
      title: "Gramos Actuales",
      dataIndex: "quantity_in_grams",
      key: "quantity_in_grams",
      render: (g) => (g ? `${g.toFixed(1)} g` : "-"),
    },
    {
      title: "Consumo Simulado",
      dataIndex: "consumed_grams",
      key: "consumed_grams",
      render: (g) => <Tag color="error">{g.toFixed(2)}g</Tag>,
    },
    {
      title: "Stock Restante (Simulado)",
      dataIndex: "simulated_quantity",
      key: "simulated_quantity",
      render: (q) => (
        <Text strong type={q < 0 ? "danger" : "success"}>
          {q.toFixed(2)}
        </Text>
      ),
    },
    {
      title: "Gramos Restantes (Simulado)",
      key: "simulated_grams",
      render: (_, record) => {
        const currentGrams = record.quantity_in_grams || 0;
        const consumedGrams = record.consumed_grams || 0;
        const remainingGrams = Math.max(0, currentGrams - consumedGrams);
        return (
          <Text strong type={remainingGrams < 0 ? "danger" : "success"}>
            {remainingGrams.toFixed(1)} g
          </Text>
        );
      },
    },
  ];

  return (
    <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100 mt-6">
      <div className="flex justify-between items-center mb-6">
        <Title level={4} className="!mb-0 flex items-center gap-2">
          <CalculatorOutlined className="text-blue-600" />
          Simulador de Operaciones
        </Title>
        <Button icon={<ReloadOutlined />} onClick={resetQuantities} type="dashed">
          Reiniciar
        </Button>
      </div>

      <Text type="secondary" className="block mb-4">
        Ingrese el número de servicios proyectados por categoría de vehículo para visualizar el impacto en el inventario.
      </Text>

      <Table
        dataSource={services}
        columns={serviceColumns}
        rowKey="_id"
        pagination={false}
        size="middle"
        className="mb-8"
        scroll={{ x: 600 }}
      />

      <Divider />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <Title level={5} className="!mb-0">Resultados Proyectados</Title>
        <Input
          placeholder="Buscar material o referencia..."
          prefix={<SearchOutlined className="text-gray-400" />}
          className="w-full md:w-64"
          value={materialSearch}
          onChange={(e) => setMaterialSearch(e.target.value)}
          allowClear
        />
      </div>

      <Table
        dataSource={filteredSimulatedMaterials}
        columns={materialColumns}
        rowKey="_id"
        pagination={{
          ...materialPagination,
          onChange: (page, pageSize) => setMaterialPagination({ current: page, pageSize }),
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "50"],
        }}
        size="middle"
        scroll={{ x: 600 }}
      />
    </div>
  );
};

export default StockSimulation;
