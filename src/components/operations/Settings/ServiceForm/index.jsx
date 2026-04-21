import { Form, Input, InputNumber, Select, Button, Space, Divider } from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { formatToCurrency } from "../../../../helpers";

const { Option } = Select;
const { TextArea } = Input;

function ServiceForm({ form, onFinish, materials, loading, initialValues }) {
  const owner = Form.useWatch("owner", form);

  const filteredMaterials = materials.filter((m) => {
    if (!owner || owner === "both") return true;
    return m.owner === owner || m.owner === "both";
  });

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      autoComplete="off"
      initialValues={{
        owner: "both",
        small_car_price: 0,
        large_car_price: 0,
        small_truck_price: 0,
        large_truck_price: 0,
      }}
    >
      <Form.Item
        name="name"
        label="Nombre del Servicio"
        rules={[{ required: true, message: "Por favor ingrese el nombre" }]}
      >
        <Input placeholder="Ej. Lavado General" />
      </Form.Item>

      <Form.Item name="description" label="Descripción">
        <TextArea rows={2} placeholder="Descripción opcional" />
      </Form.Item>

      <Form.Item
        name="owner"
        label="Sede"
        rules={[{ required: true, message: "Seleccione una sede" }]}
      >
        <Select>
          <Option value="autoexpress">Autoexpress</Option>
          <Option value="autodetailing">Autodetailing</Option>
          <Option value="both">Ambas</Option>
        </Select>
      </Form.Item>

      <Divider orientation="left">Precios por Categoría</Divider>
      <div className="grid grid-cols-2 gap-4">
        <Form.Item name="small_car_price" label="Carro Pequeño">
          <InputNumber
            className="w-full"
            formatter={(value) => (value ? formatToCurrency(value) : "$ 0")}
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
          />
        </Form.Item>
        <Form.Item name="large_car_price" label="Carro Grande">
          <InputNumber
            className="w-full"
            formatter={(value) => (value ? formatToCurrency(value) : "$ 0")}
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
          />
        </Form.Item>
        <Form.Item name="small_truck_price" label="Camioneta Pequeña">
          <InputNumber
            className="w-full"
            formatter={(value) => (value ? formatToCurrency(value) : "$ 0")}
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
          />
        </Form.Item>
        <Form.Item name="large_truck_price" label="Camioneta Grande">
          <InputNumber
            className="w-full"
            formatter={(value) => (value ? formatToCurrency(value) : "$ 0")}
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
          />
        </Form.Item>
      </div>

      <Divider orientation="left">Materiales Utilizados</Divider>
      <Form.List name="materials">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <div key={key} className="p-4 border rounded-lg mb-4 bg-gray-50">
                <div className="flex justify-between items-start mb-2">
                  <Form.Item
                    {...restField}
                    name={[name, "material"]}
                    rules={[{ required: true, message: "Seleccione material" }]}
                    className="flex-grow mr-4 !mb-0"
                  >
                    <Select
                      showSearch
                      placeholder="Seleccionar material"
                      optionFilterProp="label"
                      filterOption={(input, option) =>
                        (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
                      }
                    >
                      {filteredMaterials.map((m) => (
                        <Option
                          key={m._id}
                          value={m._id}
                          label={`${m.name} (${m.reference})`}
                        >
                          {m.name} ({m.reference})
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Button
                    type="text"
                    danger
                    icon={<MinusCircleOutlined />}
                    onClick={() => remove(name)}
                  />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  <Form.Item
                    {...restField}
                    name={[name, "small_car_grams"]}
                    label={<span className="text-xs">Carro Peq. (g)</span>}
                    className="!mb-0"
                  >
                    <InputNumber placeholder="g" min={0} className="w-full" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "large_car_grams"]}
                    label={<span className="text-xs">Carro Gde. (g)</span>}
                    className="!mb-0"
                  >
                    <InputNumber placeholder="g" min={0} className="w-full" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "small_truck_grams"]}
                    label={<span className="text-xs">Camioneta Peq. (g)</span>}
                    className="!mb-0"
                  >
                    <InputNumber placeholder="g" min={0} className="w-full" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "large_truck_grams"]}
                    label={<span className="text-xs">Camioneta Gde. (g)</span>}
                    className="!mb-0"
                  >
                    <InputNumber placeholder="g" min={0} className="w-full" />
                  </Form.Item>
                </div>
              </div>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Agregar Material
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} block>
          {initialValues ? "Actualizar Servicio" : "Crear Servicio"}
        </Button>
      </Form.Item>
    </Form>
  );
}

export default ServiceForm;
