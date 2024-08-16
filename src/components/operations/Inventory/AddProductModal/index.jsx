import { Modal, Form, Input, Select } from "antd";
import NumberInput from "../../../../components/Common/NumberInput";
function AddProductModal({ isModalOpen, setIsModalOpen }) {
  const [form] = Form.useForm();
  const handleOk = () => {
    form.validateFields().then((values) => {
      setIsModalOpen(false);
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

export default AddProductModal;
