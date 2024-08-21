import { useState } from "react";
import { Form, Input, Button, notification } from "antd";
import NumberInput from "../../../Common/NumberInput";
import useMessages from "../../../../hooks/useMessages";
import "./style.css";

function ContactForm() {
  const { createMessage, loading } = useMessages();
  const [showClear, setShowClear] = useState(false);
  const [form] = Form.useForm();

  const onFinish = (values) => {
    createMessage(values)
      .then(() => {
        notification.success({
          message: "Mensaje enviado con exito",
          description: "Un operario se pondrá en contacto con usted.",
        });
        setShowClear(false);
      })
      .catch((err) => {
        notification.error({
          message: "Error al enviar mensaje",
          description: "Por favor intentelo nuevamente mas tarde.",
        });
      });
  };

  const validatePhoneNumber = async (rule, value) => {
    const phoneNumberRegex = /^(?:\d{6}|\d{10})$/;

    if (!value || phoneNumberRegex.test(value)) {
      return Promise.resolve();
    }

    return Promise.reject("Ingrese número válido");
  };

  return (
    <Form
      style={{ minWidth: "206px" }}
      name="contact"
      onFinish={onFinish}
      form={form}
      onChange={() => {
        setShowClear(true);
      }}
    >
      <div>
        <span className="contact-form-input-label">Nombre</span>
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Ingrese su nombre" }]}
        >
          <Input className="contact-form-input" maxLength={100} allowClear />
        </Form.Item>
      </div>

      <div>
        <span className="contact-form-input-label">Teléfono</span>
        <Form.Item
          name="telephone_number"
          rules={[
            { required: true, message: "Ingrese su teléfono" },
            {
              validator: validatePhoneNumber,
              message: "Teléfono inválido",
            },
          ]}
        >
          <NumberInput
            className="contact-form-input"
            maxLength={100}
            allowClear
          />
        </Form.Item>
      </div>

      <div>
        <span className="contact-form-input-label">Email</span>
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Ingrese su email" },
            { type: "email", message: "Email inválido" },
          ]}
        >
          <Input className="contact-form-input" maxLength={200} allowClear />
        </Form.Item>
      </div>

      <div>
        <span className="contact-form-input-label">Mensaje</span>
        <Form.Item
          name="message"
          rules={[{ required: true, message: "Ingrese un mensaje" }]}
        >
          <Input.TextArea
            className="contact-form-input-text"
            maxLength={280}
            allowClear
          />
        </Form.Item>
      </div>
      <div className="contact-form-footer">
        <Form.Item style={{ justifyContent: "center", display: "flex" }}>
          <Button
            type="primary"
            htmlType="submit"
            className="contact-form-submit"
            loading={loading}
          >
            <span className="contact-form-input-label">Enviar</span>
          </Button>
        </Form.Item>
        {showClear && (
          <Button
            className="contact-form-clear"
            onClick={() => {
              form.resetFields();
              setShowClear(false);
            }}
          >
            <span className="contact-form-input-clear">Limpiar</span>
          </Button>
        )}
      </div>
    </Form>
  );
}
export default ContactForm;
