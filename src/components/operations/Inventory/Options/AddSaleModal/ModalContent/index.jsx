import { useEffect, useState } from "react";
import { Form, Input } from "antd";
import MaterialsList from "../../../MaterialsList";

function AddSaleModalContent({
  form,
  setDisabledSubmit,
  materials,
  setMaterials,
}) {
  const [filterText, setFilterText] = useState("");
  const [isClientChanged, setIsClientChanged] = useState(false);

  useEffect(() => {
    form.setFieldValue("materials", materials);
    if (materials.length > 0 && isClientChanged) {
      setDisabledSubmit(false);
    } else {
      setDisabledSubmit(true);
    }
  }, [materials, isClientChanged]);

  return (
    <div>
      <Form name="sale-material-form" form={form}>
        <Form.Item name={"customer_name"}>
          <p className="font-semibold text-base mb-4">Nombre del cliente</p>
          <Input
          className="mb-4"
            placeholder="Nombre del cliente"
            defaultValue={""}
            onChange={(e) => {
              form.setFieldValue("customer_name", e.target.value);
              if (e.target.value) {
                setIsClientChanged(true);
              }
            }}
          />
        </Form.Item>
        <Form.Item name={"sales"} className="mb-4">
          <MaterialsList
            filterText={filterText}
            materials={materials}
            setMaterials={setMaterials}
            type="sales"
          />
        </Form.Item>
      </Form>
    </div>
  );
}

export default AddSaleModalContent;
