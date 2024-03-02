import { useEffect } from "react";
import moment from "moment";
import { Checkbox, Form, Input, Row, Col, DatePicker } from "antd";
import dayjs from "dayjs";
import NumberInput from "../../../../Common/NumberInput";
import Logo from "../../../../../assets/images/autoexpresslogo.png";

import "./style.css";
/**
 * @param {{ setForm: () => void, showFullForm?: boolean, client: any }} props
 */
function ClientForm({ setForm, showFullForm = false, client }) {
  const [form] = Form.useForm();

  const validatePhoneNumber = async (rule, value) => {
    const phoneNumberRegex = /^(?:\d{6}|\d{10})$/;

    if (!value || phoneNumberRegex.test(value)) {
      return Promise.resolve();
    }

    return Promise.reject("Please enter a 10-digit number.");
  };

  const validateCountryId = async (rule, value) => {
    const alphaNumericRegex = /^\d{10}$/;

    if (!value || alphaNumericRegex.test(value)) {
      return Promise.resolve();
    }

    return Promise.reject("Please enter a string with 10 digits");
  };

  useEffect(() => {
    setForm(form), [form, showFullForm];
  });

  const handlePrefill = (client) => {
    if (client) {
      const {
        name,
        surname,
        lastname,
        country_id,
        birthday,
        email,
        telephone_number,
      } = client;

      form.setFieldsValue({
        name: name,
        surname,
        lastname,
        country_id,
        email,
        telephone_number,
        birthday: moment(birthday, "dd/mm/yyy"),
      });
    }
  };

  useEffect(() => {
    handlePrefill(client);
  }, [client]);

  const renderContent = () => {
    if (showFullForm) {
      return (
        <Form
          form={form}
          layout="vertical"
          name="client"
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
          <div className="client-form-container">
            <p className="client-info-title">
              {client
                ? "Información personal"
                : "Ingrese su información personal"}
            </p>
            <div className="client-fields-container">
              <Row>
                <Form.Item
                  label="Nombre(s)"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Por favor ingrese su nombre",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Row>
              <Row>
                <Col>
                  <Form.Item
                    label="Primer apellido"
                    name="surname"
                    rules={[
                      {
                        required: true,
                        message: "Por favor ingrese su primer apellido",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col className="client-form-col-2">
                  <Form.Item
                    label="Segundo apellido"
                    name="lastname"
                    rules={[
                      {
                        required: true,
                        message: "Por favor ingrese su segundo apellido",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Form.Item
                  label="Cédula"
                  name="country_id"
                  rules={[
                    {
                      validator: validateCountryId,
                      message: "Cédula inválida",
                    },
                    {
                      required: true,
                      message: "Por favor ingrese su cédula ",
                    },
                  ]}
                >
                  <NumberInput
                    maxLength={10}
                    disabled={client ? true : false}
                  />
                </Form.Item>
              </Row>
              <Row>
                <Form.Item
                  label="Fecha de nacimiento"
                  name="birthday"
                  rules={[
                    {
                      required: true,
                      message: "Por favor ingrese su fecha de nacimiento",
                    },
                  ]}
                >
                  <DatePicker
                    placeholder="Fecha"
                    style={{ width: "100%" }}
                    format={"DD/MM/YYYY"}
                    disabledDate={(current) => {
                      return current && current > dayjs().endOf("day");
                    }}
                  />
                </Form.Item>
              </Row>
            </div>
            <p className="client-info-title">
              {client
                ? "Información de contacto"
                : "Ingrese su información de contacto"}
            </p>
            <div className="client-fields-container">
              <Row>
                <Col>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Por favor ingrese un email valido",
                      },
                      {
                        type: "email",
                        message: "Por favor ingrese un email valido",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col className="client-form-col-2">
                  <Form.Item
                    label="Celular"
                    name="telephone_number"
                    rules={[
                      {
                        validator: validatePhoneNumber,
                        message: "Número celular inválido",
                      },
                      {
                        required: true,
                        message: "Por favor ingrese un numero celular",
                      },
                    ]}
                  >
                    <NumberInput prefix={"+57"} maxLength={10} />
                  </Form.Item>
                </Col>
              </Row>

              {/* <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Recordar mi informacion</Checkbox>
          </Form.Item> */}
            </div>
          </div>
        </Form>
      );
    } else {
      return (
        <Form
          form={form}
          layout="vertical"
          name="client"
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
          <div className="client-form-container">
            <div className="logo-container">
              <img className="logo" src={Logo} />
            </div>
            <p className="client-info-title">¡Bienvenido!</p>
            <p className="client-info-description">
              Por favor permítanos verificar su información
            </p>
            <div className="client-fields-container">
              <Form.Item
                label="Cédula"
                name="country_id"
                rules={[
                  {
                    validator: validateCountryId,
                    message: "Cédula inválida",
                  },
                  {
                    required: true,
                    message: "Por favor ingrese su cédula ",
                  },
                ]}
              >
                <NumberInput maxLength={10} />
              </Form.Item>
            </div>
          </div>
        </Form>
      );
    }
  };

  return renderContent();
}
export default ClientForm;
