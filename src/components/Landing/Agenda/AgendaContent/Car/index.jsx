import { useEffect, useState, useCallback } from "react";
import _debounce from "lodash/debounce";
import { Form, Input, Row, Popover, DatePicker, Select } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import useCars from "../../../../../hooks/useCars";
import useViewport from "../../../../../hooks/useViewport";
import dayjs from "dayjs";

import "./style.css";
/**
 * @param {{ setForm: () => void }} props
 */
function CarForm({ setForm }) {
  const { isMobileScreen } = useViewport();
  const [brand, setBrand] = useState("");
  const [disableModels, setDisableModels] = useState(false);
  const { getCarsApi, carBrands, loading, carModels } = useCars();
  const [model, setModel] = useState("");
  const [form] = Form.useForm();

  useEffect(() => {
    getCarsApi();
  }, []);

  useEffect(() => {
    setForm(form);
  }, [form]);

  useEffect(() => {
    getCarsApi("", brand);
    if (brand.length) {
      setDisableModels(false);
    } else {
      setDisableModels(true);
    }
  }, [brand]);

  useEffect(() => {
    if (brand.length) {
      form.setFieldValue("brand", brand);
    }
    if (model.length) {
      form.setFieldValue("model", model);
    }
  }, [brand, model]);

  const validateCarPlate = async (rule, value) => {
    const carPlateRegex = /^[a-zA-Z]{3}\d{3}$/;

    if (!value || carPlateRegex.test(value)) {
      return Promise.resolve();
    }

    return Promise.reject(
      "Please enter a string with 3 letters followed by 3 numbers."
    );
  };
  const validateVin = async (rule, value) => {
    const carVinRegex = /^(?=.*[0-9])(?=.*[A-z])[0-9A-z-]{16}$/;

    if (!value || carVinRegex.test(value)) {
      return Promise.resolve();
    }

    return Promise.reject(
      "Please enter a string with 3 letters followed by 3 numbers."
    );
  };

  function handleDebounceFn(inputValue, brand) {
    getCarsApi(inputValue, brand);
  }
  const debounceFn = useCallback(_debounce(handleDebounceFn, 300), []);

  const vinExplainContent = (
    <p className="vin-explain-content">
      Esta información se encuentra en la cara frontal de su licencia de
      transito.
    </p>
  );

  return (
    <Form
      form={form}
      layout="vertical"
      name="car"
      labelCol={{
        span: 30,
      }}
      style={{
        maxWidth: 700,
      }}
      initialValues={{
        remember: true,
      }}
      autoComplete="on"
    >
      <div className="car-form-container">
        <p className="car-info-title"> Ingrese la información de su vehículo</p>
        <div className="car-fields-container">
          <Row>
            <Form.Item
              label="Placa"
              name="plate"
              rules={[
                {
                  validator: validateCarPlate,
                  message: "Por favor ingrese una placa válida",
                },
                {
                  required: true,
                  message: "Por favor ingrese su placa",
                },
              ]}
            >
              <Input allowClear maxLength={6} className="uppercase-input" />
            </Form.Item>
          </Row>
          <Row>
            <Form.Item
              label="VIN"
              name="vin"
              rules={[
                {
                  validator: validateVin,
                  message: "Por favor ingrese un VIN válido",
                },
                {
                  required: true,
                  message: "Por favor ingrese su VIN",
                },
              ]}
            >
              <div className="form-item-explain">
                <Input allowClear className="uppercase-input" maxLength={16} />
                <Popover
                  placement={isMobileScreen ? "top" : "right"}
                  trigger={["click", "hover"]}
                  content={vinExplainContent}
                >
                  <InfoCircleOutlined className="form-item-explain-info-icon" />
                </Popover>
              </div>
            </Form.Item>
          </Row>
          <Row style={{ display: "block", minWidth: "100%" }}>
            <Form.Item
              label="Marca"
              name="brand"
              rules={[
                {
                  required: true,
                  message: "Por favor ingrese la marca",
                },
              ]}
            >
              <Select
                value={brand}
                allowClear
                loading={loading}
                showSearch
                options={carBrands}
                onSearch={(value) => {
                  debounceFn(value);
                  setBrand(value);
                  form.resetFields(["model"]);
                }}
                onChange={(value) => {
                  if (value.length) {
                    setBrand(value);
                    form.resetFields(["model"]);
                  }
                }}
                onDeselect={() => {
                  setBrand("");
                  form.resetFields(["model"]);
                }}
              />
            </Form.Item>
          </Row>
          <Row style={{ display: "block", minWidth: "100%" }}>
            <Form.Item
              label="Modelo"
              name="model"
              rules={[
                {
                  required: true,
                  message: "Por favor ingrese el modelo",
                },
              ]}
            >
              <Select
                allowClear
                disabled={disableModels}
                loading={loading}
                showSearch
                options={carModels}
                onSearch={(value) => {
                  setModel(value);
                  debounceFn(value, brand);
                }}
                onChange={(value) => {
                  if (value.length) {
                    setModel(value);
                  }
                }}
                onDeselect={() => {
                  setModel("");
                  form.resetFields(["model"]);
                }}
              />
            </Form.Item>
          </Row>
          <Row>
            <Form.Item
              label="Año"
              name="year"
              rules={[
                {
                  required: true,
                  message: "Por favor ingrese un año",
                },
              ]}
            >
              <DatePicker
                allowClear
                placeholder="Fecha"
                picker="year"
                style={{ width: "100%" }}
                format={"YYYY"}
                disabledDate={(current) => {
                  return current && current > dayjs().add(1, "y").endOf("day");
                }}
              />
            </Form.Item>
          </Row>
          <Row>
            <Form.Item
              label="Color"
              name="color"
              rules={[
                {
                  required: true,
                  message: "Por favor ingrese el color",
                },
              ]}
            >
              <Input allowClear />
            </Form.Item>
          </Row>

          {/* <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Recordar la informacion de mi vehiculo</Checkbox>
          </Form.Item> */}
        </div>
      </div>
    </Form>
  );
}
export default CarForm;
