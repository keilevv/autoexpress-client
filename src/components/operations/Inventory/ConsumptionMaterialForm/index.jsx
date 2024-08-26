import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Form, InputNumber, Input } from "antd";
import MaterialsList from "../MaterialsList";

function ConsumptionMaterialForm({ form }) {
  const [filterText, setFilterText] = useState("");
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    form.setFieldValue("materials", materials);
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

export default ConsumptionMaterialForm;
