import { Button, Input, DatePicker, Form } from "antd";
import _debounce from "lodash/debounce";
import "./style.css";
import { useEffect, useState } from "react";
/**
 * @param {{ onSearch?: () => string, type?: string, onApplyFilters?: () => any }} props
 */
function TableActions({ type, onApplyFilters, onSearch }) {
  const [showFilters, setShowFilters] = useState(false);
  const [showSubmit, setShowSubmit] = useState(false);
  const [form] = Form.useForm();

  const { RangePicker } = DatePicker;
  function getSearchPlaceholder() {
    if (type === "clients") {
      return "Buscar por nombre...";
    }
    if (type === "cars") {
      return "Buscar por placa...";
    }
    if (type === "appointments") {
      return "Buscar por cliente...";
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

  return (
    <div className="table-actions">
      <div className={`filters ${showFilters ? "show" : ""}`}>
        <div className="search-input">
          <Input
            placeholder={searchPlaceholder}
            onChange={(e) => {
              handleSearch(e.target.value);
            }}
          />
        </div>
        <div className="action-buttons">
          <Button
            icon={<i className="fa-solid fa-filter"></i>}
            className={`filter-button ${showFilters ? "highlighted" : ""}`}
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
        </div>
        <Form
          name="table-filters"
          autoComplete="off"
          onFieldsChange={() => setShowSubmit(true)}
          form={form}
        >
          <Form.Item
            name={"date-range"}
            style={{ width: "100%", margin: "0px" }}
          >
            <RangePicker
              className={`date-picker ${showFilters ? "show" : ""}`}
            />
          </Form.Item>
        </Form>
        <div className="filter-actions">
          <Button
            type="primary"
            onClick={() => onApplyFilters && handleApplyFilters()}
            className={`submit-button ${showSubmit ? "show" : ""}`}
          >
            Filtrar
          </Button>
          <Button
            onClick={() => {
              form.resetFields();
              setShowSubmit(false);
            }}
            className={`submit-button ${showSubmit ? "show" : ""}`}
          >
            Limpiar
          </Button>
        </div>
      </div>
    </div>
  );
}

export default TableActions;
