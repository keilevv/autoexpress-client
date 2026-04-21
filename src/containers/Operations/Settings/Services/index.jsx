import { useState, useEffect } from "react";
import { Table, Button, Modal, Form, notification, Space, Popconfirm, Tag } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import useServices from "../../../../hooks/useServices";
import useInventory from "../../../../hooks/useInventory";
import ServiceForm from "../../../../components/operations/Settings/ServiceForm";
import { formatToCurrency } from "../../../../helpers";

function ServicesSettingsContainer() {
  const { services, getServices, createService, updateService, deleteService, loading, count } = useServices();
  const { storageMaterials, getStorageMaterials } = useInventory();
  
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [form] = Form.useForm();
  
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  useEffect(() => {
    getServices(pagination.current, pagination.pageSize);
    getStorageMaterials(1, 1000, "&archived=false"); // Get all materials for selection
  }, [pagination.current, pagination.pageSize]);

  useEffect(() => {
    setPagination((prev) => ({ ...prev, total: count }));
  }, [count]);

  const showModal = (service = null) => {
    setEditingService(service);
    setIsModalVisible(true);
    if (service) {
      // Map materials to form structure if needed
      const initialValues = {
        ...service,
        materials: service.materials?.map(m => ({
          material: m.material?._id || m.material,
          small_car_grams: m.small_car_grams,
          large_car_grams: m.large_car_grams,
          small_truck_grams: m.small_truck_grams,
          large_truck_grams: m.large_truck_grams,
        }))
      };
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingService(null);
    form.resetFields();
  };

  const onFinish = (values) => {
    if (editingService) {
      updateService(editingService._id, values).then((res) => {
        if (res) {
          notification.success({ message: "Servicio actualizado exitosamente" });
          handleCancel();
          getServices(pagination.current, pagination.pageSize);
        }
      });
    } else {
      createService(values).then((res) => {
        if (res) {
          notification.success({ message: "Servicio creado exitosamente" });
          handleCancel();
          getServices(pagination.current, pagination.pageSize);
        }
      });
    }
  };

  const handleDelete = (id) => {
    deleteService(id).then((res) => {
      if (res) {
        notification.success({ message: "Servicio eliminado exitosamente" });
      }
    });
  };

  const columns = [
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "Sede",
      dataIndex: "owner",
      key: "owner",
      render: (owner) => {
        const colors = { autoexpress: "blue", autodetailing: "orange", both: "green" };
        const labels = { autoexpress: "AutoExpress", autodetailing: "AutoDetailing", both: "Ambas" };
        return <Tag color={colors[owner]}>{labels[owner]}</Tag>;
      },
    },
    {
      title: "Precio Carro Peq.",
      dataIndex: "small_car_price",
      key: "small_car_price",
      render: (price) => formatToCurrency(price),
    },
    {
      title: "Precio Carro Gde.",
      dataIndex: "large_car_price",
      key: "large_car_price",
      render: (price) => formatToCurrency(price),
    },
    {
      title: "Precio Camioneta Peq.",
      dataIndex: "small_truck_price",
      key: "small_truck_price",
      render: (price) => formatToCurrency(price),
    },
    {
      title: "Precio Camioneta Gde.",
      dataIndex: "large_truck_price",
      key: "large_truck_price",
      render: (price) => formatToCurrency(price),
    },
    {
      title: "Acciones",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => showModal(record)} />
          <Popconfirm title="¿Eliminar este servicio?" onConfirm={() => handleDelete(record._id)}>
            <Button icon={<DeleteOutlined />} danger />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Configuración de Servicios</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal()}>
          Agregar Servicio
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={services}
        rowKey="_id"
        loading={loading}
        pagination={pagination}
        onChange={(p) => setPagination(p)}
      />

      <Modal
        title={editingService ? "Editar Servicio" : "Nuevo Servicio"}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={700}
      >
        <ServiceForm
          form={form}
          onFinish={onFinish}
          materials={storageMaterials}
          loading={loading}
          initialValues={editingService}
        />
      </Modal>
    </div>
  );
}

export default ServicesSettingsContainer;
