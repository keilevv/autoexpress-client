import { useEffect } from "react";
import { Input, Form, DatePicker, Select } from "antd";
import dayjs from "dayjs";
import "./style.css";
import useEmployees from "../../../../../../hooks/useEmployee";
import { employeeRolesOptions } from "../../../../../../helpers/constants";
import { validateCarPlate } from "../../../../../../helpers";
function JobOrderDetails({ jobOrder, form, isEditing, setIsChanged }) {
  const { getEmployees, employees } = useEmployees();

  useEffect(() => {
    getEmployees(1, 100, "&archived=false");
  }, []);

  const initialValues = {
    ...jobOrder,
    due_date: dayjs(jobOrder?.date),
    employee: jobOrder?.employee?._id,
  };

  return (
    <Form
      name="job-order-details"
      form={form}
      initialValues={initialValues}
      layout="vertical"
      className="flex flex-col gap-4"
      onFieldsChange={() => {
        setIsChanged && setIsChanged(true);
      }}
    >
      <div className="gap-2 flex flex-col">
        <label className="font-semibold text-base">Número de orden</label>
        {isEditing ? (
          <Form.Item
            name={"number"}
            rules={[
              {
                required: true,
                message: "Por favor, ingrese un numero de orden",
              },
            ]}
          >
            <Input />
          </Form.Item>
        ) : (
          <p className="text-gray-500 ">{`${jobOrder?.number}`}</p>
        )}
      </div>
      <div className="gap-2 flex flex-col">
        <label className="font-semibold text-base">
          Trabajador responsable
        </label>
        {isEditing ? (
          <Form.Item
            name={"employee"}
            initialValue={jobOrder?.employee?._id}
            rules={[
              {
                required: true,
                message: "Por favor, seleccione un trabajador",
              },
            ]}
          >
            <Select>
              {employees.map((item) => {
                return (
                  <Select.Option key={item._id} value={item._id}>
                    {item.name} -{" "}
                    {
                      employeeRolesOptions.find(
                        (role) => role.value === item.roles
                      ).label
                    }
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
        ) : (
          <p className="text-gray-500 ">{`${jobOrder?.employee?.name}`}</p>
        )}
      </div>
      <div className="gap-2 flex flex-col">
        <label className="font-semibold text-base">Placa del vehículo</label>
        {isEditing ? (
          <Form.Item
            name={"car_plate"}
            rules={[
              {
                required: true,
                message: "Por favor, ingrese una placa",
              },
              {
                validator: validateCarPlate,
                message: "Por favor, ingrese una placa válida",
              },
            ]}
          >
            <Input />
          </Form.Item>
        ) : (
          <p className="text-gray-500 ">{`${String(
            jobOrder?.car_plate
          ).toUpperCase()}`}</p>
        )}
      </div>
      <div className="gap-2 flex flex-col">
        <label className="font-semibold text-base">Fecha de entrega</label>
        {isEditing ? (
          <Form.Item
            name={"due_date"}
            rules={[
              {
                required: true,
                message: "Por favor, ingrese una fecha",
              },
            ]}
          >
            <DatePicker format={"DD/MM/YYYY"} />
          </Form.Item>
        ) : (
          <p className="text-gray-500 ">{`${dayjs(jobOrder?.due_date).format(
            "DD/MM/YYYY"
          )}`}</p>
        )}
      </div>
    </Form>
  );
}

export default JobOrderDetails;
