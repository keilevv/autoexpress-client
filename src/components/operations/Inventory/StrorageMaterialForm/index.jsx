import { Form, Input, Select, InputNumber } from "antd";
import { useEffect } from "react";
import { unitOptions } from "../../../../helpers/constants";
import { formatToCurrency } from "../../../../helpers";

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

  const handlePrefill = () => {
    if (storageMaterial) {
      const { name, reference, unit, quantity, price, caution_quantity, margin } =
        storageMaterial;

      form.setFieldsValue({
        name: name,
        reference,
        unit,
        quantity,
        price,
        caution_quantity,
        margin,
      });
    } else {
      form.setFieldsValue({
        name: "",
        reference: "",
        unit: "unit",
        quantity: "",
        caution_quantity: "",
        price: "",
        margin: "",
      });
    }
  };

  useEffect(() => {
    handlePrefill(storageMaterial);
  }, [storageMaterial, isEditing]);

  const renderContent = () => {
    return (
      <Form
        className="flex flex-col gap-4"
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
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-base">Nombre</label>
          {isEditing ? (
            <Form.Item
              name={"name"}
              rules={[
                {
                  required: true,
                  message: "Por favor ingrese el nombre del producto",
                },
              ]}
              className="mt-1"
            >
              <Input disabled={!isEditing} />
            </Form.Item>
          ) : (
            <p className="text-gray-500 ">{`${storageMaterial?.name}`}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-base">Referencia</label>
          {isEditing ? (
            <Form.Item
              name={"reference"}
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
          ) : (
            <p className="text-gray-500 ">{`${storageMaterial?.reference}`}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-base">Unidad de medida</label>
          {isEditing ? (
            <Form.Item
              name={"unit"}
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
          ) : (
            <p className="text-gray-500 ">{`${
              unitOptions.filter(
                (item) => item.value === storageMaterial?.unit
              )[0]?.label
            }`}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-base">Precio unidad</label>
          {isEditing ? (
            <Form.Item name={"price"}>
              <InputNumber
                min={0}
                className="w-full"
                disabled={!isEditing}
                formatter={(value) =>
                  `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
              />
            </Form.Item>
          ) : (
            <p className="text-gray-500 ">{`${formatToCurrency(
              storageMaterial?.price
            )}`}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-base">Margen</label>
          {isEditing ? (
            <Form.Item name={"margin"}>
              <InputNumber
                min={0}
                className="w-full"
                disabled={!isEditing}
                formatter={(value) => `% ${value}`}
              />
            </Form.Item>
          ) : (
            <p className="text-gray-500 ">{`% ${storageMaterial?.margin}`}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-base">Cantidad</label>
          {isEditing ? (
            <Form.Item
              name={"quantity"}
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
          ) : (
            <p className="text-gray-500 ">{`${storageMaterial?.quantity}`}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-base">Cantidad de alarma</label>
          {isEditing ? (
            <Form.Item name={"caution_quantity"} required>
              <InputNumber min={0} className="w-full" disabled={!isEditing} />
            </Form.Item>
          ) : (
            <p className="text-gray-500 ">{`${storageMaterial?.caution_quantity}`}</p>
          )}
        </div>
      </Form>
    );
  };

  return renderContent();
}

export default StorageMaterialForm;
