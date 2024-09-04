import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Form, InputNumber, Input } from "antd";
import MaterialsList from "../../../MaterialsList";

function ConsumptionMaterialModalContent({
  form,
  setDisabledSubmit,
  materials,
  setMaterials,
}) {
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    form.setFieldValue("materials", materials);
    if (materials.length > 0) {
      setDisabledSubmit(false);
    } else {
      setDisabledSubmit(true);
    }
  }, [materials]);

  return (
    <div>
      <Form name="consumption-material-form" form={form}>
        <Form.Item name={"materials"}>
          <MaterialsList
            filterText={filterText}
            materials={materials}
            setMaterials={setMaterials}
          />
        </Form.Item>
      </Form>
    </div>
  );
}

export default ConsumptionMaterialModalContent;
