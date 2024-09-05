import { useEffect } from "react";
import { Form, Input, Row, Col, DatePicker } from "antd";
import dayjs from "dayjs";
import NumberInput from "../../Common/NumberInput";
import Logo from "../../../assets/images/autoexpresslogo.png";
import RegisteredMarkIcon from "../../../assets/icons/svg/RegisteredMarkIcon";
import useViewport from "../../../hooks/useViewport";
/**
 * @param {{
 * setIsChanged?: () => void,
 * setForm: () => void,
 * showFullForm?: boolean,
 * client: any,
 * isClientDetails?: boolean,
 * isEditing?: boolean
 * }} props
 */
function ClientForm({
  setForm,
  setIsChanged,
  showFullForm = false,
  client,
  isClientDetails = false,
  isEditing = true,
}) {
  const { isMobileScreen } = useViewport();
  const [form] = Form.useForm();

  const validatePhoneNumber = async (rule, value) => {
    const phoneNumberRegex = /^(?:\d{6}|\d{10})$/;

    if (!value || phoneNumberRegex.test(value)) {
      return Promise.resolve();
    }

    return Promise.reject("Please enter a 10-digit number.");
  };

  const validateCountryId = async (rule, value) => {
    const alphaNumericRegex = /^(?:\d{8}|\d{10})$/;

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
        birthday: dayjs(birthday, "DD/MM/YYYY", true),
      });
    } else {
      form.setFieldsValue({
        name: "",
        surname: "",
        lastname: "",
        email: "",
        telephone_number: "",
        birthday: "",
      });
    }
  };

  useEffect(() => {
    handlePrefill(client);
  }, [client, isEditing]);

  const renderContent = () => {
    if (showFullForm) {
      return (
        <Form
          onFieldsChange={() => {
            setIsChanged && setIsChanged(true);
          }}
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
          autoComplete="off"
        >
          <div className="p-4">
            <p className="text text-xl text-red-700 mb-4">
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
                  <Input disabled={!isEditing && client ? true : false} />
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
                    <Input disabled={!isEditing && client ? true : false} />
                  </Form.Item>
                </Col>
                <Col>
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
                    <Input disabled={!isEditing && client ? true : false} />
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
                    disabled={!isEditing && client ? true : false}
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
                    disabled={!isEditing && client ? true : false}
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
            <p className="text text-xl text-red-700 my-4">
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
                    <Input disabled={!isEditing} />
                  </Form.Item>
                </Col>
                <Col>
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
                    <NumberInput
                      prefix={"+57"}
                      maxLength={10}
                      disabled={!isEditing}
                    />
                  </Form.Item>
                </Col>
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
          autoComplete="off"
        >
          <div className="p-4">
            <div className="m-auto flex justify-center">
              <img
                className="max-w-[200px] transform translate-x-[15px] "
                src={Logo}
              />
              <RegisteredMarkIcon
                className=" mt-4 transform translate-x-[-15px] "
                width={"20"}
                height={"20"}
                fill="black"
              />
            </div>
            <p className="text text-2xl text-red-700 font-semibold mb-4">
              ¡Bienvenido!
            </p>
            <p className="text text-lg font-medium mb-4">
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
