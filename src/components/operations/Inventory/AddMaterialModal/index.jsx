import { Modal, Form, Input, Select, notification } from "antd";
import NumberInput from "../../../Common/NumberInput";
import useMaterials from "../../../../hooks/useMaterials";

function AddMaterialModal({ isModalOpen, setIsModalOpen }) {
  const { createStorageMaterial } = useMaterials();
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

  const unitOptions = [
    { value: "unit", label: "Unidad" },
    { value: "litro", label: "Litro" },
    { value: "galon", label: "Galón" },
    { value: "kilo", label: "Kilo" },
  ];
  return (
    <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <h1 className="text-2xl text-red-700 font-semibold mb-5 ">
        Agregar producto
      </h1>
      <Form form={form} layout="vertical" initialValues={{ unit: "unit" }}>
        <Form.Item
          name={"name"}
          label="Nombre"
          required
          rules={[
            {
              required: true,
              message: "Por favor ingrese el nombre del producto",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={"reference"}
          label="Referencia"
          required
          rules={[
            {
              required: true,
              message: "Por favor ingrese el numero de referencia",
            },
          ]}
        >
          <NumberInput />
        </Form.Item>
        <Form.Item
          name={"unit"}
          label="Unidad de medida"
          required
          rules={[
            {
              required: true,
              message: "Por favor ingrese la unidad de medida",
            },
          ]}
        >
          <Select options={unitOptions} />
        </Form.Item>
        <Form.Item
          name={"quantity"}
          label="Cantidad"
          required
          rules={[
            {
              required: true,
              message: "Por favor ingrese la cantidad",
            },
          ]}
        >
          <NumberInput />
        </Form.Item>
        <Form.Item name={"price"} label="Precio">
          <NumberInput prefix="$" />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddMaterialModal;
