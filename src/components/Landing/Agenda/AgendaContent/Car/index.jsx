/* Helpers*/
import { useEffect, useState, useCallback } from "react";
import _debounce from "lodash/debounce";
import dayjs from "dayjs";
import moment from "moment";
import Logo from "../../../../../assets/images/autoexpresslogo.png";
/* Components */
import { Form, Input, Row, Popover, DatePicker, Select } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
/* Hooks */
import useCars from "../../../../../hooks/useCars";
import useViewport from "../../../../../hooks/useViewport";

import "./style.css";
import { current } from "@reduxjs/toolkit";
/**
 * @param {{ setIsChanged?: () => void,
 * setForm: () => void,
 * showFullForm: boolean,
 * client?: any,
 * car: any,
 * current: number,
 * isCarDetails?: boolean,
 * isEditing?: boolean
 * }} props
 */
function CarForm({
  setForm,
  setIsChanged,
  showFullForm,
  client,
  car,
  current,
  isCarDetails = false,
  isEditing = true,
}) {
  const { isMobileScreen } = useViewport();
  const [brand, setBrand] = useState("");
  const [disableModels, setDisableModels] = useState(false);
  const { getCarsApi, carBrands, loading, carModels } = useCars();
  const [model, setModel] = useState("");
  const [form] = Form.useForm();
  const [vinValue, setVinValue] = useState("");

  useEffect(() => {
    if (current === 1 && showFullForm) {
      getCarsApi();
    }
  }, [current, showFullForm]);

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
    if (brand && brand.length) {
      form.setFieldValue("brand", brand);
    }
    if (model && model.length) {
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

  const handlePrefill = (car) => {
    if (car) {
      const { plate, vin, brand, model, year, color } = car;
      setVinValue(vin);
      form.setFieldsValue({
        plate,
        vin: vin,
        brand,
        model,
        year: dayjs(year),
        color,
      });
    } else {
      setVinValue("");
      form.resetFields();
    }
  };

  useEffect(() => {
    handlePrefill(car);
  }, [car, isEditing]);

  const renderContent = () => {
    if (showFullForm) {
      return (
        <Form
          onFieldsChange={() => {
            setIsChanged && setIsChanged(true);
          }}
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
          autoComplete="off"
        >
          <div>
            <p className="ext text-xl text-red-700 mb-4">
              {!isCarDetails
                ? "Ingrese la información de su vehículo"
                : "Información del vehículo"}
            </p>
            <div>
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
                  <Input
                    allowClear
                    maxLength={6}
                    className="uppercase-input"
                    disabled={!isEditing}
                  />
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
                  <div className="flex gap-2">
                    <Input
                      disabled={!isEditing}
                      allowClear
                      className="uppercase-input"
                      maxLength={16}
                      onChange={(e) => {
                        setVinValue(e.target.value);
                      }}
                      value={vinValue}
                    />
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
                    disabled={!isEditing}
                    value={brand}
                    allowClear
                    loading={loading}
                    showSearch
                    options={carBrands}
                    onSearch={(value) => {
                      debounceFn(value);
                      if (value) {
                        setBrand(value);
                      }

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
                    value={model}
                    allowClear
                    disabled={(disableModels && !car) || !isEditing}
                    loading={loading}
                    showSearch
                    options={carModels}
                    onSearch={(value) => {
                      if (value) {
                        setModel(value);
                        debounceFn(value, brand);
                      }
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
                    disabled={!isEditing}
                    allowClear
                    placeholder="Fecha"
                    picker="year"
                    style={{ width: "100%" }}
                    format={"YYYY"}
                    disabledDate={(current) => {
                      return (
                        current && current > dayjs().add(1, "y").endOf("day")
                      );
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
                  <Input allowClear disabled={!isEditing} />
                </Form.Item>
              </Row>
            </div>
          </div>
        </Form>
      );
    } else {
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
          autoComplete="off"
        >
          <div className="">
            <div className="logo-container">
              <img className="logo" src={Logo} />
            </div>
            <p className="car-info-title">{`¡Bienvenido${
              client ? ` ${client.name}` : ""
            }!`}</p>
            <p className="car-info-description">
              Por favor permítanos verificar la informacion de su vehículo
            </p>
            <div className="car-fields-container">
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
            </div>
          </div>
        </Form>
      );
    }
  };

  return renderContent();
}
export default CarForm;
