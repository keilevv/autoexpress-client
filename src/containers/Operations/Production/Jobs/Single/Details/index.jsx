import { useEffect, useCallback } from "react";
import { Input, Form, DatePicker, Select } from "antd";
import dayjs from "dayjs";
import StatusLabel from "../../../../../../components/operations/Production/StatusLabel";
import useEmployees from "../../../../../../hooks/useEmployee";
import { employeeRolesOptions } from "../../../../../../helpers/constants";
import { validateCarPlate } from "../../../../../../helpers";
import _debounce from "lodash/debounce";
import "./style.css";

function JobOrderDetails({ jobOrder, form, isEditing, setIsChanged }) {
  const { getEmployees, employees, loading } = useEmployees();

  useEffect(() => {
    getEmployees(1, 100, "&archived=false");
  }, []);

  const initialValues = {
    ...jobOrder,
    due_date: dayjs(jobOrder?.date),
    employee: jobOrder?.employee?._id,
  };

  const handleSearchEmployee = (value) => {
    getEmployees(1, 100, `&full_name=${value}`);
  };

  const debounceFn = useCallback(_debounce(handleSearchEmployee, 300), []);
  useEffect(() => {}, [employees]);

  const statusTypes = [
    { value: "pending", label: "Pendiente", color: "orange-300" },
    { value: "in-progress", label: "En progreso", color: "blue-300" },
    { value: "completed", label: "Completado", color: "green-300" },
  ];
  return (
    <Form
      name="job-order-details"
      form={form}
      initialValues={initialValues}
      layout="vertical"
      className="flex flex-col gap-4 "
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
        <label className="font-semibold text-base">Descripción</label>
        {isEditing ? (
          <Form.Item
            name={"description"}
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
          <p className="text-gray-500 ">{`${jobOrder?.description}`}</p>
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
            <Select
              showSearch
              onSearch={(value) => debounceFn(value)}
              filterOption={false}
              loading={loading}
            >
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
      <div className="gap-2 flex flex-col">
        <label className="font-semibold text-base">Situación</label>
        {isEditing ? (
          <Form.Item name={"status"}>
            <Select showSearch>
              {statusTypes.map((item) => {
                return (
                  <Select.Option key={item.value} value={item.value}>
                    {item.label}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
        ) : (
          <StatusLabel status={jobOrder?.status[0]} />
        )}
      </div>
    </Form>
  );
}

export default JobOrderDetails;
