import { Form, Input, Select, InputNumber } from "antd";
import NumberInput from "../../../Common/NumberInput";
import { useEffect } from "react";
import { unitOptions } from "../../../../helpers/constants";

/**
 * @param {{
 * setPayload?: () => void,
 * setIsChanged?: () => void,
 * setForm: () => void,
 * storageMaterial: any,
 * isEditing?: boolean
 * setDisabledSubmit?: () => void
 * }} props
 */
function StorageMaterialForm({
  form,
  setForm,
  setIsChanged,
  storageMaterial,
  isEditing = true,
  setDisabledSubmit,
  setPayload,
}) {
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
        name="storage-material-form"
        onFieldsChange={(field) => {
          setPayload &&
            setPayload((prev) => ({
              ...prev,
              [`${field[0].name}`]: field[0].value,
            }));
          setDisabledSubmit && setDisabledSubmit(false);
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
          <Input disabled={!isEditing} />
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

export default StorageMaterialForm;
