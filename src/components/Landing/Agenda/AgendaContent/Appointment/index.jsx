import { useEffect, useState } from "react";

import { Form, TimePicker, Calendar, theme, Row, ConfigProvider } from "antd";
import dayjs from "dayjs";
import esES from "antd/lib/locale/es_ES"; //
import "./style.css";
/**
 * @param {{ setForm: () => void }} props
 */
function AppointmentForm({ setForm }) {
  const [form] = Form.useForm();
  const { token } = theme.useToken();
  const wrapperStyle = {
    maxWidth: 500,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };

  useEffect(() => {
    setForm(form), [form];
  });

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
      <div className="appointment-form-container">
        <p className="appointment-info-title"> Ingrese la fecha deseada</p>
        <div className="appointment-fields-container">
          <Row>
            <Form.Item
              label="Fecha"
              name="date"
              rules={[
                {
                  required: true,
                  message: "Por favor ingrese una fecha",
                },
              ]}
            >
              <div style={wrapperStyle}>
                <ConfigProvider locale={esES}>
                  <Calendar fullscreen={false} />
                </ConfigProvider>
              </div>
            </Form.Item>
          </Row>
          <Row>
            <Form.Item
              label="Hora"
              name="hour"
              rules={[
                {
                  required: true,
                  message: "Por favor ingrese una hora",
                },
              ]}
            >
              <TimePicker
                placeholder="Seleccionar hora"
                size="large"
                format={"hh:mm"}
              />
            </Form.Item>
          </Row>
        </div>
      </div>
    </Form>
  );
}
export default AppointmentForm;
