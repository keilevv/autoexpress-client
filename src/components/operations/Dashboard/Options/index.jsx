import { useSelector } from "react-redux";
import { useState } from "react";
import { Button, Form, DatePicker, Select } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import {
  employeeRolesOptions,
  statusTypes,
} from "../../../../helpers/constants";
import useViewport from "../../../../hooks/useViewport";

function DashboardOptions({ onApplyFilters = () => {} }) {
  const { isMobileScreen } = useViewport();
  const user = useSelector((state) => state?.auth?.user);
  const employees = useSelector((state) => state.auth.employeeList);
  const productionSubTab = useSelector((state) => state.ui.production.subTab);
  const [showFilters, setShowFilters] = useState(false);
  const [form] = Form.useForm();
  const { RangePicker } = DatePicker;

  function handleApplyFilters() {
    const values = form.getFieldsValue();
    if (values["date-range"]) {
      values.start_date = values["date-range"][0].toISOString();
      values.end_date = values["date-range"][1].toISOString();
      delete values["date-range"];
    }
    if (values["due-date-range"]) {
      values.due_start_date = values["due-date-range"][0].toISOString();
      values.due_end_date = values["due-date-range"][1].toISOString();
      delete values["due-date-range"];
    }
    onApplyFilters(values);
  }

  return (
    <div className="flex flex-col w-full gap-4">
      <div className="flex flex-row">
        <Button
          icon={<FilterOutlined />}
          className={`max-w-[100px] text-gray-500 font-semibold ${
            showFilters ? "outline " : ""
          }`}
          onClick={() => setShowFilters(!showFilters)}
        >
          Filtros
        </Button>
      </div>
      <div
        className={`flex flex-col md:flex-row gap-4 ${
          showFilters ? "show" : "hidden"
        }`}
      >
        <Form
          name="table-filters"
          autoComplete="off"
          form={form}
          className={`flex flex-col w-full gap-4`}
        >
          <div className={`flex flex-wrap gap-4`}>
            {/* Creation Date */}
            <div className="flex flex-col">
              <p className="text-gray-500 mb-4 font-semibold text-sm">
                Fecha de creación
              </p>
              <Form.Item
                name="date-range"
                style={{ width: "100%", margin: "0px" }}
              >
                <RangePicker
                  className={`date-picker ${showFilters ? "show" : ""}`}
                  popupClassName={isMobileScreen ? "dateRangePicker" : ""}
                />
              </Form.Item>
            </div>

            {/* Employee */}
            <div className="flex flex-col">
              <p className="text-gray-500 mb-4 font-semibold text-sm">
                Trabajador responsable
              </p>
              <Form.Item
                name="employee"
                rules={[
                  {
                    required: true,
                    message: "Por favor, seleccione un trabajador",
                  },
                ]}
              >
                <Select className="md:min-w-[300px] min-w-[288px]">
                  {employees?.map((item) => (
                    <Select.Option key={item._id} value={item._id}>
                      {item.name} -{" "}
                      {employeeRolesOptions.find(
                        (role) => role.value === item.roles
                      )?.label || "blue-800"}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>

            {/* Status */}
            {productionSubTab !== "completed" && (
              <div className="flex flex-col">
                <p className="text-gray-500 mb-4 font-semibold text-sm">
                  Situación
                </p>
                <Form.Item name="status">
                  <Select className="md:min-w-[300px] min-w-[288px]">
                    {statusTypes.map((item) => (
                      <Select.Option key={item.value} value={item.value}>
                        {item.label}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
            )}

            {/* Due Date */}
            <div className="flex flex-col">
              <p className="text-gray-500 mb-4 font-semibold text-sm">
                Fecha de entrega
              </p>
              <Form.Item
                name="due-date-range"
                style={{ width: "100%", margin: "0px" }}
              >
                <RangePicker
                  className={`date-picker ${showFilters ? "show" : ""}`}
                  popupClassName={isMobileScreen ? "dateRangePicker" : ""}
                />
              </Form.Item>
            </div>
          </div>

          {/* Button Group */}
          <div className="flex gap-2 my-2">
            <Button
              type="primary"
              onClick={handleApplyFilters}
              icon={<FilterOutlined />}
              className="font-semibold"
            >
              Aplicar
            </Button>
            <Button
              onClick={() => {
                form.resetFields();
                onApplyFilters({});
              }}
              className="font-semibold text-gray-500"
            >
              Limpiar
            </Button>
          </div>
          
        </Form>
      </div>
    </div>
  );
}

export default DashboardOptions;
