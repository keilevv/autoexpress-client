import { Input, Form } from "antd";
import { unitOptions } from "../../../../../../helpers/constants";
function SingleConsumptionMaterialDetails({
  consumptionMaterial,
  form,
  isEditing,
  setIsChanged
}) {
  return (
    <Form
      name="consumption-material-details"
      form={form}
      initialValues={consumptionMaterial}
      layout="vertical"
      className="flex flex-col gap-2"
      onFieldsChange={() => {
        setIsChanged && setIsChanged(true);
      }}
    >
      <div>
        <label className="font-semibold text-base">Material</label>
        <p className="text-gray-500 ">{`${consumptionMaterial?.material?.name}`}</p>
      </div>
      <div>
        <label className="font-semibold text-base">Número de referencia</label>
        <p className="text-gray-500 ">{`${consumptionMaterial?.material?.reference}`}</p>
      </div>
      <div>
        <label className="font-semibold text-base">Unidad de consumo</label>
        <p className="text-gray-500 ">{`${
          unitOptions.find(
            (unit) => unit.value === consumptionMaterial?.material?.unit
          )?.label
        }`}</p>
      </div>
      <div>
        <label className="font-semibold text-base">
          Cant. disponible para consumo
        </label>
        <Form.Item name={"quantity"} className="mt-1">
          <Input disabled={!isEditing} />
        </Form.Item>
      </div>
    </Form>
  );
}

export default SingleConsumptionMaterialDetails;
