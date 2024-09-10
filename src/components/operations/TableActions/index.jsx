import { Button, Input, DatePicker, Form } from "antd";
import _debounce from "lodash/debounce";
import { useEffect, useState } from "react";
import {
  FilterOutlined,
  SearchOutlined,
  RestOutlined,
} from "@ant-design/icons";
/**
 * @param {{ onSearch?: () => string, type?: string, onApplyFilters?: () => any, tab?: string }} props
 */
function TableActions({ type, tab, onApplyFilters, onSearch }) {
  const [showFilters, setShowFilters] = useState(false);
  const [showSubmit, setShowSubmit] = useState(false);
  const [form] = Form.useForm();

  const { RangePicker } = DatePicker;
  function getSearchPlaceholder() {
    if (type === "clients") {
      return "Nombre...";
    }
    if (type === "cars") {
      return "Placa...";
    }
    if (type === "appointments") {
      return "Cliente...";
    }
    return "Buscar...";
  }
  const searchPlaceholder = getSearchPlaceholder();

  const handleSearch = _debounce((value) => {
    onSearch(value);
  }, 300);

  function handleApplyFilters() {
    const values = form.getFieldsValue();
    if (values["date-range"]) {
      values.start_date = values["date-range"][0].format("YYYY/MM/DD");
      values.end_date = values["date-range"][1].format("YYYY/MM/DD");
      delete values["date-range"];
    }
    onApplyFilters(values);
  }

  useEffect(() => {
    form.resetFields();
    setShowSubmit(false);
  }, [tab]);

  return (
    <div className="flex flex-col gap-4 mb-4">
      <Input
        className="md:max-w-[80%]"
        placeholder={searchPlaceholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        prefix={<SearchOutlined className="text-gray-500 mx-[6px]" />}
      />
      <Button
        icon={<FilterOutlined />}
        className={`max-w-[100px] text-gray-500 font-semibold ${
          showFilters ? "outline " : ""
        }`}
        onClick={() =>
          setShowFilters((prev) => {
            if (prev) {
              form.resetFields();
              setShowSubmit(false);
            }
            return !prev;
          })
        }
      >
        Filtros
      </Button>
      <div
        className={`flex flex-col md:flex-row gap-4 ${
          showFilters ? "show" : "hidden"
        }`}
      >
        <Form
          name={`table-filters`}
          autoComplete="off"
          onFieldsChange={() => setShowSubmit(true)}
          form={form}
          layout="vertical"
        >
          <p className="text-gray-500 mb-4 font-semibold text-sm">{`Fecha de ${
            type === "appointments" ? "servicio" : "creación"
          }`}</p>
          <Form.Item
            name={"date-range"}
            style={{ width: "100%", margin: "0px" }}
          >
            <RangePicker
              className={`date-picker ${showFilters ? "show" : ""}`}
            />
          </Form.Item>
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
              setShowSubmit(false);
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

export default TableActions;
