import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Modal, Form, notification } from "antd";
import useInventory from "../../../../../hooks/useInventory";
import AddSaleModalContent from "./ModalContent";

function AddSaleModal({ isModalOpen, setIsModalOpen, onFinish, type }) {
  const user = useSelector((state) => state.auth.user);
  const { loading, createSale } = useInventory();
  const [form] = Form.useForm();
  const [disabled, setDisabled] = useState(true);
  const [materials, setMaterials] = useState([]);

  const handleOk = () => {
    materials.map((material) => {
      material["material"] = material["material_id"];
      delete material["material_id"];
      return material;
    });

    createSale({
      user: user.id,
      customer_name: form.getFieldValue("customer_name"),
      materials,
    })
      .then((response) => {
        if (response) {
          notification.success({
            message: "Venta registrada exitosamente",
          });
          setIsModalOpen(false);
          form.resetFields();
          setMaterials([]);
          onFinish();
        }
      })
      .catch((err) => {
        notification.error({
          message: "Error al registrar venta",
          description: err,
        });
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setMaterials([]);
    form.resetFields();
  };

  return (
    <Modal
      okButtonProps={{ disabled: disabled }}
      confirmLoading={loading}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <h1 className="text-xl text-red-700 font-semibold mb-5 ">
        Agregar venta nueva
      </h1>
      <AddSaleModalContent
        form={form}
        materials={materials}
        setMaterials={setMaterials}
        setDisabledSubmit={setDisabled}
      />
    </Modal>
  );
}

export default AddSaleModal;
