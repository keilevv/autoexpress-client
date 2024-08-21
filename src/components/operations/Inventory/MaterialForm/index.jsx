import { Form, Input, Select, InputNumber } from "antd";
import NumberInput from "../../../Common/NumberInput";
import { useEffect } from "react";
import dayjs from "dayjs";

/**
 * @param {{
 * setIsChanged?: () => void,
 * setForm: () => void,
 * showFullForm?: boolean,
 * storageMaterial: any,
 * isClientDetails?: boolean,
 * isEditing?: boolean
 * }} props
 */
function MaterialForm({
  form,
  setForm,
  setIsChanged,
  storageMaterial,
  isEditing = true,
}) {
  const unitOptions = [
    { value: "unit", label: "Unidad" },
    { value: "litro", label: "Litro" },
    { value: "galon", label: "Galón" },
    { value: "kilo", label: "Kilo" },
  ];

  useEffect(() => {
    setForm && setForm(form);
  }, [form, setForm]);

  const handlePrefill = (client) => {
    if (storageMaterial) {
      const { name, reference, unit, quantity, price } = storageMaterial;

      form.setFieldsValue({
        name: name,
        reference,
        unit,
        quantity,
        price,
      });
    } else {
      form.setFieldsValue({
        name: "",
        reference: "",
        unit: "unit",
        quantity: "",
        price: "",
      });
    }
  };

  useEffect(() => {
    handlePrefill(storageMaterial);
  }, [storageMaterial, isEditing]);

  const renderContent = () => {
    return (
      <Form
        form={form}
        layout="vertical"
        initialValues={{ unit: "unit" }}
        name="material"
        onFieldsChange={() => {
          setIsChanged && setIsChanged(true);
        }}
      >
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
          <Input disabled={!isEditing} />
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
          <NumberInput disabled={!isEditing} />
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
          <Select options={unitOptions} disabled={!isEditing} />
        </Form.Item>
        <Form.Item name={"price"} label="Precio unidad">
          <InputNumber
            min={0}
            className="w-full"
            disabled={!isEditing}
            formatter={(value) =>
              `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
          />
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
          <InputNumber min={0} className="w-full" disabled={!isEditing} />
        </Form.Item>
      </Form>
    );
  };

  return renderContent();
}

export default MaterialForm;
