import { Modal, Form, Input, Select, notification } from "antd";
import NumberInput from "../../../Common/NumberInput";
import useInventory from "../../../../hooks/useInventory";
import MaterialForm from "../MaterialForm";

function AddMaterialModal({ isModalOpen, setIsModalOpen, onFinish }) {
  const { createStorageMaterial, loading } = useInventory();
  const [form] = Form.useForm();

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
      <MaterialForm form={form} />
    </Modal>
  );
}

export default AddMaterialModal;
