import { useEffect, useState } from "react";
import { Modal, Form, notification } from "antd";
import useInventory from "../../../../hooks/useInventory";
import StorageMaterialForm from "../StrorageMaterialForm";
import ConsumptionMaterialModalContent from "../ConsumptionMaterialModalContent";

function AddMaterialModal({ isModalOpen, setIsModalOpen, onFinish, type }) {
  const { createStorageMaterial, loading, createConsumptionMaterial } =
    useInventory();
  const [form] = Form.useForm();
  const [disabled, setDisabled] = useState(true);
  const [materials, setMaterials] = useState([]);

  const handleOk = () => {
    switch (type) {
      case "storage-inventory":
        form.validateFields().then((values) => {
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

      case "consumption-inventory":
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
    form.resetFields();
  };

  function renderModalContent() {
    switch (type) {
      case "storage-inventory":
        return (
          <StorageMaterialForm form={form} setDisabledSubmit={setDisabled} />
        );
      case "consumption-inventory":
        return (
          <ConsumptionMaterialModalContent
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
      <h1 className="text-xl text-red-700 font-semibold mb-5 ">
        {type === "storage-inventory"
          ? "Agregar material para almacen"
          : "Agregar material para consumo"}
      </h1>
      {renderModalContent()}{" "}
    </Modal>
  );
}

export default AddMaterialModal;
