import { Modal, Form, Input, Select, notification } from "antd";
import NumberInput from "../../../Common/NumberInput";
import useInventory from "../../../../hooks/useInventory";
import StorageMaterialForm from "../StrorageMaterialForm";
import ConsumptionMaterialForm from "../ConsumptionMaterialForm";

function AddMaterialModal({ isModalOpen, setIsModalOpen, onFinish, type }) {
  const { createStorageMaterial, loading } = useInventory();
  const [form] = Form.useForm();

  console.log("type", type);
  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        createStorageMaterial(values).then(() => {
          notification.success({
            message: "Material agregado con exito",
          });
          setIsModalOpen(false);
          form.resetFields();
          onFinish();
        });
      })
      .catch((err) => {
        notification.error({
          message: "Error al agregar material",
          description: err.message,
        });
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  function renderModalContent() {
    switch (type) {
      case "storage-inventory":
        return <StorageMaterialForm form={form} />;
      case "consumption-inventory":
        return <ConsumptionMaterialForm form={form} />;
      default:
        return null;
    }
  }

  return (
    <Modal
      confirmLoading={loading}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <h1 className="text-2xl text-red-700 font-semibold mb-5 ">
        Agregar producto
      </h1>
      {renderModalContent()}{" "}
    </Modal>
  );
}

export default AddMaterialModal;
