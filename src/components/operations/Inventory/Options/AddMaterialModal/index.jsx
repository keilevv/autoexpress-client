import { useEffect, useState } from "react";
import { Modal, Form, notification, Switch } from "antd";
import useInventory from "../../../../../hooks/useInventory";
import StorageMaterialForm from "../../StrorageMaterialForm";
import ConsumptionMaterialModalContent from "./ConsumptionMaterialModalContent";
import AddExistingMaterial from "./AddExistingMaterial";

function AddMaterialModal({
  isModalOpen,
  setIsModalOpen,
  onFinish,
  type,
  owner,
}) {
  const {
    createStorageMaterial,
    loading,
    createConsumptionMaterial,
    restockStorageMaterials,
  } = useInventory();
  const [form] = Form.useForm();
  const [disabled, setDisabled] = useState(true);
  const [materials, setMaterials] = useState([]);
  const [existingMaterial, setExistingMaterial] = useState(false);

  const handleOk = () => {
    if (existingMaterial) {
      form.validateFields().then((values) => {
        restockStorageMaterials(values)
          .then(() => {
            setMaterials([]);
            notification.success({
              message: "Materiales agregados a almacén",
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
    } else {
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
          <>
            <div className="flex mb-4 justify-between">
              <p className=" font-semibold text-blue-800">
                {existingMaterial ? "Material existente" : "Nuevo material"}
              </p>
              <Switch onChange={() => setExistingMaterial(!existingMaterial)} />
            </div>
            {existingMaterial ? (
              <AddExistingMaterial
                owner={owner}
                materials={materials}
                setMaterials={setMaterials}
                form={form}
                setDisabledSubmit={setDisabled}
              />
            ) : (
              <StorageMaterialForm
                form={form}
                setDisabledSubmit={setDisabled}
                existingMaterial={existingMaterial}
              />
            )}
          </>
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
