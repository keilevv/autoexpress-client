import { useEffect, useState } from "react";
import { Modal, Form, notification } from "antd";
import useInventory from "../../../../../hooks/useInventory";
import StorageMaterialForm from "../../StrorageMaterialForm";
import ConsumptionMaterialModalContent from "./ConsumptionMaterialModalContent";

function AddMaterialModal({
  isModalOpen,
  setIsModalOpen,
  onFinish,
  type,
  owner,
}) {
  const { createStorageMaterial, loading, createConsumptionMaterial } =
    useInventory();
  const [form] = Form.useForm();
  const [disabled, setDisabled] = useState(true);
  const [materials, setMaterials] = useState([]);

  const handleOk = () => {
    switch (type) {
      case "storage":
        form.validateFields().then((values) => {
          values.owner = owner;
          createStorageMaterial(values)
            .then((response) => {
              notification.success({
                message: "Material agregado a almacén",
              });
              setIsModalOpen(false);
              form.resetFields();
              onFinish();
            })
            .catch((err) => {
              notification.error({
                message: "Error al agregar material",
                description: err,
              });
            });
        });
        break;

      case "consumption":
        form.validateFields().then((values) => {
          createConsumptionMaterial(values)
            .then(() => {
              notification.success({
                message: "Material de consumo agregado",
              });
              setIsModalOpen(false);
              form.resetFields();
              onFinish();
              setMaterials([]);
            })
            .catch((err) => {
              notification.error({
                message: "Error al agregar material",
                description: err,
              });
            });
        });
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setMaterials([]);
    form.resetFields();
  };

  function renderModalContent() {
    switch (type) {
      case "storage":
        return (
          <StorageMaterialForm form={form} setDisabledSubmit={setDisabled} />
        );
      case "consumption":
        return (
          <ConsumptionMaterialModalContent
            owner={owner}
            materials={materials}
            setMaterials={setMaterials}
            form={form}
            setDisabledSubmit={setDisabled}
          />
        );
      default:
        return null;
    }
  }

  return (
    <Modal
      okButtonProps={{ disabled: disabled }}
      confirmLoading={loading}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <h1 className="text-xl text-blue-800 font-semibold mb-5 ">
        {type === "storage"
          ? "Agregar material a almacen"
          : "Agregar material de consumo"}
      </h1>
      {renderModalContent()}{" "}
    </Modal>
  );
}

export default AddMaterialModal;
