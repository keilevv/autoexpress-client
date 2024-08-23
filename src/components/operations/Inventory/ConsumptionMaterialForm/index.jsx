import { useState } from "react";
import { Form, InputNumber, Input } from "antd";
import MaterialsList from "../MaterialsList";

function ConsumptionMaterialForm({ form }) {
  const [filterText, setFilterText] = useState("");
  const [materials, setMaterials] = useState([]);
  const [payload, setPayload] = useState({ materials: [] });

  return (
    <div>
      <Form name="consumption-material-form" form={form}>
        <MaterialsList
          filterText={filterText}
          materials={materials}
          setMaterials={setMaterials}
        />
      </Form>
    </div>
  );
}

export default ConsumptionMaterialForm;
