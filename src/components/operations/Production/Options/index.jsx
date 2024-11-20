import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Button, Form, Input, DatePicker, Select } from "antd";
import { PlusOutlined, FilterOutlined } from "@ant-design/icons";
import NewJobOrderModal from "./NewJobOrderModal";
import {
  employeeRolesOptions,
  statusTypes,
} from "../../../../helpers/constants";
import useViewport from "../../../../hooks/useViewport";

function ProductionOptions({
  onFinish,
  type,
  onSearch = () => {},
  onApplyFilters = () => {},
  owner = "autoexpress",
}) {
  const { isMobileScreen } = useViewport();
  const user = useSelector((state) => state?.auth?.user);
  const employees = useSelector((state) => state.auth.employeeList);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    onApplyFilters(values);
  }

  return (
    <div className="flex flex-col w-full gap-4">
      <div className="flex flex-row gap-2">
        <Input
          className="w-full"
          placeholder="Número o placa..."
          onChange={(e) => onSearch(e.target.value)}
        />
        {!user?.roles?.includes("autodetailing-operator") && (
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsModalOpen(true)}
          >
            Agregar orden de trabajo
          </Button>
        )}
        <NewJobOrderModal
          owner={owner}
          onFinish={onFinish}
          form={form}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      </div>
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
          name={`table-filters`}
          autoComplete="off"
          form={form}
          className={`flex ${
            isMobileScreen ? "flex-col" : "flex-wrap"
          } w-full gap-2`}
        >
          <div className="flex flex-col">
            <p className="text-gray-500 mb-4 font-semibold text-sm">{`Fecha de creación`}</p>
            <Form.Item
              name={"date-range"}
              style={{ width: "100%", margin: "0px" }}
            >
              <RangePicker
                className={`date-picker ${showFilters ? "show" : ""}`}
              />
            </Form.Item>
          </div>
          <div className="flex flex-col">
            <p className="text-gray-500 mb-4 font-semibold text-sm">{`Trabajador responsable`}</p>

            <Form.Item
              name={"employee"}
              rules={[
                {
                  required: true,
                  message: "Por favor, seleccione un trabajador",
                },
              ]}
            >
              <Select className="md:min-w-[300px]">
                {employees &&
                  employees.map((item) => {
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
          </div>
          <div className="flex flex-col">
            <p className="text-gray-500 mb-4 font-semibold text-sm">{`Situación`}</p>
            <Form.Item name={"status"}>
              <Select className="md:min-w-[300px]">
                {statusTypes.map((item) => {
                  return (
                    <Select.Option key={item.value} value={item.value}>
                      {item.label}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
          </div>
        </Form>
        <div className={"flex gap-2 items-end"}>
          <Button
            type="primary"
            onClick={() => onApplyFilters && handleApplyFilters()}
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
      </div>
    </div>
  );
}

export default ProductionOptions;
