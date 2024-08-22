import { Form, InputNumber } from "antd";

function ConsumptionMaterialForm() {
  const [form] = Form.useForm();
  return (
    <Form name="consumption" layout="vertical" form={form}>
      <Form.Item
        name="quantity"
        label="Cant. Consumida"
        rules={[{ required: true }]}
      >
        <InputNumber min={0} />
      </Form.Item>
    </Form>
  );
}

export default ConsumptionMaterialForm;
